import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { NavFooterController } from './nav-footer.controller';
import { NavFooterService } from './nav-footer.service';
import { CheckAuthLevelTwoMiddleware } from 'src/middleware/auth/check-auth-level-two.middleware';
import { navFooterProviders } from './nav-footer.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/middleware/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [NavFooterController],
  providers: [NavFooterService, ...navFooterProviders],
})
export class NavFooterModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply( CheckAuthLevelTwoMiddleware)
      .forRoutes({ path: '/api/site/nav-footer', method: RequestMethod.POST });
    consumer
      .apply( CheckAuthLevelTwoMiddleware)
      .forRoutes({ path: '/api/site/nav-footer', method: RequestMethod.PATCH });
  }
}
