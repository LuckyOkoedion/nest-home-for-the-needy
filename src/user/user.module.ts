import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CheckAuthLevelOneMiddleware } from 'src/middleware/auth/check-auth-level-one.middleware';
import { CheckAuthLevelFiveMiddleware } from 'src/middleware/auth/check-auth-level-five.middleware';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.providers';
import { AuthModule } from 'src/middleware/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthLevelOneMiddleware)
      .exclude(
        { path: '/api/admin/user/register', method: RequestMethod.POST },
        { path: '/api/admin/user/:userId/profile', method: RequestMethod.GET },
      )
      .forRoutes(UserController);
    consumer.apply(CheckAuthLevelFiveMiddleware).forRoutes({
      path: '/api/admin/user/:userId/profile',
      method: RequestMethod.GET,
    });
  }
}
