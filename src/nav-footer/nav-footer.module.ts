import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { NavFooterController } from './nav-footer.controller';
import { NavFooterService } from './nav-footer.service';
import { CheckAuthMiddleware } from 'src/middleware/auth/check-auth.middleware';
import { CheckAuthLevelTwoMiddleware } from 'src/middleware/auth/check-auth-level-two.middleware';
import { navFooterProviders } from './nav-footer.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NavFooterController],
  providers: [NavFooterService, ...navFooterProviders],
})
export class NavFooterModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthMiddleware, CheckAuthLevelTwoMiddleware)
      .forRoutes({ path: '/api/site/nav-footer', method: RequestMethod.POST });
    consumer
      .apply(CheckAuthMiddleware, CheckAuthLevelTwoMiddleware)
      .forRoutes({ path: '/api/site/nav-footer', method: RequestMethod.PATCH });
  }
}
