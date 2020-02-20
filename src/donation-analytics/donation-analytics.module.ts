import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DonationAnalyticsController } from './donation-analytics.controller';
import { DonationAnalyticsService } from './donation-analytics.service';
import { CheckAuthLevelOneMiddleware } from 'src/middleware/auth/check-auth-level-one.middleware';
import { DatabaseModule } from 'src/database/database.module';
import { donationAnalyticsProviders } from './donation-analytics.providers';
import { AuthModule } from 'src/middleware/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [DonationAnalyticsController],
  providers: [DonationAnalyticsService, ...donationAnalyticsProviders],
})
export class DonationAnalyticsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply( CheckAuthLevelOneMiddleware)
      .forRoutes(DonationAnalyticsController);
  }
}
