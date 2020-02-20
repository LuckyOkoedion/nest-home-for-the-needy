import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { CheckAuthLevelTwoMiddleware } from 'src/middleware/auth/check-auth-level-two.middleware';
import { galleryProviders } from './gallery.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/middleware/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [GalleryController],
  providers: [GalleryService, ...galleryProviders],
})
export class GalleryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthLevelTwoMiddleware)
      .forRoutes({ path: '/api/admin/gallery', method: RequestMethod.POST });
    consumer.apply(CheckAuthLevelTwoMiddleware).forRoutes(
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
    consumer.apply(CheckAuthLevelTwoMiddleware).forRoutes({
      path: '/api/admin/gallery/:pictureId',
      method: RequestMethod.DELETE,
    });
  }
}
