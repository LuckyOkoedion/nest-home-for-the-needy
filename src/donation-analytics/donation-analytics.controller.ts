import { Controller, Post, Get, Put, Body, Patch } from '@nestjs/common';
import { DonationAnalyticsService } from './donation-analytics.service';
import {
  CreateDonationAnalyticsDto,
  CreateDailyDonationSummaryDto,
  CreateMonthlyDonationSummaryDto,
  CreateAnnualDonationSummaryDto,
} from './dto/create-donation-analytics.dto';

@Controller('/api/admin/donation-analytics')
export class DonationAnalyticsController {
  constructor(
    private readonly donationAnalyticsService: DonationAnalyticsService,
  ) {}

  @Post()
  async createDonationAnalyticsDocument(
    @Body() doc: CreateDonationAnalyticsDto,
  ) {
    try {
      await this.donationAnalyticsService.createDonationAnalyticsDocument(doc);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/latest')
  async getLatestDonation() {
    try {
      await this.donationAnalyticsService.getLatestDonation();
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/daily')
  async getDailySummary() {
    try {
      await this.donationAnalyticsService.getDailyDonationSummary();
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/monthly')
  async getMonthlySummary() {
    try {
      await this.donationAnalyticsService.getMonthlyDonationSummary();
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/annual')
  async getAnnualSummary() {
    try {
      await this.donationAnalyticsService.getAnnualDonationSummary();
    } catch (error) {
      console.log(error);
    }
  }

  @Put('/daily')
  async editDailySummary(@Body() edit: CreateDailyDonationSummaryDto) {
    try {
      await this.donationAnalyticsService.postDailyDonationSummary(edit);
    } catch (error) {
      console.log(error);
    }
  }

  @Put('/monthly')
  async editMonthlySummary(@Body() edit: CreateMonthlyDonationSummaryDto) {
    try {
      await this.donationAnalyticsService.postMonthlyDonationSummary(edit);
    } catch (error) {
      console.log(error);
    }
  }

  @Put('/annual')
  async editAnnualSummary(@Body() edit: CreateAnnualDonationSummaryDto) {
    try {
      await this.donationAnalyticsService.postAnnualDonationSummary(edit);
    } catch (error) {
      console.log(error);
    }
  }
}
