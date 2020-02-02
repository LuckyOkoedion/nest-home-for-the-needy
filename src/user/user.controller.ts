import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Headers,
} from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { IUserData } from './interfaces/user.interface';
import { updateExpression } from '@babel/types';

@Controller('/api/admin/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async signUp(@Body() user: CreateUserDto, @Body() password: string) {
    try {
      await this.userService.signUp(user, password);
    } catch (error) {
      console.log(error);
    }
  }
  @Post('/login')
  async login(@Body() login: LoginDto) {
    let authToken;
    try {
      authToken = await this.userService
        .logIn(login)
        .then(value => {
          return value;
        })
        .catch(error => {
          console.log(error);
        });
      return authToken;
    } catch (error) {
      console.log(error);
    }
  }
  @Get()
  async getAllUsers() {
    try {
      await this.userService.getAllUsers();
    } catch (error) {
      console.log(error);
    }
  }
  @Get('/:userId')
  async userDetail(@Param('userId') userId) {
    try {
      await this.userService.getUserDetail(userId);
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:userId')
  async editUser(@Param('userId') userId, @Body() edit) {
    try {
      await this.userService.editUser(userId, edit);
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:userId')
  async makeEditor(@Param('userId') userId) {
    try {
      await this.userService.makeEditor(userId);
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:userId')
  async makeReader(@Param('userId') userId) {
    try {
      await this.userService.makeReader(userId);
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:userId')
  async makeContributor(@Param('userId') userId) {
    try {
      await this.userService.makeContributor(userId);
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:userId')
  async makeModerator(@Param('userId') userId) {
    try {
      await this.userService.makeModerator(userId);
    } catch (error) {
      console.log(error);
    }
  }
  @Delete('/:userId')
  async deleteUser(@Param('userId') userId) {
    try {
      await this.userService.deleteUser(userId);
    } catch (error) {
      console.log(error);
    }
  }
}
