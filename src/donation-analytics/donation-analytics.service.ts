import { Injectable, Inject } from '@nestjs/common';
import {
  CreateDonationAnalyticsDto,
  CreateDailyDonationSummaryDto,
  CreateMonthlyDonationSummaryDto,
  CreateAnnualDonationSummaryDto,
} from './dto/create-donation-analytics.dto';
import { Model } from 'mongoose';
import { IDonationAnalytics } from './interfaces/donation-analytics.interface';

@Injectable()
export class DonationAnalyticsService {
  constructor(
    @Inject('DONATION_ANALYTICS_MODEL')
    private readonly DonationAnalyticsModel: Model<IDonationAnalytics>,
  ) {}

  async createDonationAnalyticsDocument(doc: CreateDonationAnalyticsDto) {
    //Ensure that there is only one instance of the document in the database.
    const numberOfDocuments = await this.DonationAnalyticsModel.estimatedDocumentCount();
    if (numberOfDocuments < 1) {
      const createdDonationAnalytics = await new this.DonationAnalyticsModel(
        doc,
      );
      return createdDonationAnalytics.save();
    }
    if (numberOfDocuments >= 1) {
      console.log(
        'An instance of this document already exists. You cannot have more than one.',
      );
    }
  }

  async getLatestDonation() {
    const result = await this.DonationAnalyticsModel.find();
    const firstEntry = result[0];
    return firstEntry.latestDonationId;
  }

  async getDailyDonationSummary() {
    const result = await this.DonationAnalyticsModel.find();
    const firstEntry = result[0];
    return firstEntry.dailySummary;
  }
  async postDailyDonationSummary(summary: CreateDailyDonationSummaryDto) {
    // Though a post of specific summary, it is an 'update' on the whole model and not a 'post'.
    return await this.DonationAnalyticsModel.updateOne(
      {},
      { $set: { dailySummary: summary } },
    ).exec();
  }

  async getMonthlyDonationSummary() {
    const result = await this.DonationAnalyticsModel.find();
    const firstEntry = result[0];
    return firstEntry.monthlySummary;
  }
  async postMonthlyDonationSummary(summary: CreateMonthlyDonationSummaryDto) {
    // Though a post of specific summary, it is an 'update' on the whole model and not a 'post'.
    return await this.DonationAnalyticsModel.updateOne(
      {},
      { $set: { monthlySummary: summary } },
    ).exec();
  }

  async getAnnualDonationSummary() {
    const result = await this.DonationAnalyticsModel.find();
    const firstEntry = result[0];
    return firstEntry.annualSummary;
  }
  async postAnnualDonationSummary(summary: CreateAnnualDonationSummaryDto) {
    // Though a post of specific summary, it is an 'update' on the whole model and not a 'post'.
    return await this.DonationAnalyticsModel.updateOne(
      {},
      { $set: { annualSummary: summary } },
    ).exec();
  }
}
