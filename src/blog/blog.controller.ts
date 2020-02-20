import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Res,
  Put,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Response } from 'express';
import { RequestWithUserData } from 'express.interface';
import { JwtAuthGuard } from 'src/middleware/auth/jwt-auth.guard';

@Controller('/api/admin/blog')
export class BlogController {
  userId: string;
  req: RequestWithUserData;
  constructor(
    private readonly blogService: BlogService,
    private readonly context: ExecutionContext,
  ) {
    const httpContext = this.context.switchToHttp();
    this.req = httpContext.getRequest();
    this.userId = this.req.userData.userId;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createBlogDto: CreateBlogDto, @Res() res: Response) {
    try {
      await this.blogService.createBlog(createBlogDto, this.userId).then(() => {
        res.status(201).json({
          message: 'New blog created successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:blogId/comment')
  async comment(
    @Body()
    comment: {
      comment: string;
    },
    @Param('blogId') blogId: string,
    @Res() res: Response,
  ) {
    const commenterUserId = this.userId;
    try {
      await this.blogService
        .commentOnBlog(comment, blogId, commenterUserId)
        .then(() => {
          res.status(201).json({
            message: 'new comment created successfully',
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  async getAllBlog(@Res() res: Response) {
    try {
      const allBlogs = await this.blogService.getAllBlog();
      if (allBlogs) {
        res.status(200).json(allBlogs);
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/:blogId')
  async getBlogDetail(@Param('blogId') blogId, @Res() res: Response) {
    try {
      const blogDetail = await this.blogService.getBlogDetail(blogId);
      if (blogDetail) {
        res.status(200).json(blogDetail);
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/allComments/:blogId')
  async getAllComments(@Param('blogId') blogId, @Res() res: Response) {
    try {
      const allComments = await this.blogService.getComments(blogId);
      if (allComments) {
        res.status(200).json(allComments);
      }
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:blogId/comment/:commentId/editOwn')
  async editComment(
    @Body()
    comment: {
      comment: string;
    },
    @Param('commentId') commentId: string,
    @Param('blogId') blogId: string,
    editorUserId = this.userId,
    @Res() res: Response,
  ) {
    try {
      await this.blogService
        .editComment(blogId, comment.comment, commentId, editorUserId)
        .then(() => {
          res.status(200).json({
            message: 'Own comment edited successfully',
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:blogId/othersComment/:commentId/editOthers')
  async editOthersComment(
    @Body()
    comment: {
      comment: string;
    },
    @Param('blogId') blogId: string,
    @Param('commentId') commentId: string,
    @Res() res: Response,
  ) {
    try {
      await this.blogService
        .editOthersComment(blogId, comment.comment, commentId)
        .then(() => {
          res.status(200).json({
            message: "Others' comment edited successfully",
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:blogId')
  async editBlog(@Body() blog, @Param('blogId') blogId, @Res() res: Response) {
    try {
      await this.blogService.editBlog(blog, blogId).then(() => {
        res.status(200).json({
          message: 'blog edited successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:blogId/approve')
  async approveOrDisapproveBlog(
    @Body() value: boolean,
    userId: string = this.userId,
    @Param('blogId') blogId: string,
    @Res() res: Response,
  ) {
    try {
      await this.blogService
        .approveOrDisapproveBlog(value, blogId, userId)
        .then(() => {
          res.status(200).json({
            message: 'blog approved ):',
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:blogId/:commentId/show')
  async showComment(
    value = false,
    @Param('blogId') blogId,
    @Param('commentId') commentId,
    @Res() res: Response,
  ) {
    try {
      await this.blogService
        .hideOrShowComment(value, blogId, commentId)
        .then(() => {
          res.status(200).json({
            message: 'Comment set to show',
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:blogId/:commentId/hide')
  async hideComment(
    value = true,
    @Param('blogId') blogId,
    @Param('commentId') commentId,
    @Res() res: Response,
  ) {
    try {
      await this.blogService
        .hideOrShowComment(value, blogId, commentId)
        .then(() => {
          res.status(200).json({
            message: 'Comment set to hide',
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:blogId')
  async deleteBlog(@Param('blogId') blogId, @Res() res: Response) {
    await this.blogService.deleteBlog(blogId).then(() => {
      res.status(200).json({
        message: 'blog deleted successfully',
      });
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:blogId/comment/:commentId/delete')
  // Delete comment is a patch request because it does not delete the blog, it only removes a comment
  async deleteComment(
    @Param('commentId') commentId,
    @Param('blogId') blogId,
    @Res() res: Response,
  ) {
    await this.blogService.deleteComment(blogId, commentId).then(() => {
      res.status(200).json({
        message: 'Comment deleted successfully',
      });
    });
  }
}
