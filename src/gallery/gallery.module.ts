import {
  Module,
} from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { galleryProviders } from './gallery.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [GalleryController],
  providers: [GalleryService, ...galleryProviders],
})
export class GalleryModule  {}
