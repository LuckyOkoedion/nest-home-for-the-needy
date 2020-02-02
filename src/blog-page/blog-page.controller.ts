import { Controller, Post, Get, Patch, Body } from '@nestjs/common';
import { CreateBlogPageDto } from './dto/create-blog-page.dto';
import { BlogPageService } from './blog-page.service';

@Controller('/api/site/blog-page')
export class BlogPageController {
  constructor(private readonly blogPageService: BlogPageService) {}

  @Post()
  async createBlogPage(@Body() blogPage: CreateBlogPageDto) {
    try {
      await this.blogPageService.createBlogPageData(blogPage);
    } catch (error) {
      console.log(error);
    }
  }
  @Get()
  async getBlogPage() {
    try {
      await this.blogPageService.getBlogPageData();
    } catch (error) {
      console.log(error);
    }
  }
  @Patch()
  async updateBlogPage(@Body() edit) {
    try {
      await this.blogPageService.updateBlogPageData(edit);
    } catch (error) {
      console.log(error);
    }
  }
}
