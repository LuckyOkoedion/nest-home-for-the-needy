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
} from '@nestjs/common';
import { CreateUserDto, EditUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { RequestWithUserData } from 'express.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/utils/file-uploading.utils';
import { REQUEST } from '@nestjs/core';
import { permissionsEnum } from 'src/utils/permissions.enum';
import { User } from './schemas/user.schema';

@Controller({ path: '/api/admin/user', scope: Scope.REQUEST })
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(REQUEST) private readonly req: RequestWithUserData,
  ) { }

  @Post('/register')
  async signUp(@Body() user: CreateUserDto, @Res() res: Response) {
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
      const createdUser: User = await this.userService.signUp(
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

  @UseGuards(JwtAuthGuard, PermissionsGuard)
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
          };
        });
        res.status(200).json(cleanedData);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get('/:userId/profile')
  @Permissions(permissionsEnum.READ_USERPROFILES)
  async userDetail(@Param() params, @Res() res: Response) {
    try {
      const userId = params.userId;
      const userProfile: User = await this.userService.getUserDetail(userId);

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
        };
        res.status(200).json(toReturn);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:userId/editOthers')
  @Permissions(permissionsEnum.MANAGE_USERS)
  async editUser(@Param() params, @Body() edit, @Res() res: Response) {
    try {
      const userId = params.userId;
      await this.userService.editUser(userId, edit).then(() => {
        res.status(200).json({
          message: 'User edited successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:userId/editOwnProfile')
  @Permissions(permissionsEnum.MANAGE_OWN_PROFILE)
  @UseInterceptors(
    FileInterceptor('profilePic', {
      fileFilter: imageFileFilter,
    }),
  )
  async editOwnProfile(
    @Param() params,
    @Body() edit: EditUserDto,
    @Res() res: Response,
    @UploadedFile() file?,
  ) {
    try {
      const userId = params.userId;
      let theEdit: EditUserDto;
      const profilePic = file.name;
      if (file) {
        theEdit = { ...edit, profilePic: profilePic };
      } else {
        theEdit = { ...edit };
      }

      await this.userService.editOwnProfile(userId, theEdit).then(() => {
        res.status(200).json({
          message: 'Your profile has been edited successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:userId/make-editor')
  @Permissions(permissionsEnum.MANAGE_USERS)
  async makeEditor(@Param() params, @Res() res: Response) {
    try {
      const userId = params.userId;
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

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:userId/make-user')
  @Permissions(permissionsEnum.MANAGE_USERS)
  async makeReader(@Param() params, @Res() res: Response) {
    try {
      const userId = params.userId;
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

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:userId/make-contributor')
  @Permissions(permissionsEnum.MANAGE_USERS)
  async makeContributor(@Param() params, @Res() res: Response) {
    try {
      const userId = params.userId;
      await this.userService.makeContributor(userId).then(async user => {
        const theUser = await this.userService.getUserDetail(userId);
        res.status(200).json({
          message: `${theUser.firstName} ${theUser.lastName} has been made a contributor successfully`,
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:userId/make-moderator')
  @Permissions(permissionsEnum.MANAGE_USERS)
  async makeModerator(@Param() params, @Res() res: Response) {
    try {
      const userId = params.userId;
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

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete('/:userId/deleteOthers')
  @Permissions(permissionsEnum.MANAGE_USERS)
  async deleteUser(@Param() params, @Res() res: Response) {
    try {
      const userId = params.userId;
      await this.userService.deleteUser(userId).then(() => {
        res.status(200).json({
          message: 'user has been deleted successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete('/:userId/deleteOwnAccount')
  @Permissions(permissionsEnum.MANAGE_OWN_PROFILE)
  async deleteOwnAccount(@Param() params, @Res() res: Response) {
    try {
      const userId = params.userId;
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
