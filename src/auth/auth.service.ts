import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string): Promise<any> {
    const result = await this.userService.findUserWithEmail(email);
    const user = result[0];
    if (user) {
      const userData = {
        email: user.email,
        userId: user._id,
        clearanceLevel: user.accessLevel,
      };
      return userData;
    }
    throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
  }

  async logIn(login: LoginDto) {
    let payload: any = undefined;
    // Search for user with email
    return await this.userService
      .findUserWithEmail({ email: login.email })
      // if not found, return error
      .then(async user => {
        if (user.length < 1) {
          const error = new Error();
          error.message = 'No such user in database';
          throw error;
        }
        payload = { email: user[0].email, sub: user[0]._id };
        // if found, bcrypt compare provided password with hashed password
        return await bcrypt.compare(login.password, user[0].password);
      })
      .then(async result => {
        if (result) {
          const authToken = await this.jwtService.sign(payload);
          // authToken = await jwt.sign(userData, jwtConstants.secret, {
          //   expiresIn: '1h',
          // });

          return authToken;
        }
        const error = new Error();
        error.message = 'Login Failed!';
        throw error;
      })
      .catch(error => {
        return error;
      });
  }
}
