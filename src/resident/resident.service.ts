import { Injectable, Inject } from '@nestjs/common';
import { CreateResidentDto } from './dto/create-resident.dto';
import { Model } from 'mongoose';
import { IResident } from './interfaces/resident.interface';

@Injectable()
export class ResidentService {
  constructor(
    @Inject('RESIDENT_MODEL') private readonly ResidentModel: Model<IResident>,
  ) {}
  async createResident(resident: CreateResidentDto) {
    const createdResident = await new this.ResidentModel(resident);
    return createdResident.save();
  }

  async getAllResidents() {
    return await this.ResidentModel.find().exec();
  }

  async getResidentDetail(residentId) {
    return await this.ResidentModel.findById(residentId).exec();
  }

  async editResident(residentId, edit) {
    return await this.ResidentModel.update({ _id: residentId }, edit).exec();
  }

  async deleteResident(residentId) {
    return await this.ResidentModel.remove({ _id: residentId }).exec();
  }
}
