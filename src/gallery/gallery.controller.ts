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
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/utils/file-uploading.utils';
import { permissionsEnum } from 'src/utils/permissions.enum';
import { ConfigService } from '@nestjs/config';
import { createWriteStream, unlink } from 'fs';

@Controller('/api/admin/gallery')
export class GalleryController {
  uploadPath: string;
  constructor(private readonly galleryService: GalleryService,
    private readonly config: ConfigService) {
    this.uploadPath = this.config.get<string>('UPLOAD_PATH')
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
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
      const galleryPic = new Date().toISOString() + file.originalname;
      let theGallery: CreateGalleryDto = { ...picture, picture: galleryPic };
      await this.galleryService.uploadPicture(theGallery).then(() => {
        // save file to disk
        const path = this.uploadPath + galleryPic;
        let fileStream = createWriteStream(path);
        fileStream.write(file.buffer);
        // Return response
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
  async pictureDetail(@Param('pictureId') pictureId, @Res() res: Response) {
    try {
      const result = await this.galleryService.getPictureDetail(pictureId);
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:pictureId')
  @Permissions(permissionsEnum.MANAGE_GALLERY)
  @UseInterceptors(
    FileInterceptor('picture', {
      fileFilter: imageFileFilter,
    }),
  )
  async editPicture(
    @Param('pictureId') pictureId,
    @Body() edit,
    @Res() res: Response,
    @UploadedFile() file?,
  ) {
    try {
      let theEdit: EditGalleryDto;
      const galleryPic = new Date().toISOString() + file.originalname;
      if (file) {
        theEdit = { ...edit, picture: galleryPic };
        const thisGallery = await this.galleryService.getPictureDetail(pictureId);
        const oldFile = thisGallery.picture;
        const oldFilePath = this.uploadPath + oldFile
        await this.galleryService.updatePicture(pictureId, theEdit).then(() => {
          //Delete the old file from disk
          unlink(oldFilePath, err => {
            if (err) throw err
          })
          //Save the new file to disk
          const path = this.uploadPath + galleryPic;
          let fileStream = createWriteStream(path);
          fileStream.write(file.buffer);
          //Return response
          res.status(201).json({
            message: 'A picture object has been edited successfully',
          });
        });
      } else {
        theEdit = { ...edit };
        await this.galleryService.updatePicture(pictureId, theEdit).then(() => {
          res.status(201).json({
            message: 'A picture object has been edited successfully',
          });
        });
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:pictureId/approve')
  @Permissions(permissionsEnum.MANAGE_GALLERY)
  async approvePicture(@Param('pictureId') pictureId, value = true, @Res() res: Response) {
    try {
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

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:pictureId/disapprove')
  @Permissions(permissionsEnum.MANAGE_GALLERY)
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
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Delete('/:pictureId')
  @Permissions(permissionsEnum.MANAGE_GALLERY)
  async deletePicture(@Param('pictureId') pictureId, @Res() res: Response) {
    try {
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
