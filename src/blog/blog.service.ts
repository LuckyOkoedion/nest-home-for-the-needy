import { Injectable, Inject } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Model } from 'mongoose';
import { IBlog, IBlogComment } from './interfaces/blog.interface';

@Injectable()
export class BlogService {
  constructor(@Inject('BLOG_MODEL') private readonly BlogModel: Model<IBlog>) {}
  async createBlog(blog: CreateBlogDto) {
    const createdBlog = await new this.BlogModel(blog);
    return createdBlog.save();
  }

  async getAllBlog() {
    return await this.BlogModel.find().exec();
  }

  async getBlogDetail(blogId) {
    return await this.BlogModel.findById(blogId).exec();
  }
  async editBlog(blog, blogId) {
    return await this.BlogModel.update({ _id: blogId }, blog).exec();
  }

  async deleteBlog(blogId) {
    return await this.BlogModel.remove({ _id: blogId }).exec();
  }

  async approveOrDisapproveBlog(
    value: boolean,
    blogId: string,
    userId: string,
  ) {
    return await this.BlogModel.updateOne(
      { _id: blogId },
      { approved: value, approvedBy: userId },
    ).exec();
  }

  async commentOnBlog(comment: IBlogComment, blogId: string) {
    return await this.BlogModel.updateOne(
      { _id: blogId },
      { $addToSet: { comments: comment } },
    );
  }

  async getComments(blogId) {
    const blog = await this.BlogModel.find({ _id: blogId }).exec();
    if (blog) {
      return blog[0].comments;
    }
  }

  async editComment(blogId: string, commentId: string, newComment: string) {
    return await this.BlogModel.updateOne(
      { _id: blogId, comments: { _id: commentId } },
      { $set: { comment: newComment } },
    );
  }

  async editOthersComment(
    blogId: string,
    newComment: string,
    commentId: string,
  ) {
    return await this.BlogModel.updateOne(
      { _id: blogId, comments: { _id: commentId } },
      { $set: { comment: newComment } },
    );
  }

  async deleteComment(blogId: string, commentId) {
    return await this.BlogModel.updateOne(
      { _id: blogId },
      { $pull: { comments: { _id: commentId } } },
    );
  }

  async hideOrShowComment(value: boolean, blogId: string, commentId: string) {
    return await this.BlogModel.updateOne(
      { _id: blogId, comments: { _id: commentId } },
      { $set: { hide: value } },
    );
  }
}
