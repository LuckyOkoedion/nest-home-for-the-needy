import { Injectable } from '@nestjs/common';
import { CreateNavFooterDto } from './dto/create-nav-footer.dto';
import { Model } from 'mongoose';
import { INavFooter } from './interfaces/nav-footer.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NavFooterService {
  constructor(
    @InjectModel('NavFooter')
    private readonly NavFooterModel: Model<INavFooter>,
  ) {}
  async createNavFooterData(navFooter: CreateNavFooterDto) {
    //Ensure that there is only one instance of the document in the database.
    const numberOfDocuments = await this.NavFooterModel.estimatedDocumentCount();
    if (numberOfDocuments < 1) {
      const createdNavFooter = await new this.NavFooterModel(navFooter);
      return createdNavFooter.save();
    }
    if (numberOfDocuments >= 1) {
      throw new Error(
        'An instance of this document already exists. You cannot have more than one.',
      );
    }
  }

  async getNavFooterData() {
    const result = await this.NavFooterModel.find().exec();
    return result[0];
  }

  async updateNavFooterData(edit) {
    return await this.NavFooterModel.updateOne({}, edit).exec();
  }
}
