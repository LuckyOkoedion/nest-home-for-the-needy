import { Injectable, Inject } from '@nestjs/common';
import { CreateBlogPageDto } from './dto/create-blog-page.dto';
import { Model } from 'mongoose';
import { IBlogPage } from './interfaces/blog-page.interface';

@Injectable()
export class BlogPageService {
  constructor(
    @Inject('BLOG_PAGE_MODEL') private readonly BlogPageModel: Model<IBlogPage>,
  ) {}
  async createBlogPageData(blogPage: CreateBlogPageDto) {
    //Ensure that there is only one instance of the document in the database.
    const numberOfDocuments = await this.BlogPageModel.estimatedDocumentCount();
    if (
      !numberOfDocuments ||
      numberOfDocuments === undefined ||
      numberOfDocuments < 1 ||
      numberOfDocuments <= 0
    ) {
      const createdBlogPage = await new this.BlogPageModel(blogPage);
      return createdBlogPage.save();
    } else {
      console.log(
        'An instance of this document already exists. You cannot have more than one.',
      );
    }
  }

  async getBlogPageData() {
    const result = await this.BlogPageModel.find().exec();
    return result[0];
  }

  async updateBlogPageData(edit) {
    return await this.BlogPageModel.updateOne({},edit)
  }
}
