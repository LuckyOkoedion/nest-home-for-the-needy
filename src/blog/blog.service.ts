import { Injectable, Scope, Inject } from '@nestjs/common';
import { CreateBlogDto, BlogCommentDto, EditBlogDto } from './dto/create-blog.dto';
import { InjectModel } from "nestjs-typegoose";
import { REQUEST } from '@nestjs/core';
import { RequestWithUserData } from 'express.interface';
import { ReturnModelType, mongoose } from "@typegoose/typegoose";
import { Blog } from './schemas/blog.schema';

@Injectable({ scope: Scope.REQUEST })
export class BlogService {
  constructor(
    @InjectModel(Blog) private readonly BlogModel: ReturnModelType<typeof Blog>,
    @Inject(REQUEST) private readonly request: RequestWithUserData,
  ) { }
  async createBlog(blog: CreateBlogDto) {
    const userId: string = this.request.user.userId
    const theBlog = {
      authorUserId: userId,
      title: blog.title,
      category: blog.category,
      body: blog.body,
      pic: blog.pic,
      timestamp: new Date(),
    };
    const createdBlog = await new this.BlogModel(theBlog);
    return createdBlog.save();
  }

  async getAllBlog() {
    return await this.BlogModel.find().exec();
  }

  async getBlogDetail(blogId) {
    return await this.BlogModel.findById(blogId).exec();
  }
  async editOwnBlog(blog: EditBlogDto, blogId: string) {
    const editorUserId: string = this.request.user.userId;
    const theBlog = await this.BlogModel.findById(blogId);
    if (theBlog.authorUserId.toString() === editorUserId) {
      return await this.BlogModel.update({ _id: blogId }, blog).exec();
    } else {
      throw new Error(
        'You are not authorized to edit a blog that is not yours',
      );
    }
  }

  async editOthersBlog(blog, blogId) {
    return await this.BlogModel.update({ _id: blogId }, blog).exec();
  }

  async deleteOwnBlog(blogId) {
    const editorUserId: string = this.request.user.userId;
    const theBlog = await this.BlogModel.findById(blogId);
    if (theBlog.authorUserId.toString() === editorUserId) {
      return await this.BlogModel.deleteOne({ _id: blogId }).exec();
    } else {
      throw new Error(
        'You are not authorized to delete a blog that is not yours',
      );
    }
  }

  async deleteOthersBlog(blogId) {
    return await this.BlogModel.deleteOne({ _id: blogId }).exec();
  }

  async approveOrDisapproveBlog(value: boolean, blogId: string) {
    const userId: string = this.request.user.userId;
    return await this.BlogModel.updateOne(
      { _id: blogId },
      { approved: value, approvedBy: userId },
    ).exec();
  }

  async commentOnBlog(comment: { comment: string }, blogId: string) {
    const commenterUserId: string = this.request.user.userId;
    const theComment: BlogCommentDto = {
      _id: new mongoose.Types.ObjectId(),
      comment: comment.comment,
      time: new Date(),
      commenterUserId: commenterUserId,
    };
    return await this.BlogModel.updateOne(
      { _id: blogId },
      { $addToSet: { comments: theComment } },
    );
  }

  async getComments(blogId) {
    const blog = await this.BlogModel.find({ _id: blogId }).exec();
    if (blog) {
      return blog[0].comments;
    }
  }

  async editOwnComment(blogId: string, commentId: string, newComment: string) {
    const editorUserId: string = this.request.user.userId;
    const blogComment = await this.BlogModel.findById(
      blogId,
      async (err, res) => {
        await res.comments.filter(value => {
          value.commenterUserId.toString() === editorUserId && value._id === commentId;
        });
      },
    )
      .exec()
      .then(value => {
        return value.comments[0];
      });

    // console.log(blogComment)

    if (blogComment) {
      const newCommentObject = {
        hide: false,
        edited: true,
        _id: new mongoose.Types.ObjectId(),
        comment: newComment,
        time: blogComment.time,
        commenterUserId: blogComment.commenterUserId,
      };

      await this.BlogModel.updateOne(
        { _id: blogId },
        { $addToSet: { comments: newCommentObject } },
      )

      return await this.deleteOwnComment(blogId, commentId);


    } else {
      throw new Error(
        'You are not authorized to edit a comment that is not yours',
      );
    }
  }

  // async editOthersComment(
  //   blogId: string,
  //   newComment: string,
  //   commentId: string,
  // ) {
  //   return await this.BlogModel.update(
  //     { _id: blogId, 'comments._id': commentId },
  //     { $set: { comment: newComment } },
  //   );
  // }

  async deleteOwnComment(blogId: string, commentId) {
    const editorUserId: string = this.request.user.userId;
    const blogComment = await this.BlogModel.findById(
      blogId,
      async (err, res) => {
        await res.comments.filter(value => {
          value.commenterUserId.toString() === editorUserId && value._id === commentId;
        });
      },
    )
      .exec()
      .then(value => {
        return value.comments[0];
      });

    if (blogComment) {
      return await this.BlogModel.updateOne(
        { _id: blogId },
        { $pull: { comments: { _id: commentId } } },
      );
    } else {
      throw new Error(
        'You are not authorized to delete a comment that is not yours.',
      );
    }
  }

  async deleteOthersComment(blogId: string, commentId) {
    return await this.BlogModel.updateOne(
      { _id: blogId },
      { $pull: { comments: { _id: commentId } } },
    );
  }

  async hideOrShowComment(value: boolean, blogId: string, commentId: string) {
    return await this.BlogModel.updateOne(
      { _id: blogId, "comments._id": commentId },
      { $set: { "comments.$.hide": value } },
    );
  }
}
