import { Injectable, Inject } from '@nestjs/common';
import { CreateHomePageDto } from './dto/create-home-page.dto';
import { Model } from 'mongoose';
import { IHomePage } from './interfaces/home-page.interface';

@Injectable()
export class HomePageService {
  constructor(
    @Inject('HOME_PAGE_MODEL') private readonly HomePageModel: Model<IHomePage>,
  ) {}
  async createHomePageData(homePage: CreateHomePageDto) {
    //Ensure that there is only one instance of the document in the database.
    const numberOfDocuments = await this.HomePageModel.estimatedDocumentCount();
    if (numberOfDocuments < 1) {
      const createdHomePage = await new this.HomePageModel(homePage);
      return createdHomePage.save();
    }
    if (numberOfDocuments >= 1) {
      console.log(
        'An instance of this document already exists. You cannot have more than one.',
      );
    }
  }

  async getHomePageData() {
    const result = await this.HomePageModel.find().exec();
    return result[0];
  }

  async updateHomePageData(edit) {
    return await this.HomePageModel.updateOne({}, edit).exec();
  }
}
