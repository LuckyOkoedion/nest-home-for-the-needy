import { Controller, Get, Patch, Post, Body, Res } from '@nestjs/common';
import { AboutPageService } from './about-page.service';
import { CreateAboutPageDto } from './dto/create-about-page.dto';
import { Response } from 'express';

@Controller('/api/site/about-page')
export class AboutPageController {
  constructor(private readonly aboutPageService: AboutPageService) {}
  @Post()
  async create(
    @Body() createAboutPageDto: CreateAboutPageDto,
    @Res() res: Response,
  ) {
    try {
      await this.aboutPageService
        .createAboutPageData(createAboutPageDto)
        .then(() => {
          res.status(201).json({
            message: 'About page data created successfully.',
          });
        });
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }
  @Patch()
  async edit(@Body() data, @Res() res: Response) {
    try {
      await this.aboutPageService.updateAboutPageData(data).then(() => {
        res.status(200).json({
          message: 'About page data updated successfully',
        });
      });
    } catch (error) {}
  }
}
