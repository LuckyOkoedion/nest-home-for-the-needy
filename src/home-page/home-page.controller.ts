import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HomePageService } from './home-page.service';
import {
  CreateHomePageDto,
  HomePageWithoutPicDto,
  EditHomePageDto,
} from './dto/create-home-page.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/utils/file-uploading.utils';
import { permissionsEnum } from 'src/utils/permissions.enum';

@Controller('/api/site/home-page')
export class HomePageController {
  constructor(private readonly homePageService: HomePageService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  @Permissions(permissionsEnum.CREATE_PUBLIC_SITE_DATA)
  @UseInterceptors(
    FileInterceptor('bannerPic', {
      fileFilter: imageFileFilter,
    }),
  )
  async createHomePage(
    @Body() homePageData: HomePageWithoutPicDto,
    @Res() res: Response,
    @UploadedFile() file?,
  ) {
    try {
      const homePagePic = file.name;
      let thePage: CreateHomePageDto = {
        ...homePageData,
        bannerPic: homePagePic,
      };
      await this.homePageService.createHomePageData(thePage).then(() => {
        res.status(201).json({
          message: 'Home page data created successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @Get()
  async getHomePage(@Res() res: Response) {
    try {
      const result = await this.homePageService.getHomePageData();
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch()
  @Permissions(permissionsEnum.UPDATE_PUBLIC_SITE_DATA)
  @UseInterceptors(
    FileInterceptor('bannerPic', {
      fileFilter: imageFileFilter,
    }),
  )
  async editHomePage(
    @Body() edit: EditHomePageDto,
    @Res() res: Response,
    @UploadedFile() file?,
  ) {
    try {
      let theEdit: EditHomePageDto;
      const pagePic = file.name;
      if (file) {
        theEdit = { ...edit, bannerPic: pagePic };
      } else {
        theEdit = { ...edit };
      }
      await this.homePageService.updateHomePageData(theEdit).then(() => {
        res.status(200).json({
          message: 'Home Page data edited successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }
}
