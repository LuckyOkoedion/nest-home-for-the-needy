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
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/utils/file-uploading.utils';
import { permissionsEnum } from 'src/utils/permissions.enum';
import { ConfigService } from '@nestjs/config';
import { createWriteStream, unlink } from 'fs';

@Controller('/api/site/home-page')
export class HomePageController {
  uploadPath: string;
  constructor(private readonly homePageService: HomePageService,
    private readonly config: ConfigService) {
    this.uploadPath = this.config.get<string>('UPLOAD_PATH')
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
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
      const homePagePic = new Date().toISOString() + file.originalname;
      let thePage: CreateHomePageDto = {
        ...homePageData,
        bannerPic: homePagePic,
      };
      await this.homePageService.createHomePageData(thePage).then(() => {
        // save file to disk
        const path = this.uploadPath + homePagePic;
        let fileStream = createWriteStream(path);
        fileStream.write(file.buffer);
        // Return response
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

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
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
      const pagePic = new Date().toISOString() + file.originalname;
      if (file) {
        theEdit = { ...edit, bannerPic: pagePic };
        const thePage = await this.homePageService.getHomePageData();
        const oldFIle = thePage.bannerPic;
        const oldFilePath = this.uploadPath + oldFIle;
        await this.homePageService.updateHomePageData(theEdit).then(() => {
          //Delete the old file from disk
          unlink(oldFilePath, err => {
            if (err) throw err
            // console.log(`successfully deleted ${oldFilePath}`);
          })
          //Save the new file to disk
          const path = this.uploadPath + pagePic;
          let fileStream = createWriteStream(path);
          fileStream.write(file.buffer);
          //Return response
          res.status(200).json({
            message: 'Home Page data edited successfully',
          });
        });
      } else {
        theEdit = { ...edit };
        await this.homePageService.updateHomePageData(theEdit).then(() => {
          res.status(200).json({
            message: 'Home Page data edited successfully',
          });
        });
      }

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }
}
