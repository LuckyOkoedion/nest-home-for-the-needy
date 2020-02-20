import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginDto } from './user/dto/create-user.dto';
import { AuthService } from './middleware/auth/auth.service';
import {Response } from 'express';

@Controller('/api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/auth/login')
  async login(@Body() login: LoginDto, @Res() res: Response) {
    try {
      const authToken = await this.authService.logIn(login);
      if (authToken && !authToken.message) {
        res.status(200).json({
          message: 'login successful',
          token: authToken,
        });
      } else {
        res.status(404).json(authToken);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
