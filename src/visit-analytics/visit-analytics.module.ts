import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { VisitAnalyticsController } from './visit-analytics.controller';
import { VisitAnalyticsService } from './visit-analytics.service';
import { CheckAuthMiddleware } from 'src/middleware/auth/check-auth.middleware';
import { CheckAuthLevelTwoMiddleware } from 'src/middleware/auth/check-auth-level-two.middleware';
import { DatabaseModule } from 'src/database/database.module';
import { visitAnalyticsProviders } from './visit-analytics.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [VisitAnalyticsController],
  providers: [VisitAnalyticsService, ...visitAnalyticsProviders],
})
export class VisitAnalyticsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthMiddleware, CheckAuthLevelTwoMiddleware)
      .forRoutes(VisitAnalyticsController);
  }
}
