import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  CreateAboutPageDto,
  EditAboutPageDto,
} from './dto/create-about-page.dto';
import { IAboutPage } from './interfaces/about-page.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AboutPageService {
  constructor(
    @InjectModel('AboutPage')
    private readonly AboutPageModel: Model<IAboutPage>,
  ) {}
  async createAboutPageData(aboutPage: CreateAboutPageDto) {
    //Ensure that there is only one instance of the document in the database.
    const numberOfDocuments = await this.AboutPageModel.estimatedDocumentCount();
    if (numberOfDocuments < 1) {
      const createdAboutPage = await new this.AboutPageModel(aboutPage);
      return createdAboutPage.save();
    }
    if (numberOfDocuments >= 1) {
      throw new Error(
        'An instance of this document already exists. You cannot have more than one.',
      );
    }
  }

  async getAboutPageData() {
    const result = await this.AboutPageModel.findOne().exec();
    return result[0];
  }

  async updateAboutPageData(data: EditAboutPageDto) {
    return await this.AboutPageModel.update({}, data).exec();
  }
}
