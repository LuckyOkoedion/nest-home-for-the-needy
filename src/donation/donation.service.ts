import { Injectable } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Donation } from './schemas/donation.schema';

@Injectable()
export class DonationService {
  constructor(
    @InjectModel('Donation')
    private readonly DonationModel: ReturnModelType<typeof Donation>,
  ) {}
  async createDonation(donation: CreateDonationDto) {
    const createdDonation = await new this.DonationModel(donation);
    return createdDonation.save();
  }

  async getAllDonation() {
    return await this.DonationModel.find().exec();
  }

  async getDonationDetail(donationId) {
    return await this.DonationModel.findById(donationId).exec();
  }

  async updateDonation(donationId, edit) {
    return await this.DonationModel.update({ _id: donationId }, edit).exec();
  }

  async deleteDonation(donationId) {
    return await this.DonationModel.remove({ _id: donationId }).exec();
  }
}
