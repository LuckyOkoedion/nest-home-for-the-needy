import { Injectable } from '@nestjs/common';
import { CreateCampHouseDto } from './dto/create-camp-house.dto';
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from '@typegoose/typegoose';
import { CampHouse } from './schemas/camp-house.schema';

@Injectable()
export class CampHouseService {
  constructor(
    @InjectModel(CampHouse)
    private readonly CampHouseModel: ReturnModelType<typeof CampHouse>,
  ) { }
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
    return await this.CampHouseModel.deleteOne({ _id: campHouseId }).exec();
  }
}
