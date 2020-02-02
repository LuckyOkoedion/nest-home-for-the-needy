import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { CheckAuthMiddleware } from 'src/middleware/auth/check-auth.middleware';
import { CheckAuthLevelTwoMiddleware } from 'src/middleware/auth/check-auth-level-two.middleware';
import { CheckAuthLevelOneMiddleware } from 'src/middleware/auth/check-auth-level-one.middleware';
import { CheckAuthLevelThreeMiddleware } from 'src/middleware/auth/check-auth-level-three.middleware';
import { blogProviders } from './blog.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BlogController],
  providers: [BlogService, ...blogProviders],
})
export class BlogModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthMiddleware, CheckAuthLevelTwoMiddleware)
      .forRoutes({ path: '/api/admin/blog', method: RequestMethod.POST });

    consumer.apply(CheckAuthMiddleware, CheckAuthLevelTwoMiddleware).forRoutes({
      path: '/api/admin/blog/:blogId/comment',
      method: RequestMethod.POST,
    });

    consumer.apply(CheckAuthMiddleware).forRoutes({
      path: '/api/admin/blog/:blogId/comment/:commentId',
      method: RequestMethod.PATCH,
    });

    consumer.apply(CheckAuthMiddleware, CheckAuthLevelTwoMiddleware).forRoutes({
      path: '/api/admin/blog/:blogId/othersComment/:commentId',
      method: RequestMethod.PATCH,
    });

    consumer.apply(CheckAuthMiddleware, CheckAuthLevelTwoMiddleware).forRoutes({
      path: '/api/admin/blog/:blogId',
      method: RequestMethod.PATCH,
    });

    consumer.apply(CheckAuthMiddleware, CheckAuthLevelOneMiddleware).forRoutes({
      path: '/api/admin/blog/:blogId/comment/:commentId',
      method: RequestMethod.PATCH,
    });

    consumer
      .apply(CheckAuthMiddleware, CheckAuthLevelThreeMiddleware)
      .forRoutes({
        path: '/api/admin/blog/:blogId/approve',
        method: RequestMethod.PATCH,
      });

    consumer
      .apply(CheckAuthMiddleware, CheckAuthLevelThreeMiddleware)
      .forRoutes(
        {
          path: '/api/admin/blog/:blogId/:commentId/show',
          method: RequestMethod.PATCH,
        },
        {
          path: '/api/admin/blog/:blogId/:commentId/hide',
          method: RequestMethod.PATCH,
        },
      );
  }
}
