import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  Inject,
  Scope,
  Req,
} from '@nestjs/common';
import { CreateUserDto, EditUserDto, LoginDto, UserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { RequestWithUserData } from 'express.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/utils/file-uploading.utils';
import { REQUEST } from '@nestjs/core';
import { permissionsEnum } from 'src/utils/permissions.enum';
import { AuthService } from 'src/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { unlink, createWriteStream } from 'fs';

@Controller({ path: '/api/admin/user', scope: Scope.REQUEST })
export class UserController {
  uploadPath: string;
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly config: ConfigService,
    @Inject(REQUEST) private readonly req: RequestWithUserData,
  ) {
    this.uploadPath = this.config.get<string>("UPLOAD_PATH");
  }

  @Post('/register')
  async signUp(
    // @Body() user: CreateUserDto,
    @Res() res: Response) {
    const user: CreateUserDto = this.req.body
    const userBody = {
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      dateOfBirth: new Date(user.dateOfBirthString),
      email: user.email,
      phoneNo: user.phoneNo,
      nationality: user.nationality,
      religion: user.religion,
      organisation: user.organisation,
    };
    const password = user.password;
    try {
      const createdUser: UserDto = await this.userService.signUp(
        userBody,
        password,
      );

      if (createdUser) {

        const toReturn = {
          id: createdUser._id,
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          gender: createdUser.gender,
          dateOfBirth: createdUser.dateOfBirth,
          email: createdUser.email,
          phoneNo: createdUser.phoneNo,
          nationality: createdUser.nationality,
          religion: createdUser.religion,
        };

        res.status(201).json(toReturn);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('/login')
  async login(
    @Res() res: Response) {
    const login: LoginDto = this.req.body
    if (!login.email || !login.password) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send('Missing email or password.');
    }
    try {
      const result = await this.userService.logIn(login);
      if (result.userId) {
        const responseWithToken = this.authService.createToken(result.userId)
        res.status(200).json(responseWithToken);

      } else {
        return res
          .status(HttpStatus.NOT_FOUND)
          .send('No user found with this email and password.');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Get()
  @Permissions(permissionsEnum.READ_USERPROFILES)
  async getAllUsers(@Res() res: Response) {
    try {
      const allUsers = await this.userService.getAllUsers();
      if (allUsers) {
        const cleanedData = allUsers.map(value => {
          return {
            id: value.id,
            firstName: value.firstName,
            lastName: value.lastName,
            gender: value.gender,
            dateOfBirth: value.dateOfBirth,
            email: value.email,
            phoneNo: value.phoneNo,
            nationality: value.nationality,
            religion: value.religion,
            hasVerifiedEmail: value.hasVerifiedEmail
          };
        });
        res.status(200).json(cleanedData);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Get('/:userId/profile')
  @Permissions(permissionsEnum.READ_USERPROFILES)
  async userDetail(@Param('userId') userId, @Res() res: Response) {
    try {
      const userProfile: UserDto = await this.userService.getUserDetail(userId);

      if (userProfile) {
        const toReturn = {
          id: userProfile._id,
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          gender: userProfile.gender,
          dateOfBirth: userProfile.dateOfBirth,
          email: userProfile.email,
          phoneNo: userProfile.phoneNo,
          nationality: userProfile.nationality,
          religion: userProfile.religion,
          hasVerifiedEmail: userProfile.hasVerifiedEmail
        };
        res.status(200).json(toReturn);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:userId/editOthers')
  @Permissions(permissionsEnum.MANAGE_USERS)
  async editUser(@Param('userId') userId, @Body() edit, @Res() res: Response) {
    try {
      await this.userService.editUser(userId, edit).then(() => {
        res.status(200).json({
          message: 'User edited successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:userId/editOwnProfile')
  @Permissions(permissionsEnum.MANAGE_OWN_PROFILE)
  @UseInterceptors(
    FileInterceptor('profilePic', {
      fileFilter: imageFileFilter,
    }),
  )
  async editOwnProfile(
    @Param('userId') userId,
    @Body() edit: EditUserDto,
    @Res() res: Response,
    @UploadedFile() file?,
  ) {
    try {
      let theEdit: EditUserDto;
      const profilePic = new Date().toISOString() + file.originalname;
      if (file) {
        theEdit = { ...edit, profilePic: profilePic };
        const theProfile = await this.userService.getUserDetail(userId);
        const oldFile = theProfile.profilePic;
        await this.userService.editOwnProfile(userId, theEdit).then(() => {
          if (oldFile) {
            const oldFilePath = this.uploadPath + oldFile;
            //Delete the old file from disk
            unlink(oldFilePath, err => {
              if (err) throw err
              throw new HttpException(err.message, HttpStatus.EXPECTATION_FAILED)
            })
          }
          //Save the new file to disk
          const path = this.uploadPath + profilePic;
          let fileStream = createWriteStream(path);
          fileStream.write(file.buffer);
          //Return response
          res.status(200).json({
            message: 'Your profile has been edited successfully',
          });
        });

      } else {
        theEdit = { ...edit };
        await this.userService.editOwnProfile(userId, theEdit).then(() => {
          res.status(200).json({
            message: 'Your profile has been edited successfully',
          });
        });
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:userId/make-editor')
  @Permissions(permissionsEnum.MANAGE_USERS)
  async makeEditor(@Param('userId') userId, @Res() res: Response) {
    try {
      await this.userService.makeEditor(userId).then(async user => {
        const theUser = await this.userService.getUserDetail(userId);
        res.status(200).json({
          message: `${theUser.firstName} ${theUser.lastName} has been made an editor successfully`,
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:userId/make-user')
  @Permissions(permissionsEnum.MANAGE_USERS)
  async makeReader(@Param('userId') userId, @Res() res: Response) {
    try {
      await this.userService.makeReader(userId).then(async user => {
        const theUser = await this.userService.getUserDetail(userId);
        res.status(200).json({
          message: `${theUser.firstName} ${theUser.lastName} has been made an ordinary user successfully`,
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:userId/make-contributor')
  @Permissions(permissionsEnum.MANAGE_USERS)
  async makeContributor(@Param('userId') userId, @Body() body: { body: number }, @Res() res: Response) {
    try {
      await this.userService.makeContributor(userId, body.body).then(async user => {
        const theUser = await this.userService.getUserDetail(userId);
        res.status(200).json({
          message: `${theUser.firstName} ${theUser.lastName} has been made a contributor successfully`,
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:userId/make-moderator')
  @Permissions(permissionsEnum.MANAGE_USERS)
  async makeModerator(@Param('userId') userId, @Res() res: Response) {
    try {
      await this.userService.makeModerator(userId).then(async user => {
        const theUser = await this.userService.getUserDetail(userId);
        res.status(200).json({
          message: `${theUser.firstName} ${theUser.lastName} has been made a moderator successfully`,
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Delete('/:userId/deleteOthers')
  @Permissions(permissionsEnum.MANAGE_USERS)
  async deleteUser(@Param('userId') userId, @Res() res: Response) {
    try {
      await this.userService.deleteUser(userId).then(() => {
        res.status(200).json({
          message: 'user has been deleted successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Delete('/:userId/deleteOwnAccount')
  @Permissions(permissionsEnum.MANAGE_OWN_PROFILE)
  async deleteOwnAccount(@Param('userId') userId, @Res() res: Response) {
    try {
      await this.userService.deleteOwnAccount(userId).then(() => {
        res.status(200).json({
          message: 'your account has been deleted successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }
}
