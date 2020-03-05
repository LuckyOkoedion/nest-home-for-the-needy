import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AboutPageService } from './about-page.service';
import {
  CreateAboutPageDto,
  CreateAboutPageWithoutPicturesDto,
  EditAboutPageDto,
} from './dto/create-about-page.dto';
import { Response } from 'express';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { permissionsEnum } from 'src/utils/permissions.enum';

@Controller('/api/site/about-page')
export class AboutPageController {
  constructor(private readonly aboutPageService: AboutPageService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  @Permissions(permissionsEnum.CREATE_PUBLIC_SITE_DATA)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'bioPic', maxCount: 1 },
      { name: 'bannerPic', maxCount: 1 },
    ]),
  )
  async create(
    @Body() aboutPageData: CreateAboutPageWithoutPicturesDto,
    @Res() res: Response,
    @UploadedFiles() files: File[],
  ) {
    try {
      const bioPic = files[0].name;
      const bannerPic = files[1].name;
      let thePage: CreateAboutPageDto = {
        ...aboutPageData,
        bioPic: bioPic,
        bannerPic: bannerPic,
      };

      await this.aboutPageService.createAboutPageData(thePage).then(() => {
        res.status(201).json({
          message: 'About page data created successfully.',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const allAboutPageData = await this.aboutPageService.getAboutPageData();
      if (allAboutPageData) {
        res.status(200).json(allAboutPageData);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch()
  @Permissions(permissionsEnum.UPDATE_PUBLIC_SITE_DATA)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'bioPic', maxCount: 1 },
      { name: 'bannerPic', maxCount: 1 },
    ]),
  )
  async edit(
    @Body() edit: EditAboutPageDto,
    @Res() res: Response,
    @UploadedFiles() files?: File[],
  ) {
    try {
      let theEdit: EditAboutPageDto;
      const bioPic = files[0].name;
      const bannerPic = files[1].name;
      if (files) {
        theEdit = { ...edit, bioPic: bioPic, bannerPic: bannerPic };
      }
      await this.aboutPageService.updateAboutPageData(theEdit).then(() => {
        res.status(200).json({
          message: 'About page data updated successfully',
        });
      });
    } catch (error) {}
  }
}
