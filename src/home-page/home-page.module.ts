import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { HomePageService } from './home-page.service';
import { HomePageController } from './home-page.controller';
import { CheckAuthLevelTwoMiddleware } from 'src/middleware/auth/check-auth-level-two.middleware';
import { homePageProviders } from './home-page.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/middleware/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [HomePageService, ...homePageProviders],
  controllers: [HomePageController],
})
export class HomePageModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthLevelTwoMiddleware)
      .forRoutes({ path: '/api/site/home-page', method: RequestMethod.POST });
    consumer
      .apply(CheckAuthLevelTwoMiddleware)
      .forRoutes({ path: '/api/site/home-page', method: RequestMethod.PATCH });
  }
}
