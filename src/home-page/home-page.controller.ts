import { Controller, Post, Get, Patch, Body, Res } from '@nestjs/common';
import { HomePageService } from './home-page.service';
import { CreateHomePageDto } from './dto/create-home-page.dto';
import { Response } from 'express';

@Controller('/api/site/home-page')
export class HomePageController {
  constructor(private readonly homePageService: HomePageService) {}

  @Post()
  async createHomePage(
    @Body() homePageData: CreateHomePageDto,
    @Res() res: Response,
  ) {
    try {
      await this.homePageService.createHomePageData(homePageData).then(() => {
        res.status(201).json({
          message: 'Home page data created successfully',
        });
      });
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }
  @Patch()
  async editHomePage(@Body() edit, @Res() res: Response) {
    try {
      await this.homePageService.updateHomePageData(edit).then(()=> {
        res.status(200).json({
          message: "Home Page data edited successfully"
        })
      })
    } catch (error) {
      console.log(error);
    }
  }
}
