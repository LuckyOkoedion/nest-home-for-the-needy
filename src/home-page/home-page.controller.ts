import { Controller, Post, Get, Patch, Body } from '@nestjs/common';
import { HomePageService } from './home-page.service';
import { CreateHomePageDto } from './dto/create-home-page.dto';

@Controller('/api/site/home-page')
export class HomePageController {
  constructor(private readonly homePageService: HomePageService) {}

  @Post()
  async createHomePage(@Body() homePageData: CreateHomePageDto) {
    try {
      await this.homePageService.createHomePageData(homePageData);
    } catch (error) {
      console.log(error);
    }
  }
  @Get()
  async getHomePage() {
    try {
      await this.homePageService.getHomePageData();
    } catch (error) {
      console.log(error);
    }
  }
  @Patch()
  async editHomePage(@Body() edit) {
    try {
      await this.homePageService.updateHomePageData(edit);
    } catch (error) {
      console.log(error);
    }
  }
}
