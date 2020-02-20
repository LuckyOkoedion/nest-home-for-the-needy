import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { CheckAuthLevelFiveMiddleware } from 'src/middleware/auth/check-auth-level-five.middleware';
import { CheckAuthLevelOneMiddleware } from 'src/middleware/auth/check-auth-level-one.middleware';
import { donationProviders } from './donation.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/middleware/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [DonationService, ...donationProviders],
  controllers: [DonationController],
})
export class DonationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthLevelFiveMiddleware)
      .forRoutes({ path: '/api/admin/donation', method: RequestMethod.POST });
    consumer
      .apply(CheckAuthLevelOneMiddleware)
      .forRoutes({ path: '/api/admin/donation', method: RequestMethod.GET });
    consumer.apply(CheckAuthLevelOneMiddleware).forRoutes({
      path: '/api/admin/donation/:donationId',
      method: RequestMethod.GET,
    });
    consumer.apply(CheckAuthLevelOneMiddleware).forRoutes({
      path: '/api/admin/donation/:donationId',
      method: RequestMethod.PUT,
    });
    consumer.apply(CheckAuthLevelOneMiddleware).forRoutes({
      path: '/api/admin/donation/:donationId',
      method: RequestMethod.DELETE,
    });
  }
}
