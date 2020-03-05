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
  UseGuards,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import {
  CreateBlogDto,
  CreateBlogWithoutPicDto,
  EditBlogDto,
} from './dto/create-blog.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/utils/file-uploading.utils';
import { permissionsEnum } from 'src/utils/permissions.enum';

@Controller('/api/admin/blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  @Permissions(permissionsEnum.CREATE_BLOG)
  @UseInterceptors(
    FileInterceptor('pic', {
      fileFilter: imageFileFilter,
    }),
  )
  async create(
    @Body() blog: CreateBlogWithoutPicDto,
    @Res() res: Response,
    @UploadedFile() file?,
  ) {
    try {
      const blogPic = file.name;
      let theBlog: CreateBlogDto = { ...blog, pic: blogPic };
      await this.blogService.createBlog(theBlog).then(() => {
        res.status(201).json({
          message: 'New blog created successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post('/:blogId/comment')
  @Permissions(permissionsEnum.MAKE_COMMENT)
  async comment(
    @Body()
    comment: {
      comment: string;
    },
    @Param() params,
    @Res() res: Response,
  ) {
    try {
      const blogId: string = params.blogId;
      await this.blogService.commentOnBlog(comment, blogId).then(() => {
        res.status(201).json({
          message: 'new comment created successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
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
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
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
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
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
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:blogId/comment/:commentId/editOwnComment')
  @Permissions(permissionsEnum.UPDATE_OWN_COMMENT)
  async editOwnComment(
    @Body()
    comment: {
      comment: string;
    },
    @Param() params,
    @Res() res: Response,
  ) {
    try {
      const commentId: string = params.commentId;
      const blogId: string = params.blogId;
      await this.blogService
        .editOwnComment(blogId, comment.comment, commentId)
        .then(() => {
          res.status(200).json({
            message: 'Own comment edited successfully',
          });
        });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  // @UseGuards(JwtAuthGuard, PermissionsGuard)
  // @Put('/:blogId/othersComment/:commentId/editOthersComment')
  // @Permissions('update:othersComment')
  // async editOthersComment(
  //   @Body()
  //   comment: {
  //     comment: string;
  //   },
  //   @Param('blogId') blogId: string,
  //   @Param('commentId') commentId: string,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     await this.blogService
  //       .editOthersComment(blogId, comment.comment, commentId)
  //       .then(() => {
  //         res.status(200).json({
  //           message: "Others' comment edited successfully",
  //         });
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch('/:blogId/editOwnBlog')
  @Permissions(permissionsEnum.UPDATE_OWN_BLOG)
  @UseInterceptors(
    FileInterceptor('pic', {
      fileFilter: imageFileFilter,
    }),
  )
  async editOwnBlog(
    @Body() edit,
    @Param() params,
    @Res() res: Response,
    @UploadedFile() file?,
  ) {
    try {
      const blogId = params.blogId;
      let theEdit: EditBlogDto;
      const blogPic = file.name;
      if (file) {
        theEdit = { ...edit, pic: blogPic };
      } else {
        theEdit = { ...edit };
      }

      await this.blogService.editOwnBlog(theEdit, blogId).then(() => {
        res.status(200).json({
          message: 'blog edited successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch('/:blogId/editOthersBlog')
  @Permissions(permissionsEnum.UPDATE_OTHERS_BLOG)
  @UseInterceptors(
    FileInterceptor('pic', {
      fileFilter: imageFileFilter,
    }),
  )
  async editOthersBlog(
    @Body() edit,
    @Param() params,
    @Res() res: Response,
    @UploadedFile() file?,
  ) {
    try {
      const blogId = params.blogId;
      let theEdit: EditBlogDto;
      const blogPic = file.name;
      if (file) {
        theEdit = { ...edit, pic: blogPic };
      } else {
        theEdit = { ...edit };
      }

      await this.blogService.editOthersBlog(theEdit, blogId).then(() => {
        res.status(200).json({
          message: 'blog edited successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch('/:blogId/approve')
  @Permissions(permissionsEnum.APPROVE_BLOG)
  async approveOrDisapproveBlog(
    @Body() value: boolean,
    @Param() params,
    @Res() res: Response,
  ) {
    try {
      const blogId: string = params.blogId;
      await this.blogService.approveOrDisapproveBlog(value, blogId).then(() => {
        res.status(200).json({
          message: 'blog approved ):',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:blogId/:commentId/show')
  @Permissions(permissionsEnum.SHOW_HIDE_COMMENT)
  async showComment(value = false, @Param() params, @Res() res: Response) {
    try {
      const blogId = params.blogId;
      const commentId = params.commentId;
      await this.blogService
        .hideOrShowComment(value, blogId, commentId)
        .then(() => {
          res.status(200).json({
            message: 'Comment set to show',
          });
        });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:blogId/:commentId/hide')
  @Permissions(permissionsEnum.SHOW_HIDE_COMMENT)
  async hideComment(value = true, @Param() params, @Res() res: Response) {
    try {
      const blogId = params.blogId;
      const commentId = params.commentId;
      await this.blogService
        .hideOrShowComment(value, blogId, commentId)
        .then(() => {
          res.status(200).json({
            message: 'Comment set to hide',
          });
        });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete('/:blogId/deleteOwnBlog')
  @Permissions(permissionsEnum.DELETE_OWN_BLOG)
  async deleteOwnBlog(@Param() params, @Res() res: Response) {
    try {
      const blogId = params.blogId;
      await this.blogService.deleteOwnBlog(blogId).then(() => {
        res.status(200).json({
          message: 'blog deleted successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete('/:blogId/deleteOthersBlog')
  @Permissions(permissionsEnum.UPDATE_OTHERS_BLOG)
  async deleteOthersBlog(@Param() params, @Res() res: Response) {
    try {
      const blogId = params.blogId;
      await this.blogService.deleteOthersBlog(blogId).then(() => {
        res.status(200).json({
          message: 'blog deleted successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:blogId/comment/:commentId/deleteOwnComment')
  // Delete comment is a put request because it does not delete the blog, it only removes a comment
  @Permissions(permissionsEnum.DELETE_OWN_COMMENT)
  async deleteOwnComment(@Param() params, @Res() res: Response) {
    try {
      const commentId = params.commentId;
      const blogId = params.blogId;
      await this.blogService.deleteOwnComment(blogId, commentId).then(() => {
        res.status(200).json({
          message: 'Comment deleted successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:blogId/comment/:commentId/deleteOwnComment')
  // Delete comment is a patch request because it does not delete the blog, it only removes a comment
  @Permissions(permissionsEnum.DELETE_OTHERS_COMMENT)
  async deleteOthersComment(@Param() params, @Res() res: Response) {
    try {
      const blogId = params.blogId;
      const commentId = params.commentId;
      await this.blogService.deleteOthersComment(blogId, commentId).then(() => {
        res.status(200).json({
          message: 'Comment deleted successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }
}
