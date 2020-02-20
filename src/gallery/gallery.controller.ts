import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Res,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { Response } from 'express';

@Controller('/api/admin/gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}
  @Post()
  async postPicture(@Body() picture: CreateGalleryDto, @Res() res: Response) {
    try {
      await this.galleryService.uploadPicture(picture).then(() => {
        res.status(201).json({
          message: 'A picture added to the gallery successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  @Get()
  async getPicture(@Res() res: Response) {
    try {
      const result = await this.galleryService.getAllPictures();
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      console.log(error);
    }
  }
  @Get('/:pictureId')
  async pictureDetail(@Param('pictureId') pictureId, @Res() res: Response) {
    try {
      const result = await this.galleryService.getPictureDetail(pictureId);
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:pictureId')
  async editPicture(
    @Param('pictureId') pictureId,
    @Body() edit,
    @Res() res: Response,
  ) {
    try {
      await this.galleryService.updatePicture(pictureId, edit).then(() => {
        res.status(201).json({
          message: 'A picture object has been edited successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:pictureId/approve')
  async approvePicture(
    @Param('pictureId') pictureId,
    value = true,
    @Res() res: Response,
  ) {
    try {
      await this.galleryService
        .approveOrDisapprovePicture(value, pictureId)
        .then(() => {
          res.status(201).json({
            message: 'A picture has been approved for display',
          });
        });
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:pictureId/disapprove')
  async disapprovePicture(
    @Param('pictureId') pictureId,
    value = false,
    @Res() res: Response,
  ) {
    try {
      await this.galleryService
        .approveOrDisapprovePicture(value, pictureId)
        .then(() => {
          res.status(201).json({
            message: 'A picture has been banned from display',
          });
        });
    } catch (error) {
      console.log(error);
    }
  }
  @Delete('/:pictureId')
  async deletePicture(@Param('pictureId') pictureId, @Res() res: Response) {
    try {
      await this.galleryService.deletePicture(pictureId).then(() => {
        res.status(201).json({
          message: 'A picture has been deleted successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}
