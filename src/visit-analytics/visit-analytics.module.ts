import { Module} from '@nestjs/common';
import { VisitAnalyticsController } from './visit-analytics.controller';
import { VisitAnalyticsService } from './visit-analytics.service';
import { DatabaseModule } from 'src/database/database.module';
import { visitAnalyticsProviders } from './visit-analytics.providers';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [VisitAnalyticsController],
  providers: [VisitAnalyticsService, ...visitAnalyticsProviders],
})
export class VisitAnalyticsModule {}
