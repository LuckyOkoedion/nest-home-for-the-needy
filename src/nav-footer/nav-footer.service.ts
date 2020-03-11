import { Injectable } from '@nestjs/common';
import { CreateNavFooterDto } from './dto/create-nav-footer.dto';
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from '@typegoose/typegoose';
import { NavFooter } from './schemas/nav-footer.schema';

@Injectable()
export class NavFooterService {
  constructor(
    @InjectModel(NavFooter)
    private readonly NavFooterModel: ReturnModelType<typeof NavFooter>,
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
