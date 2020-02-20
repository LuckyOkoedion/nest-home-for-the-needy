import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { BlogPageController } from './blog-page.controller';
import { BlogPageService } from './blog-page.service';
import { CheckAuthLevelTwoMiddleware } from 'src/middleware/auth/check-auth-level-two.middleware';
import { blogPageProviders } from './blog-page.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/middleware/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [BlogPageController],
  providers: [BlogPageService, ...blogPageProviders]
})
export class BlogPageModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply( CheckAuthLevelTwoMiddleware)
      .forRoutes({ path: "/api/site/blog-page", method: RequestMethod.POST });
    consumer
      .apply( CheckAuthLevelTwoMiddleware)
      .forRoutes({ path: "/api/site/blog-page", method: RequestMethod.PATCH });
  }
}

