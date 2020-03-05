import {
  Module,
} from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GallerySchema } from './schemas/gallery.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Gallery', schema: GallerySchema }]), AuthModule],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule  {}
