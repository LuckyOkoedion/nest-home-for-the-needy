import { Injectable, Inject } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { Model } from 'mongoose';
import { IVisit } from './interfaces/visit.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class VisitService {
  constructor(
    @InjectModel('Visit') private readonly VisitModel: Model<IVisit>,
  ) {}
  async createVisit(visit: CreateVisitDto) {
    const emptyVisitArray = { visits: [] };
    // Create collection if it does not yet exist. And add the new visit to the collection which is an array.
    const numberOfDocuments = await this.VisitModel.estimatedDocumentCount();
    if (numberOfDocuments < 1) {
      await new this.VisitModel(emptyVisitArray).save();
      return await this.VisitModel.update(
        {},
        { $addToSet: { visits: visit } },
      ).exec();
    }

    if (numberOfDocuments >= 1) {
      //Else only add to the collection
      return await this.VisitModel.update(
        {},
        { $addToSet: { visits: visit } },
      ).exec();
    }
  }
  async updateVisit(visitId, edit) {
    return await this.VisitModel.update(
      { visits: { _id: visitId } },
      edit,
    ).exec();
  }
  async getAllVisits() {
    return await this.VisitModel.find({ visits: {} }).exec();
  }
}
