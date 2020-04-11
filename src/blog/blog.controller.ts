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
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/utils/file-uploading.utils';
import { permissionsEnum } from 'src/utils/permissions.enum';
import { createWriteStream, unlink } from 'fs';
import { ConfigService } from '@nestjs/config';

@Controller('/api/admin/blog')
export class BlogController {
  uploadPath: string;
  constructor(private readonly blogService: BlogService,
    private readonly config: ConfigService) {
    this.uploadPath = this.config.get<string>('UPLOAD_PATH')
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
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
      const blogPic = new Date().toISOString() + file.originalname;
      let theBlog: CreateBlogDto = { ...blog, pic: blogPic };
      await this.blogService.createBlog(theBlog).then(() => {
        // save file to disk
        const path = this.uploadPath + blogPic;
        let fileStream = createWriteStream(path);
        fileStream.write(file.buffer);
        // Return response
        res.status(201).json({
          message: 'New blog created successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Post('/:blogId/comment')
  @Permissions(permissionsEnum.MAKE_COMMENT)
  async comment(
    @Body()
    comment: {
      comment: string;
    },
    @Param('blogId') blogId,
    @Res() res: Response,
  ) {
    try {
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

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Patch('/:blogId/comment/:commentId/editOwnComment')
  @Permissions(permissionsEnum.UPDATE_OWN_COMMENT)
  async editOwnComment(
    @Body()
    comment: {
      comment: string;
    },
    @Param('blogId') blogId,
    @Param('commentId') commentId,
    @Res() res: Response,
  ) {
    try {
      await this.blogService
        .editOwnComment(blogId, commentId, comment.comment)
        .then(() => {
          res.status(200).json({
            message: 'Own comment edited successfully',
          });
        });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  // @UseGuards(AuthenticatedGuard, PermissionsGuard)
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

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Patch('/:blogId/editOwnBlog')
  @Permissions(permissionsEnum.UPDATE_OWN_BLOG)
  @UseInterceptors(
    FileInterceptor('pic', {
      fileFilter: imageFileFilter,
    }),
  )
  async editOwnBlog(
    @Body() edit,
    @Param('blogId') blogId,
    @Res() res: Response,
    @UploadedFile() file?,
  ) {
    try {
      let theEdit: EditBlogDto;
      const blogPic = new Date().toISOString() + file.originalname;
      if (file) {
        theEdit = { ...edit, pic: blogPic };
        const theBlog = await this.blogService.getBlogDetail(blogId);
        const oldFile = theBlog.pic;
        const oldFilePath = this.uploadPath + oldFile;
        await this.blogService.editOwnBlog(theEdit, blogId).then(() => {
          //Delete the old file from disk
          unlink(oldFilePath, err => {
            if (err) throw err
            // console.log(`successfully deleted ${oldFilePath}`);
          })
          //Save the new file to disk
          const path = this.uploadPath + blogPic;
          let fileStream = createWriteStream(path);
          fileStream.write(file.buffer);
          //Return response
          res.status(200).json({
            message: 'blog edited successfully',
          });
        });
      } else {
        theEdit = { ...edit };
        await this.blogService.editOwnBlog(theEdit, blogId).then(() => {
          res.status(200).json({
            message: 'blog edited successfully',
          });
        });
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Patch('/:blogId/editOthersBlog')
  @Permissions(permissionsEnum.UPDATE_OTHERS_BLOG)
  @UseInterceptors(
    FileInterceptor('pic', {
      fileFilter: imageFileFilter,
    }),
  )
  async editOthersBlog(
    @Body() edit,
    @Param('blogId') blogId,
    @Res() res: Response,
    @UploadedFile() file?,
  ) {
    try {
      let theEdit: EditBlogDto;
      const blogPic = new Date().toISOString() + file.originalname;
      if (file) {
        theEdit = { ...edit, pic: blogPic };
        const theBlog = await this.blogService.getBlogDetail(blogId);
        const oldFile = theBlog.pic;
        const oldFilePath = this.uploadPath + oldFile;
        await this.blogService.editOthersBlog(theEdit, blogId).then(() => {
          //Delete the old file from disk
          unlink(oldFilePath, err => {
            if (err) throw err
            // console.log(`successfully deleted ${oldFilePath}`);
          })
          //Save the new file to disk
          const path = this.uploadPath + blogPic;
          let fileStream = createWriteStream(path);
          fileStream.write(file.buffer);
          //Return response
          res.status(200).json({
            message: 'blog edited successfully',
          });
        });
      } else {
        theEdit = { ...edit };
        await this.blogService.editOthersBlog(theEdit, blogId).then(() => {
          res.status(200).json({
            message: 'blog edited successfully',
          });
        });
      }

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Patch('/:blogId/approve')
  @Permissions(permissionsEnum.APPROVE_BLOG)
  async approveOrDisapproveBlog(
    @Body() value: { value: boolean },
    @Param('blogId') blogId,
    @Res() res: Response,
  ) {
    let responseMessage: string;
    try {
      if (value.value === true) {
        responseMessage = 'blog approved ):'
      }
      if (value.value === false) {
        responseMessage = 'You have disapproved this blog. Is that what you intended to do?'
      }
      await this.blogService.approveOrDisapproveBlog(value.value, blogId).then(() => {
        res.status(200).json({
          message: responseMessage,
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:blogId/:commentId/show')
  @Permissions(permissionsEnum.SHOW_HIDE_COMMENT)
  async showComment(
    value = false,
    @Param('blogId') blogId,
    @Param('commentId') commentId,
    @Res() res: Response) {
    try {
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

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:blogId/:commentId/hide')
  @Permissions(permissionsEnum.SHOW_HIDE_COMMENT)
  async hideComment(value = true,
    @Param('blogId') blogId,
    @Param('commentId') commentId,
    @Res() res: Response) {
    try {
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

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Delete('/:blogId/deleteOwnBlog')
  @Permissions(permissionsEnum.DELETE_OWN_BLOG)
  async deleteOwnBlog(@Param('blogId') blogId, @Res() res: Response) {
    try {
      await this.blogService.deleteOwnBlog(blogId).then(() => {
        res.status(200).json({
          message: 'blog deleted successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Delete('/:blogId/deleteOthersBlog')
  @Permissions(permissionsEnum.UPDATE_OTHERS_BLOG)
  async deleteOthersBlog(@Param('blogId') blogId, @Res() res: Response) {
    try {
      await this.blogService.deleteOthersBlog(blogId).then(() => {
        res.status(200).json({
          message: 'blog deleted successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:blogId/comment/:commentId/deleteOwnComment')
  // Delete comment is a put request because it does not delete the blog, it only removes a comment
  @Permissions(permissionsEnum.DELETE_OWN_COMMENT)
  async deleteOwnComment(@Param('blogId') blogId, @Param('commentId') commentId, @Res() res: Response) {
    try {
      await this.blogService.deleteOwnComment(blogId, commentId).then(() => {
        res.status(200).json({
          message: 'Comment deleted successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:blogId/comment/:commentId/deleteOwnComment')
  // Delete comment is a patch request because it does not delete the blog, it only removes a comment
  @Permissions(permissionsEnum.DELETE_OTHERS_COMMENT)
  async deleteOthersComment(@Param('blogId') blogId, @Param('commentId') commentId, @Res() res: Response) {
    try {
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
