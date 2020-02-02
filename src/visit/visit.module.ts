import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';
import { CheckAuthMiddleware } from 'src/middleware/auth/check-auth.middleware';
import { CheckAuthLevelTwoMiddleware } from 'src/middleware/auth/check-auth-level-two.middleware';
import { visitProviders } from './visit.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [VisitService, ...visitProviders],
  controllers: [VisitController]
})
export class VisitModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthMiddleware, CheckAuthLevelTwoMiddleware)
      .forRoutes(VisitController);
  }
}
