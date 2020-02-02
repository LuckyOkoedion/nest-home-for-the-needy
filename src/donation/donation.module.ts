import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { CheckAuthLevelFiveMiddleware } from 'src/middleware/auth/check-auth-level-five.middleware';
import { CheckAuthMiddleware } from 'src/middleware/auth/check-auth.middleware';
import { CheckAuthLevelOneMiddleware } from 'src/middleware/auth/check-auth-level-one.middleware';
import { donationProviders } from './donation.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [DonationService, ...donationProviders],
  controllers: [DonationController],
})
export class DonationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthLevelFiveMiddleware)
      .forRoutes({ path: '/api/admin/donation', method: RequestMethod.POST });
    consumer
      .apply(CheckAuthMiddleware, CheckAuthLevelOneMiddleware)
      .forRoutes({ path: '/api/admin/donation', method: RequestMethod.GET });
    consumer.apply(CheckAuthMiddleware, CheckAuthLevelOneMiddleware).forRoutes({
      path: '/api/admin/donation/:donationId',
      method: RequestMethod.GET,
    });
    consumer.apply(CheckAuthMiddleware, CheckAuthLevelOneMiddleware).forRoutes({
      path: '/api/admin/donation/:donationId',
      method: RequestMethod.PUT,
    });
    consumer.apply(CheckAuthMiddleware, CheckAuthLevelOneMiddleware).forRoutes({
      path: '/api/admin/donation/:donationId',
      method: RequestMethod.DELETE,
    });
  }
}
