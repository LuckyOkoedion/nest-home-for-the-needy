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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ResidentService } from './resident.service';
import {
  CreateResidentDto,
  ResidentWithoutArraysDto,
  CreateResidentGalleryDto,
  CreateResidentGalleryWithoutPicDto,
  CreateRelatedCoResidentDto,
  EditResidentDto,
  CreatePersonalSponsorDto,
  EditPersonalSponsorDto,
  EditRelatedCoResidentDto,
} from './dto/create-resident.dto';
import { Response } from 'express';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/utils/file-uploading.utils';
import { permissionsEnum } from 'src/utils/permissions.enum';
import { ConfigService } from '@nestjs/config';
import { createWriteStream, unlink } from 'fs';

@Controller('/api/admin/resident')
export class ResidentController {
  uploadPath: string;
  constructor(private readonly residentService: ResidentService, private readonly config: ConfigService) {
    this.uploadPath = this.config.get<string>("UPLOAD_PATH")
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Post()
  @Permissions(permissionsEnum.MANAGE_RESIDENTS)
  async createResident(
    @Body() resident: ResidentWithoutArraysDto,
    @Res() res: Response,
  ) {
    try {
      await this.residentService.createResident(resident).then(() => {
        res.status(201).json({
          message: 'A resident has been created successfully',
        });
      });
    } catch (error) {
      // console.log(error);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Get()
  @Permissions(permissionsEnum.READ_RESIDENTS)
  async getAllResidents(@Res() res: Response) {
    try {
      const result = await this.residentService.getAllResidents();
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      // console.log(error);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Get('/:residentId')
  @Permissions(permissionsEnum.READ_RESIDENTS)
  async residentDetail(@Param('residentId') residentId, @Res() res: Response) {
    try {
      const result = await this.residentService.getResidentDetail(residentId);
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      // console.log(error);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:residentId')
  @Permissions(permissionsEnum.MANAGE_RESIDENTS)
  async editResident(@Param('residentId') residentId, @Body() edit, @Res() res: Response) {
    try {
      await this.residentService.editResident(residentId, edit).then(() => {
        res.status(200).json({
          message: "A resident's has been updated successfully",
        });
      });
    } catch (error) {
      // console.log(error);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:residentId/addPicture')
  @Permissions(permissionsEnum.MANAGE_RESIDENTS)
  @UseInterceptors(
    FileInterceptor('pic', {
      fileFilter: imageFileFilter,
    }),
  )
  async addPicsToGallery(
    @Param('residentId') residentId,
    @Body() edit: CreateResidentGalleryWithoutPicDto,
    @Res() res: Response,
    @UploadedFile() file?,
  ) {
    try {
      const thePicture: CreateResidentGalleryDto = {
        picture: new Date().toISOString() + file.originalname,
        dateCaptured: edit.dateCaptured,
        occassionCaptured: edit.occassionCaptured,
      };

      await this.residentService
        .addPicsToGallery(residentId, thePicture)
        .then(() => {
          // save file to disk
          const path = this.uploadPath + thePicture.picture;
          let fileStream = createWriteStream(path);
          fileStream.write(file.buffer);
          // Return response
          res.status(200).json({
            message: "A resident's gallery has been updated successfully",
          });
        });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED)
      // console.log(error);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:residentId/:pictureId/editPicture')
  @Permissions(permissionsEnum.MANAGE_RESIDENTS)
  @UseInterceptors(
    FileInterceptor('pic', {
      fileFilter: imageFileFilter,
    }),
  )
  async editGalleryPics(
    @Param('residentId') residentId,
    @Param('pictureId') pictureId,
    @Body() edit: CreateResidentGalleryWithoutPicDto,
    @Res() res: Response,
    @UploadedFile() file?,
  ) {
    try {
      const thePicture: CreateResidentGalleryDto = {
        picture: new Date().toISOString() + file.originalname,
        dateCaptured: edit.dateCaptured,
        occassionCaptured: edit.occassionCaptured,
      };
      const oldPictureObject = await this.residentService.getParticularPictureFromGallery(residentId, pictureId);
      const oldFile = oldPictureObject.picture;
      const oldFilePath = this.uploadPath + oldFile
      await this.residentService
        .editGalleryPics(residentId, pictureId, thePicture)
        .then(() => {
          //Delete the old file from disk
          unlink(oldFilePath, err => {
            if (err) throw err
            // console.log(`successfully deleted ${oldFilePath}`);
          })
          //Save the new file to disk
          const path = this.uploadPath + thePicture.picture;
          let fileStream = createWriteStream(path);
          fileStream.write(file.buffer);
          //Return response
          res.status(200).json({
            message: "A resident's has been updated successfully",
          });
        });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED)
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:residentId/:pictureId/deletePicture')
  @Permissions(permissionsEnum.MANAGE_RESIDENTS)
  async deleteGalleryPics(@Param('residentId') residentId, @Param('pictureId') pictureId, @Res() res: Response) {
    try {
      await this.residentService
        .deleteGalleryPics(residentId, pictureId)
        .then(() => {
          res.status(200).json({
            message: "A resident's has been updated successfully",
          });
        });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED)
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:residentId/addRelatedCoResident')
  @Permissions(permissionsEnum.MANAGE_RESIDENTS)
  async addRelatedCoResident(
    @Param('residentId') residentId,
    @Body() coResident: CreateRelatedCoResidentDto,
    @Res() res: Response,
  ) {
    try {
      await this.residentService
        .addRelatedCoResident(residentId, coResident)
        .then(() => {
          res.status(200).json({
            message:
              "A resident's related co-resident has been updated successfully",
          });
        });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED)
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:residentId/:coResidentId/editCoResident')
  @Permissions(permissionsEnum.MANAGE_RESIDENTS)
  async editRelatedCoResident(
    @Param('residentId') residentId,
    @Param('coResidentId') coResidentId,
    @Body() newResident: EditRelatedCoResidentDto,
    @Res() res: Response,
  ) {
    try {
      await this.residentService
        .editRelatedCoResident(residentId, coResidentId, newResident)
        .then(() => {
          res.status(200).json({
            message:
              "A resident's related co-resident has been updated successfully",
          });
        });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED)
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:residentId/:coResidentId/deleteCoResident')
  @Permissions(permissionsEnum.MANAGE_RESIDENTS)
  async deleteRelatedCoResident(@Param('residentId') residentId, @Param('coResidentId') coResidentId, @Res() res: Response) {
    try {
      await this.residentService
        .deleteRelatedCoResident(residentId, coResidentId)
        .then(() => {
          res.status(200).json({
            message:
              "A resident's related co-resident has been deleted successfully",
          });
        });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED)
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:residentId/addPersonalSponsor')
  @Permissions(permissionsEnum.MANAGE_RESIDENTS)
  async addPersonalSponsor(
    @Param('residentId') residentId,
    @Body() personalSponsor: CreatePersonalSponsorDto,
    @Res() res: Response,
  ) {
    try {
      await this.residentService
        .addPersonalSponsor(residentId, personalSponsor)
        .then(() => {
          res.status(200).json({
            message:
              "A resident's personal sponsore has been added successfully",
          });
        });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED)
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:residentId/:sponsorId/editPersonalSponsor')
  @Permissions(permissionsEnum.MANAGE_RESIDENTS)
  async editPersonalSponsor(
    @Param('residentId') residentId,
    @Param('sponsorId') sponsorId,
    @Body() newSponsor: EditPersonalSponsorDto,
    @Res() res: Response,
  ) {
    try {
      await this.residentService
        .editPersonalSponsor(residentId, sponsorId, newSponsor)
        .then(() => {
          res.status(200).json({
            message:
              "A resident's personal sponsor has been edited successfully",
          });
        });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED)
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:residentId/:sponsorId/deletePersonalSponsor')
  @Permissions(permissionsEnum.MANAGE_RESIDENTS)
  async deletePersonalSponsor(@Param('residentId') residentId, @Param('sponsorId') sponsorId, @Res() res: Response) {
    try {
      await this.residentService
        .deletePersonalSponsor(residentId, sponsorId)
        .then(() => {
          res.status(200).json({
            message:
              "A resident's personal sponsor has been deleted successfully",
          });
        });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED)
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Delete('/:residentId/deleteResident')
  @Permissions(permissionsEnum.MANAGE_RESIDENTS)
  async deleteResident(@Param('residentId') residentId, @Res() res: Response) {
    try {
      await this.residentService.deleteResident(residentId).then(() => {
        res.status(200).json({
          message: 'A resident has been deleted successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED)
    }
  }
}
