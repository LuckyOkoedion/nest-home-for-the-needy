import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CheckAuthMiddleware } from 'src/middleware/auth/check-auth.middleware';
import { CheckAuthLevelOneMiddleware } from 'src/middleware/auth/check-auth-level-one.middleware';
import { CheckAuthLevelFiveMiddleware } from 'src/middleware/auth/check-auth-level-five.middleware';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthMiddleware, CheckAuthLevelOneMiddleware)
      .exclude(
        { path: '/api/admin/user/register', method: RequestMethod.POST },
        { path: '/api/admin/user/login', method: RequestMethod.POST },
      )
      .forRoutes(UserController);
    consumer
      .apply(CheckAuthMiddleware, CheckAuthLevelFiveMiddleware)
      .forRoutes(
        { path: '/api/admin/user/register', method: RequestMethod.POST },
        { path: '/api/admin/user/login', method: RequestMethod.POST },
      );
  }
}
