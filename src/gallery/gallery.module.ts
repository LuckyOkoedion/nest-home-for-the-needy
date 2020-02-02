import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { CheckAuthMiddleware } from 'src/middleware/auth/check-auth.middleware';
import { CheckAuthLevelTwoMiddleware } from 'src/middleware/auth/check-auth-level-two.middleware';
import { galleryProviders } from './gallery.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [GalleryController],
  providers: [GalleryService, ...galleryProviders],
})
export class GalleryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthMiddleware, CheckAuthLevelTwoMiddleware)
      .forRoutes({ path: '/api/admin/gallery', method: RequestMethod.POST });
    consumer.apply(CheckAuthMiddleware, CheckAuthLevelTwoMiddleware).forRoutes(
      {
        path: '/api/admin/gallery/:pictureId',
        method: RequestMethod.PUT,
      },
      {
        path: '/api/admin/gallery/:pictureId/approve',
        method: RequestMethod.PUT,
      },
      {
        path: '/api/admin/gallery/:pictureId/disapprove',
        method: RequestMethod.PUT,
      },
    );
    consumer.apply(CheckAuthMiddleware, CheckAuthLevelTwoMiddleware).forRoutes({
      path: '/api/admin/gallery/:pictureId',
      method: RequestMethod.DELETE,
    });
  }
}
