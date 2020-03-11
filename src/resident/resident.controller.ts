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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/utils/file-uploading.utils';
import { permissionsEnum } from 'src/utils/permissions.enum';

@Controller('/api/admin/resident')
export class ResidentController {
  constructor(private readonly residentService: ResidentService) { }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
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
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get()
  @Permissions(permissionsEnum.READ_RESIDENTS)
  async getAllResidents(@Res() res: Response) {
    try {
      const result = await this.residentService.getAllResidents();
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get('/:residentId')
  @Permissions(permissionsEnum.READ_RESIDENTS)
  async residentDetail(@Param('residentId') residentId, @Res() res: Response) {
    try {
      const result = await this.residentService.getResidentDetail(residentId);
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:residentId')
  @Permissions(permissionsEnum.MANAGE_RESIDENTS)
  async editResident(@Param() params, @Body() edit, @Res() res: Response) {
    try {
      const residentId = params.residentId;
      await this.residentService.editResident(residentId, edit).then(() => {
        res.status(200).json({
          message: "A resident's has been updated successfully",
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:residentId/addPicture')
  @Permissions(permissionsEnum.MANAGE_RESIDENTS)
  @UseInterceptors(
    FileInterceptor('pic', {
      fileFilter: imageFileFilter,
    }),
  )
  async addPicsToGallery(
    @Param() params,
    @Body() edit: CreateResidentGalleryWithoutPicDto,
    @Res() res: Response,
    @UploadedFile() file?,
  ) {
    try {
      const residentId = params.residentId;
      const thePicture: CreateResidentGalleryDto = {
        picture: file.name,
        pictureName: edit.pictureName,
        dateCaptured: edit.dateCaptured,
        occassionCaptured: edit.occassionCaptured,
      };

      await this.residentService
        .addPicsToGallery(residentId, thePicture)
        .then(() => {
          res.status(200).json({
            message: "A resident's gallery has been updated successfully",
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:residentId/:pictureId/editPicture')
  @Permissions(permissionsEnum.MANAGE_RESIDENTS)
  @UseInterceptors(
    FileInterceptor('pic', {
      fileFilter: imageFileFilter,
    }),
  )
  async editGalleryPics(
    @Param() params,
    @Body() edit: CreateResidentGalleryWithoutPicDto,
    @Res() res: Response,
    @UploadedFile() file?,
  ) {
    try {
      const residentId = params.residentId;
      const pictureId = params.pictureId;
      const thePicture: CreateResidentGalleryDto = {
        picture: file.name,
        pictureName: edit.pictureName,
        dateCaptured: edit.dateCaptured,
        occassionCaptured: edit.occassionCaptured,
      };
      await this.residentService
        .editGalleryPics(residentId, pictureId, thePicture)
        .then(() => {
          res.status(200).json({
            message: "A resident's has been updated successfully",
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:residentId/:pictureId/deletePicture')
  @Permissions(permissionsEnum.MANAGE_RESIDENTS)
  async deleteGalleryPics(@Param() params, @Res() res: Response) {
    try {
      const residentId = params.residentId;
      const pictureId = params.pictureId;
      await this.residentService
        .deleteGalleryPics(residentId, pictureId)
        .then(() => {
          res.status(200).json({
            message: "A resident's has been updated successfully",
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:residentId/addRelatedCoResident')
  @Permissions(permissionsEnum.MANAGE_RESIDENTS)
  async addRelatedCoResident(
    @Param() params,
    @Body() coResident: CreateRelatedCoResidentDto,
    @Res() res: Response,
  ) {
    try {
      const residentId = params.residentId;
      await this.residentService
        .addRelatedCoResident(residentId, coResident)
        .then(() => {
          res.status(200).json({
            message:
              "A resident's related co-resident has been updated successfully",
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:residentId/:coResidentId/editCoResident')
  @Permissions(permissionsEnum.MANAGE_RESIDENTS)
  async editRelatedCoResident(
    @Param() params,
    @Body() newResident: EditRelatedCoResidentDto,
    @Res() res: Response,
  ) {
    try {
      const residentId = params.residentId;
      const coResidentId = params.coResidentId;
      await this.residentService
        .editRelatedCoResident(residentId, coResidentId, newResident)
        .then(() => {
          res.status(200).json({
            message:
              "A resident's related co-resident has been updated successfully",
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:residentId/:coResidentId/deleteCoResident')
  @Permissions(permissionsEnum.MANAGE_RESIDENTS)
  async deleteRelatedCoResident(@Param() params, @Res() res: Response) {
    try {
      const residentId = params.residentId;
      const coResidentId = params.coResidentId;
      await this.residentService
        .deleteRelatedCoResident(residentId, coResidentId)
        .then(() => {
          res.status(200).json({
            message:
              "A resident's related co-resident has been deleted successfully",
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:residentId/addPersonalSponsor')
  @Permissions(permissionsEnum.MANAGE_RESIDENTS)
  async addPersonalSponsor(
    @Param() params,
    @Body() personalSponsor: CreatePersonalSponsorDto,
    @Res() res: Response,
  ) {
    try {
      const residentId = params.residentId;
      await this.residentService
        .addPersonalSponsor(residentId, personalSponsor)
        .then(() => {
          res.status(200).json({
            message:
              "A resident's personal sponsore has been added successfully",
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:residentId/:sponsorId/editPersonalSponsor')
  @Permissions(permissionsEnum.MANAGE_RESIDENTS)
  async editPersonalSponsor(
    @Param() params,
    @Body() newSponsor: EditPersonalSponsorDto,
    @Res() res: Response,
  ) {
    try {
      const residentId = params.residentId;
      const sponsorId = params.sponsorId;
      await this.residentService
        .editPersonalSponsor(residentId, sponsorId, newSponsor)
        .then(() => {
          res.status(200).json({
            message:
              "A resident's personal sponsor has been edited successfully",
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:residentId/:sponsorId/deletePersonalSponsor')
  @Permissions(permissionsEnum.MANAGE_RESIDENTS)
  async deletePersonalSponsor(@Param() params, @Res() res: Response) {
    try {
      const residentId = params.residentId;
      const sponsorId = params.sponsorId;
      await this.residentService
        .deletePersonalSponsor(residentId, sponsorId)
        .then(() => {
          res.status(200).json({
            message:
              "A resident's personal sponsor has been deleted successfully",
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete('/:residentId/deleteResident')
  @Permissions(permissionsEnum.MANAGE_RESIDENTS)
  async deleteResident(@Param() params, @Res() res: Response) {
    try {
      const residentId = params.residentId;
      await this.residentService.deleteResident(residentId).then(() => {
        res.status(200).json({
          message: 'A resident has been deleted successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}
