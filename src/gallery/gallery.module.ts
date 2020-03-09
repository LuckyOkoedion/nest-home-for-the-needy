import {
  Module,
} from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { Gallery } from './schemas/gallery.schema';

@Module({
  imports: [TypegooseModule.forFeature([Gallery]), AuthModule],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule  {}
