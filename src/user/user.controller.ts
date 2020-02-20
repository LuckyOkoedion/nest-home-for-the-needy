import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Res,
} from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Response } from 'express';
import { IUser } from './interfaces/user.interface';

@Controller('/api/admin/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async signUp(@Body() user: CreateUserDto, @Res() res: Response) {
    const userBody = {
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      dateOfBirth: new Date(),
      email: user.email,
      phoneNo: user.phoneNo,
      nationality: user.nationality,
      religion: user.religion,
      organisation: user.organisation,
    };
    const password = user.password;
    try {
      const createdUser: IUser = await this.userService.signUp(
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
      console.log(error);
    }
  }

  @Get()
  async getAllUsers(@Res() res: Response) {
    try {
      const allUsers = await this.userService.getAllUsers();
      if (allUsers) {
        const cleanedData = allUsers.map(value => {
          return {
            id: value._id,
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
      console.log(error);
    }
  }
  @Get('/:userId/profile')
  async userDetail(@Param('userId') userId, @Res() res: Response) {
    try {
      const userProfile: IUser = await this.userService.getUserDetail(userId);

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
      console.log(error);
    }
  }
  @Put('/:userId/edit')
  async editUser(@Param('userId') userId, @Body() edit, @Res() res: Response) {
    try {
      await this.userService.editUser(userId, edit).then(() => {
        res.status(200).json({
          message: 'User edited successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:userId/make-editor')
  async makeEditor(@Param('userId') userId, @Res() res: Response) {
    try {
      await this.userService.makeEditor(userId).then(async user => {
        const theUser = await this.userService.getUserDetail(userId);
        res.status(200).json({
          message: `${theUser.firstName} ${theUser.lastName} has been made an editor successfully`,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:userId/make-user')
  async makeReader(@Param('userId') userId, @Res() res: Response) {
    try {
      const user = await this.userService
        .makeReader(userId)
        .then(async user => {
          const theUser = await this.userService.getUserDetail(userId);
          res.status(200).json({
            message: `${theUser.firstName} ${theUser.lastName} has been made an ordinary user successfully`,
          });
        });
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:userId/make-contributor')
  async makeContributor(@Param('userId') userId, @Res() res: Response) {
    try {
      const user = await this.userService
        .makeContributor(userId)
        .then(async user => {
          const theUser = await this.userService.getUserDetail(userId);
          res.status(200).json({
            message: `${theUser.firstName} ${theUser.lastName} has been made a contributor successfully`,
          });
        });
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:userId/make-moderator')
  async makeModerator(@Param('userId') userId, @Res() res: Response) {
    try {
      const user = await this.userService
        .makeModerator(userId)
        .then(async user => {
          const theUser = await this.userService.getUserDetail(userId);
          res.status(200).json({
            message: `${theUser.firstName} ${theUser.lastName} has been made a moderator successfully`,
          });
        });
    } catch (error) {
      console.log(error);
    }
  }
  @Delete('/:userId/delete')
  async deleteUser(@Param('userId') userId, @Res() res: Response) {
    try {
      await this.userService.deleteUser(userId).then(() => {
        res.status(200).json({
          message: 'user has been deleted successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}
