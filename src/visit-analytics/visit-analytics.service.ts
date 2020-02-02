import { Injectable, Inject } from '@nestjs/common';
import { CreateVisitAnalyticsDto } from './dto/create-visit-analytics.dto';
import { Model } from 'mongoose';
import { IVisitAnalytics } from './interfaces/visit-analytics.interface';

@Injectable()
export class VisitAnalyticsService {
  constructor(
    @Inject('VISIT_ANALYTICS_MODEL')
    private readonly VisitAnalyticsModel: Model<IVisitAnalytics>,
  ) {}
  async getDailyVisitSummary() {}
  async postDailyVisitSummary(visit: CreateVisitAnalyticsDto) {}
  async editDailyVisitSummary(edit) {}

  async getMonthlyVisitSummary() {}
  async postMonthlyVisitSummary(visit: CreateVisitAnalyticsDto) {}
  async editMonthlyVisitSummary(edit) {}

  async getAnnualVisitSummary() {}
  async postAnnualVisitSummary(visit: CreateVisitAnalyticsDto) {}
  async editAnnualVisitSummary(edit) {}
}
