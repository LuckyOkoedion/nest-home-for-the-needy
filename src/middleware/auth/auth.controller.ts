import { Controller, Post, Body, Res } from '@nestjs/common';
import { LoginDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('/api/admin/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
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
