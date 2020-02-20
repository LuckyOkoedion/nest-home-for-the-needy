import { Injectable, Inject } from '@nestjs/common';
import {
  CreateVisitAnalyticsDto,
  CreateDailyVisitSummaryDto,
  CreateMonthlyVisitSummaryDto,
  CreateAnnualVisitSummaryDto,
} from './dto/create-visit-analytics.dto';
import { Model } from 'mongoose';
import { IVisitAnalytics } from './interfaces/visit-analytics.interface';

@Injectable()
export class VisitAnalyticsService {
  constructor(
    @Inject('VISIT_ANALYTICS_MODEL')
    private readonly VisitAnalyticsModel: Model<IVisitAnalytics>,
  ) {}

  async createVisitAnalyticsDocument(doc: CreateVisitAnalyticsDto) {
    //Ensure that there is only one instance of the document in the database.
    const numberOfDocuments = await this.VisitAnalyticsModel.estimatedDocumentCount();
    if (numberOfDocuments < 1) {
      const createdVisitAnalytics = await new this.VisitAnalyticsModel(doc);
      return createdVisitAnalytics.save();
    }
    if (numberOfDocuments >= 1) {
      console.log(
        'An instance of this document already exists. You cannot have more than one.',
      );
    }
  }

  async getLatestVisit() {
    const result = await this.VisitAnalyticsModel.find();
    const firstEntry = result[0];
    return firstEntry.latestVisitId;
  }

  async getDailyVisitSummary() {
    const result = await this.VisitAnalyticsModel.find();
    const firstEntry = result[0];
    return firstEntry.dailySummary;
  }
  async postDailyVisitSummary(summary: CreateDailyVisitSummaryDto) {
    // Though a post of specific summary, it is an 'update' on the whole model and not a 'post'.
    return await this.VisitAnalyticsModel.updateOne(
      {},
      { $set: { dailySummary: summary } },
    ).exec();
  }

  async getMonthlyVisitSummary() {
    const result = await this.VisitAnalyticsModel.find();
    const firstEntry = result[0];
    return firstEntry.monthlySummary;
  }
  async postMonthlyVisitSummary(summary: CreateMonthlyVisitSummaryDto) {
    // Though a post of specific summary, it is an 'update' on the whole model and not a 'post'.
    return await this.VisitAnalyticsModel.updateOne(
      {},
      { $set: { monthlySummary: summary } },
    ).exec();
  }

  async getAnnualVisitSummary() {
    const result = await this.VisitAnalyticsModel.find();
    const firstEntry = result[0];
    return firstEntry.annualSummary;
  }
  async postAnnualVisitSummary(summary: CreateAnnualVisitSummaryDto) {
    // Though a post of specific summary, it is an 'update' on the whole model and not a 'post'.
    return await this.VisitAnalyticsModel.updateOne(
      {},
      { $set: { annualSummary: summary } },
    ).exec();
  }
}
