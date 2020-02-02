import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DonationAnalyticsController } from './donation-analytics.controller';
import { DonationAnalyticsService } from './donation-analytics.service';
import { CheckAuthMiddleware } from 'src/middleware/auth/check-auth.middleware';
import { CheckAuthLevelOneMiddleware } from 'src/middleware/auth/check-auth-level-one.middleware';
import { DatabaseModule } from 'src/database/database.module';
import { donationAnalyticsProviders } from './donation-analytics.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [DonationAnalyticsController],
  providers: [DonationAnalyticsService, ...donationAnalyticsProviders],
})
export class DonationAnalyticsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthMiddleware, CheckAuthLevelOneMiddleware)
      .forRoutes(DonationAnalyticsController);
  }
}
