import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserDataDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService,
    private readonly authService: AuthService, ) {
    super();
  }

  serializeUser(user: UserDataDto, done: CallableFunction) {
    done(null, user.userId);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    return await this.userService.findOneOrFail(userId)
      .then(user => done(null, user))
      .catch(error => done(error));
  }
}