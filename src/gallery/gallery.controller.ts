import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';

@Controller('/api/admin/gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}
  @Post()
  async postPicture(@Body() picture: CreateGalleryDto) {
    try {
      await this.galleryService.uploadPicture(picture);
    } catch (error) {
      console.log(error);
    }
  }
  @Get()
  async getPicture() {
    try {
      await this.galleryService.getAllPictures();
    } catch (error) {
      console.log(error);
    }
  }
  @Get('/:pictureId')
  async pictureDetail(@Param('pictureId') pictureId) {
    try {
      await this.galleryService.getPictureDetail(pictureId);
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:pictureId')
  async editPicture(@Param('pictureId') pictureId, @Body() edit) {
    try {
      await this.galleryService.updatePicture(pictureId, edit);
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:pictureId/approve')
  async approvePicture(@Param('pictureId') pictureId, value = true) {
    try {
      await this.galleryService.approveOrDisapprovePicture(value, pictureId);
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:pictureId/disapprove')
  async disapprovePicture(@Param('pictureId') pictureId, value = false) {
    try {
      await this.galleryService.approveOrDisapprovePicture(value, pictureId);
    } catch (error) {
      console.log(error);
    }
  }
  @Delete('/:pictureId')
  async deletePicture(@Param('pictureId') pictureId) {
    try {
      await this.galleryService.deletePicture(pictureId);
    } catch (error) {
      console.log(error);
    }
  }
}
