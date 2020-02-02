import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { IBlogComment } from './interfaces/blog.interface';
import { IUserData } from 'src/user/interfaces/user.interface';

@Controller('/api/admin/blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @Post()
  async create(@Body() createBlogDto: CreateBlogDto) {
    try {
      await this.blogService.createBlog(createBlogDto);
    } catch (error) {
      console.log(error);
    }
  }
  @Post('/:blogId/comment')
  async comment(
    @Body() comment: IBlogComment,
    @Param('blogId') blogId: string,
  ) {
    try {
      await this.blogService.commentOnBlog(comment, blogId);
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  async getAllBlog() {
    try {
      await this.blogService.getAllBlog();
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/:blogId')
  async getBlogDetail(@Param('blogId') blogId) {
    try {
      this.blogService.getBlogDetail(blogId);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/allComments/:blogId')
  async getAllComments(@Param('blogId') blogId) {
    try {
      this.blogService.getComments(blogId);
    } catch (error) {
      console.log(error);
    }
  }

  @Patch('/:blogId/comment/:commentId')
  async editComment(
    @Body() comment: string,
    @Param('commentId') commentId: string,
    @Param('blogId') blogId: string,
  ) {
    try {
      this.blogService.editComment(blogId, comment, commentId);
    } catch (error) {
      console.log(error);
    }
  }

  @Patch('/:blogId/othersComment/:commentId')
  async editOthersComment(
    @Body() comment: string,
    @Param('blogId') blogId: string,
    @Param('commentId') commentId: string,
  ) {
    try {
      this.blogService.editOthersComment(blogId, comment, commentId);
    } catch (error) {
      console.log(error);
    }
  }

  @Patch('/:blogId')
  async editBlog(@Body() blog, @Param('blogId') blogId) {
    try {
      this.blogService.editBlog(blog, blogId);
    } catch (error) {
      console.log(error);
    }
  }

  @Patch('/:blogId/approve')
  async approveOrDisapproveBlog(
    @Body() value: boolean,
    @Param('userData') userData: IUserData,
    userId: string = userData.userId,
    @Param('blogId') blogId: string,
  ) {
    try {
      this.blogService.approveOrDisapproveBlog(value, blogId, userId);
    } catch (error) {
      console.log(error);
    }
  }
  @Patch('/:blogId/:commentId/show')
  async showComment(
    value = false,
    @Param('blogId') blogId,
    @Param('commentId') commentId,
  ) {
    try {
      this.blogService.hideOrShowComment(value, blogId, commentId);
    } catch (error) {
      console.log(error);
    }
  }

  @Patch('/:blogId/:commentId/hide')
  async hideComment(
    value = true,
    @Param('blogId') blogId,
    @Param('commentId') commentId,
  ) {
    try {
      this.blogService.hideOrShowComment(value, blogId, commentId);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete('/:blogId')
  async deleteBlog(@Param('blogId') blogId) {
    this.blogService.deleteBlog(blogId);
  }

  @Patch('/:blogId/comment/:commentId')
  // Delete comment is a patch request because it does not delete the blog, it only removes a comment
  async deleteComment(@Param('commentId') commentId, @Param('blogId') blogId) {
    this.blogService.deleteComment(blogId, commentId);
  }
}
