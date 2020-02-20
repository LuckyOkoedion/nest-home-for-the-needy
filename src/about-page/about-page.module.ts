import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AboutPageController } from './about-page.controller';
import { AboutPageService } from './about-page.service';
import { CheckAuthLevelTwoMiddleware } from 'src/middleware/auth/check-auth-level-two.middleware';
import { aboutPageProviders } from './about-page.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/middleware/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AboutPageController],
  providers: [AboutPageService, ...aboutPageProviders],
})
export class AboutPageModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthLevelTwoMiddleware)
      .exclude({ path: '/api/site/about-page', method: RequestMethod.GET })
      .forRoutes(AboutPageController);
  }
}
