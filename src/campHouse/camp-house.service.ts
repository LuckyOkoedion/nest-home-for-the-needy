import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { ICampHouse } from './interfaces/camp-house.interface';
import { CreateCampHouseDto } from './dto/create-camp-house.dto';

@Injectable()
export class CampHouseService {
  constructor(
    @Inject('CAMP_HOUSE_MODEL')
    private readonly CampHouseModel: Model<ICampHouse>,
  ) {}
  async createCampHouse(campHouse: CreateCampHouseDto) {
    const createdCamphouse = await new this.CampHouseModel(campHouse);
    return createdCamphouse.save();
  }

  async getAllCampHouses() {
    return await this.CampHouseModel.find().exec();
  }

  async getCampHouseDetail(campHouseId) {
    return await this.CampHouseModel.findById(campHouseId).exec();
  }

  async editCampHouse(campHouseId, edit) {
    return await this.CampHouseModel.update({ _id: campHouseId }, edit).exec();
  }

  async deleteCampHouse(campHouseId) {
    return await this.CampHouseModel.remove({ _id: campHouseId }).exec();
  }
}
