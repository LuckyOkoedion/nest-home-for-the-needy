import { Injectable, Inject } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { Model } from 'mongoose';
import { IDonation } from './interfaces/donation.interface';

@Injectable()
export class DonationService {
  constructor(
    @Inject('DONATION_MODEL') private readonly DonationModel: Model<IDonation>,
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
