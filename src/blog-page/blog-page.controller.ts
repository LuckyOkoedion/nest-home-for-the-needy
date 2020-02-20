import { Controller, Post, Get, Patch, Body, Res } from '@nestjs/common';
import { CreateBlogPageDto } from './dto/create-blog-page.dto';
import { BlogPageService } from './blog-page.service';
import { Response } from 'express';

@Controller('/api/site/blog-page')
export class BlogPageController {
  constructor(private readonly blogPageService: BlogPageService) {}

  @Post()
  async createBlogPage(
    @Body() blogPage: CreateBlogPageDto,
    @Res() res: Response,
  ) {
    try {
      await this.blogPageService.createBlogPageData(blogPage).then(() => {
        res.status(201).json({
          message: 'Blog Page data created successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  @Get()
  async getBlogPage(@Res() res: Response) {
    try {
      const blogPageData = await this.blogPageService.getBlogPageData();
      if (blogPageData) {
        res.status(200).json(blogPageData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  @Patch()
  async updateBlogPage(@Body() edit, @Res() res: Response) {
    try {
      await this.blogPageService.updateBlogPageData(edit).then(() => {
        res.status(200).json({
          message: 'Blog page data updated successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}
