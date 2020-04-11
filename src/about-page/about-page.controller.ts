import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  Res,
  UseGuards,
  UseInterceptors,
  HttpException,
  HttpStatus,
  UploadedFile,
} from '@nestjs/common';
import { AboutPageService } from './about-page.service';
import {
  CreateAboutPageDto,
  CreateAboutPageWithoutPictureDto,
  EditAboutPageDto,
} from './dto/create-about-page.dto';
import { Response } from 'express';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { permissionsEnum } from 'src/utils/permissions.enum';
import { imageFileFilter } from 'src/utils/file-uploading.utils';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ConfigService } from '@nestjs/config';
import { createWriteStream, unlink } from 'fs';


@Controller('/api/site/about-page')
export class AboutPageController {
  uploadPath: string;
  constructor(private readonly aboutPageService: AboutPageService,
    private readonly config: ConfigService) {
    this.uploadPath = this.config.get<string>('UPLOAD_PATH')
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Post()
  @Permissions(permissionsEnum.CREATE_PUBLIC_SITE_DATA)
  @UseInterceptors(
    FileInterceptor('bioPic', {
      fileFilter: imageFileFilter,
    }),
  )
  async create(
    @Body() aboutPageData: CreateAboutPageWithoutPictureDto,
    @Res() res: Response,
    @UploadedFile() theBioPic,
  ) {
    console.log(aboutPageData)
    try {
      const bioPic = new Date().toISOString() + theBioPic.originalname;
      const thePage: CreateAboutPageDto = {
        ...aboutPageData,
        bioPic: bioPic,
      };



      await this.aboutPageService.createAboutPageData(thePage).then(() => {
        // save file to disk
        const path = this.uploadPath + bioPic;
        let fileStream = createWriteStream(path);
        fileStream.write(theBioPic.buffer);
        // Return response
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

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Patch()
  @Permissions(permissionsEnum.UPDATE_PUBLIC_SITE_DATA)
  @UseInterceptors(
    FileInterceptor('bioPic', {
      fileFilter: imageFileFilter,
    }),
  )
  async edit(
    @Body() edit: EditAboutPageDto,
    @Res() res: Response,
    @UploadedFile() theBioPic?,
  ) {
    let theEdit: EditAboutPageDto;
    try {
      
      const bioPic = new Date().toISOString() + theBioPic.originalname;
      if (theBioPic) {
        theEdit = { ...edit, bioPic: bioPic };
        const thePage = await this.aboutPageService.getAboutPageData();
        const oldFile = thePage.bioPic;
        const oldFilePath = this.uploadPath + oldFile;
        await this.aboutPageService.updateAboutPageData(theEdit).then(() => {
          //Delete the old file from disk
          unlink(oldFilePath, err => {
            if (err) throw err
          })
          //Save the new file to disk
          const path = this.uploadPath + bioPic;
          let fileStream = createWriteStream(path);
          fileStream.write(theBioPic.buffer);
          //Return response
          res.status(200).json({
            message: 'About page data updated successfully',
          });
        });
      } else {
        theEdit = { ...edit }
        console.log(theEdit)
        await this.aboutPageService.updateAboutPageData(theEdit).then(() => {
          res.status(200).json({
            message: 'About page data updated successfully',
          });
        });
      }

    } catch (error) { }
  }
}
