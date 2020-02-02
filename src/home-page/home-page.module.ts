import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { HomePageService } from './home-page.service';
import { HomePageController } from './home-page.controller';
import { CheckAuthMiddleware } from 'src/middleware/auth/check-auth.middleware';
import { CheckAuthLevelTwoMiddleware } from 'src/middleware/auth/check-auth-level-two.middleware';
import { homePageProviders } from './home-page.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [HomePageService, ...homePageProviders],
  controllers: [HomePageController]
})
export class HomePageModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthMiddleware, CheckAuthLevelTwoMiddleware)
      .forRoutes({ path: '/api/site/home-page', method: RequestMethod.POST });
    consumer
    .apply(CheckAuthMiddleware, CheckAuthLevelTwoMiddleware)
    .forRoutes({ path: '/api/site/home-page', method: RequestMethod.PATCH });
  }
}

