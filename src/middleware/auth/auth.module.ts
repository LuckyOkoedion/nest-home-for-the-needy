import { Module } from '@nestjs/common';
import { CheckAuthLevelOneMiddleware } from './check-auth-level-one.middleware';
import { CheckAuthLevelTwoMiddleware } from './check-auth-level-two.middleware';
import { CheckAuthLevelThreeMiddleware } from './check-auth-level-three.middleware';
import { CheckAuthLevelFourMiddleware } from './check-auth-level-four.middleware';
import { CheckAuthLevelFiveMiddleware } from './check-auth-level-five.middleware';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'userData',
      session: false,
    }),
    UserModule,
  ],
  providers: [
    CheckAuthLevelOneMiddleware,
    CheckAuthLevelTwoMiddleware,
    CheckAuthLevelThreeMiddleware,
    CheckAuthLevelFourMiddleware,
    CheckAuthLevelFiveMiddleware,
    AuthService,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [
    PassportModule,
    JwtModule,
    CheckAuthLevelOneMiddleware,
    CheckAuthLevelTwoMiddleware,
    CheckAuthLevelThreeMiddleware,
    CheckAuthLevelFourMiddleware,
    CheckAuthLevelFiveMiddleware,
    AuthService,
  ],
})
export class AuthModule {}
