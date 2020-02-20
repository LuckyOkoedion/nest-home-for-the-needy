import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { CheckAuthLevelTwoMiddleware } from 'src/middleware/auth/check-auth-level-two.middleware';
import { CheckAuthLevelFiveMiddleware } from 'src/middleware/auth/check-auth-level-five.middleware';
import { eventProviders } from './event.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/middleware/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [EventService, ...eventProviders],
  controllers: [EventController],
})
export class EventModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthLevelTwoMiddleware)
      .forRoutes({ path: '/api/admin/event', method: RequestMethod.POST });
    consumer
      .apply(CheckAuthLevelFiveMiddleware)
      .forRoutes({ path: '/api/admin/event', method: RequestMethod.GET });
    consumer
      .apply(CheckAuthLevelFiveMiddleware)
      .forRoutes({
        path: '/api/admin/event/:eventId',
        method: RequestMethod.GET,
      });
    consumer
      .apply(CheckAuthLevelTwoMiddleware)
      .forRoutes({
        path: '/api/admin/event/:eventId',
        method: RequestMethod.PUT,
      });
    consumer
      .apply(CheckAuthLevelTwoMiddleware)
      .forRoutes({
        path: '/api/admin/event/:eventId',
        method: RequestMethod.DELETE,
      });
  }
}
