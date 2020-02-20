import { Module} from '@nestjs/common';
import { DonationAnalyticsController } from './donation-analytics.controller';
import { DonationAnalyticsService } from './donation-analytics.service';
import { DatabaseModule } from 'src/database/database.module';
import { donationAnalyticsProviders } from './donation-analytics.providers';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [DonationAnalyticsController],
  providers: [DonationAnalyticsService, ...donationAnalyticsProviders],
})
export class DonationAnalyticsModule  {}
