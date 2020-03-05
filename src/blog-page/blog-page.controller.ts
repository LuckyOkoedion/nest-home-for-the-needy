import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Res,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateBlogPageDto } from './dto/create-blog-page.dto';
import { BlogPageService } from './blog-page.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { permissionsEnum } from 'src/utils/permissions.enum';

@Controller('/api/site/blog-page')
export class BlogPageController {
  constructor(private readonly blogPageService: BlogPageService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  @Permissions(permissionsEnum.CREATE_PUBLIC_SITE_DATA)
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
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
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
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch()
  @Permissions(permissionsEnum.UPDATE_PUBLIC_SITE_DATA)
  async updateBlogPage(@Body() edit, @Res() res: Response) {
    try {
      await this.blogPageService.updateBlogPageData(edit).then(() => {
        res.status(200).json({
          message: 'Blog page data updated successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }
}
