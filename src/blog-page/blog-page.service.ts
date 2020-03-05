import { Injectable } from '@nestjs/common';
import { CreateBlogPageDto } from './dto/create-blog-page.dto';
import { Model } from 'mongoose';
import { IBlogPage } from './interfaces/blog-page.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BlogPageService {
  constructor(
    @InjectModel('BlogPage') private readonly BlogPageModel: Model<IBlogPage>,
  ) {}
  async createBlogPageData(blogPage: CreateBlogPageDto) {
    //Ensure that there is only one instance of the document in the database.
    const numberOfDocuments = await this.BlogPageModel.estimatedDocumentCount();
    if (numberOfDocuments < 1) {
      const createdBlogPage = await new this.BlogPageModel(blogPage);
      return createdBlogPage.save();
    }
    if (numberOfDocuments >= 1) {
      throw new Error(
        'An instance of this document already exists. You cannot have more than one.',
      );
    }
  }

  async getBlogPageData() {
    const result = await this.BlogPageModel.find().exec();
    return result[0];
  }

  async updateBlogPageData(edit) {
    return await this.BlogPageModel.updateOne({}, edit);
  }
}
