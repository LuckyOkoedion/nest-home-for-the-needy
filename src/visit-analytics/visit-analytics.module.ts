import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { VisitAnalyticsController } from './visit-analytics.controller';
import { VisitAnalyticsService } from './visit-analytics.service';
import { CheckAuthLevelTwoMiddleware } from 'src/middleware/auth/check-auth-level-two.middleware';
import { DatabaseModule } from 'src/database/database.module';
import { visitAnalyticsProviders } from './visit-analytics.providers';
import { AuthModule } from 'src/middleware/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [VisitAnalyticsController],
  providers: [VisitAnalyticsService, ...visitAnalyticsProviders],
})
export class VisitAnalyticsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply( CheckAuthLevelTwoMiddleware)
      .forRoutes(VisitAnalyticsController);
  }
}
