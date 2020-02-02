import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ResidentController } from './resident.controller';
import { ResidentService } from './resident.service';
import { CheckAuthMiddleware } from 'src/middleware/auth/check-auth.middleware';
import { CheckAuthLevelTwoMiddleware } from 'src/middleware/auth/check-auth-level-two.middleware';
import { CheckAuthLevelFiveMiddleware } from 'src/middleware/auth/check-auth-level-five.middleware';
import { residentProviders } from './resident.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ResidentController],
  providers: [ResidentService, ...residentProviders],
})
export class ResidentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthMiddleware, CheckAuthLevelTwoMiddleware)
      .forRoutes({ path: '/api/admin/resident', method: RequestMethod.POST });
    consumer
      .apply(CheckAuthMiddleware, CheckAuthLevelFiveMiddleware)
      .forRoutes({ path: '/api/admin/resident', method: RequestMethod.GET });
    consumer
      .apply(CheckAuthMiddleware, CheckAuthLevelFiveMiddleware)
      .forRoutes({
        path: '/api/admin/resident/:residentId',
        method: RequestMethod.GET,
      });
    consumer.apply(CheckAuthMiddleware, CheckAuthLevelTwoMiddleware).forRoutes({
      path: '/api/admin/resident/:residentId',
      method: RequestMethod.PUT,
    });
    consumer.apply(CheckAuthMiddleware, CheckAuthLevelTwoMiddleware).forRoutes({
      path: '/api/admin/resident/:residentId',
      method: RequestMethod.DELETE,
    });
  }
}
