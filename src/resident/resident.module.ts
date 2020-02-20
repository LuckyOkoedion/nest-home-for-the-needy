import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ResidentController } from './resident.controller';
import { ResidentService } from './resident.service';
import { CheckAuthLevelTwoMiddleware } from 'src/middleware/auth/check-auth-level-two.middleware';
import { CheckAuthLevelFiveMiddleware } from 'src/middleware/auth/check-auth-level-five.middleware';
import { residentProviders } from './resident.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/middleware/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ResidentController],
  providers: [ResidentService, ...residentProviders],
})
export class ResidentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply( CheckAuthLevelTwoMiddleware)
      .forRoutes({ path: '/api/admin/resident', method: RequestMethod.POST });
    consumer
      .apply( CheckAuthLevelFiveMiddleware)
      .forRoutes({ path: '/api/admin/resident', method: RequestMethod.GET });
    consumer
      .apply( CheckAuthLevelFiveMiddleware)
      .forRoutes({
        path: '/api/admin/resident/:residentId',
        method: RequestMethod.GET,
      });
    consumer.apply( CheckAuthLevelTwoMiddleware).forRoutes({
      path: '/api/admin/resident/:residentId',
      method: RequestMethod.PUT,
    });
    consumer.apply( CheckAuthLevelTwoMiddleware).forRoutes({
      path: '/api/admin/resident/:residentId',
      method: RequestMethod.DELETE,
    });
  }
}
