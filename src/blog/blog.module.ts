import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { CheckAuthLevelTwoMiddleware } from 'src/middleware/auth/check-auth-level-two.middleware';
import { CheckAuthLevelOneMiddleware } from 'src/middleware/auth/check-auth-level-one.middleware';
import { CheckAuthLevelThreeMiddleware } from 'src/middleware/auth/check-auth-level-three.middleware';
import { blogProviders } from './blog.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/middleware/auth/auth.module';
import { CheckAuthLevelFourMiddleware } from 'src/middleware/auth/check-auth-level-four.middleware';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [BlogController],
  providers: [BlogService, ...blogProviders],
})
export class BlogModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthLevelFourMiddleware)
      .forRoutes({ path: '/api/admin/blog', method: RequestMethod.POST });

    consumer.apply(CheckAuthLevelFourMiddleware).forRoutes({
      path: '/api/admin/blog/:blogId/comment',
      method: RequestMethod.POST,
    });

    consumer.apply(CheckAuthLevelFourMiddleware).forRoutes({
      path: '/api/admin/blog/:blogId/comment/:commentId/editOwn',
      method: RequestMethod.PUT,
    });

    consumer.apply(CheckAuthLevelTwoMiddleware).forRoutes({
      path: '/api/admin/blog/:blogId/othersComment/:commentId/editOthers',
      method: RequestMethod.PUT,
    });

    consumer.apply(CheckAuthLevelTwoMiddleware).forRoutes({
      path: '/api/admin/blog/:blogId',
      method: RequestMethod.PATCH,
    });

    consumer.apply(CheckAuthLevelOneMiddleware).forRoutes({
      path: '/api/admin/blog/:blogId/comment/:commentId/delete',
      method: RequestMethod.PUT,
    });

    consumer.apply(CheckAuthLevelThreeMiddleware).forRoutes({
      path: '/api/admin/blog/:blogId/approve',
      method: RequestMethod.PATCH,
    });

    consumer.apply(CheckAuthLevelThreeMiddleware).forRoutes(
      {
        path: '/api/admin/blog/:blogId/:commentId/show',
        method: RequestMethod.PUT,
      },
      {
        path: '/api/admin/blog/:blogId/:commentId/hide',
        method: RequestMethod.PUT,
      },
    );
  }
}
