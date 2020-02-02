import { Controller, Get, Patch, Post, Body } from '@nestjs/common';
import { AboutPageService } from './about-page.service';
import { CreateAboutPageDto } from './dto/create-about-page.dto';

@Controller('/api/site/about-page')
export class AboutPageController {
  constructor(private readonly aboutPageService: AboutPageService) {}
  @Post()
  async create(@Body() createAboutPageDto: CreateAboutPageDto) {
    try {
      this.aboutPageService.createAboutPageData(createAboutPageDto);
    } catch (error) {
      console.log(error);
    }
  }
  @Get()
  async findAll() {
    try {
      this.aboutPageService.getAboutPageData();
    } catch (error) {
      console.log(error);
    }
  }
  @Patch()
  async edit(@Body() data) {
      try {
          this.aboutPageService.updateAboutPageData(data)
      } catch (error) {
          
      }
  }
}
