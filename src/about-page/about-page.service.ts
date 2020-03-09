import { Injectable } from '@nestjs/common';
import {
  CreateAboutPageDto,
  EditAboutPageDto,
} from './dto/create-about-page.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from "@typegoose/typegoose";
import { AboutPage } from './schemas/about-page.schema';

@Injectable()
export class AboutPageService {
  constructor(
    @InjectModel('AboutPage')
    private readonly AboutPageModel: ReturnModelType<typeof AboutPage>,
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
