import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import {
  CreateGalleryDto,
  CreateGalleryWithoutPicDto,
  EditGalleryDto,
} from './dto/create-gallery.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/utils/file-uploading.utils';
import { permissionsEnum } from 'src/utils/permissions.enum';

@Controller('/api/admin/gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  @Permissions(permissionsEnum.MANAGE_GALLERY)
  @UseInterceptors(
    FileInterceptor('picture', {
      fileFilter: imageFileFilter,
    }),
  )
  async postPicture(
    @Body() picture: CreateGalleryWithoutPicDto,
    @Res() res: Response,
    @UploadedFile() file?,
  ) {
    try {
      const galleryPic = file.name;
      let theGallery: CreateGalleryDto = { ...picture, picture: galleryPic };
      await this.galleryService.uploadPicture(theGallery).then(() => {
        res.status(201).json({
          message: 'A picture added to the gallery successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
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
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:pictureId')
  async pictureDetail(@Param() params, @Res() res: Response) {
    try {
      const pictureId = params.pictureId;
      const result = await this.galleryService.getPictureDetail(pictureId);
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:pictureId')
  @Permissions(permissionsEnum.MANAGE_GALLERY)
  @UseInterceptors(
    FileInterceptor('picture', {
      fileFilter: imageFileFilter,
    }),
  )
  async editPicture(
    @Param() params,
    @Body() edit,
    @Res() res: Response,
    @UploadedFile() file?,
  ) {
    try {
      const pictureId = params.pictureId;
      let theEdit: EditGalleryDto;
      const galleryPic = file.name;
      if (file) {
        theEdit = { ...edit, picture: galleryPic };
      } else {
        theEdit = { ...edit };
      }
      await this.galleryService.updatePicture(pictureId, theEdit).then(() => {
        res.status(201).json({
          message: 'A picture object has been edited successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:pictureId/approve')
  @Permissions(permissionsEnum.MANAGE_GALLERY)
  async approvePicture(@Param() params, value = true, @Res() res: Response) {
    try {
      const pictureId = params.pictureId;
      await this.galleryService
        .approveOrDisapprovePicture(value, pictureId)
        .then(() => {
          res.status(201).json({
            message: 'A picture has been approved for display',
          });
        });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:pictureId/disapprove')
  @Permissions(permissionsEnum.MANAGE_GALLERY)
  async disapprovePicture(
    @Param() params,
    value = false,
    @Res() res: Response,
  ) {
    try {
      const pictureId = params.pictureId;
      await this.galleryService
        .approveOrDisapprovePicture(value, pictureId)
        .then(() => {
          res.status(201).json({
            message: 'A picture has been banned from display',
          });
        });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete('/:pictureId')
  @Permissions(permissionsEnum.MANAGE_GALLERY)
  async deletePicture(@Param() params, @Res() res: Response) {
    try {
      const pictureId = params.pictureId;
      await this.galleryService.deletePicture(pictureId).then(() => {
        res.status(201).json({
          message: 'A picture has been deleted successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }
}
