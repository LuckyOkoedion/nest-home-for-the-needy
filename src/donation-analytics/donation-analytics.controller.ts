import { Controller, Post, Get, Put, Body, Patch, Res } from '@nestjs/common';
import { DonationAnalyticsService } from './donation-analytics.service';
import {
  CreateDonationAnalyticsDto,
  CreateDailyDonationSummaryDto,
  CreateMonthlyDonationSummaryDto,
  CreateAnnualDonationSummaryDto,
} from './dto/create-donation-analytics.dto';
import { Response } from 'express';

@Controller('/api/admin/donation-analytics')
export class DonationAnalyticsController {
  constructor(
    private readonly donationAnalyticsService: DonationAnalyticsService,
  ) {}

  @Post()
  async createDonationAnalyticsDocument(
    @Body() doc: CreateDonationAnalyticsDto,
    @Res() res: Response,
  ) {
    try {
      await this.donationAnalyticsService
        .createDonationAnalyticsDocument(doc)
        .then(() => {
          res.status(201).json({
            message: 'Donation analytics document created successfully',
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/latest')
  async getLatestDonation(@Res() res: Response) {
    try {
      const latestDonation = await this.donationAnalyticsService.getLatestDonation();
      if (latestDonation) {
        res.status(200).json(latestDonation);
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/daily')
  async getDailySummary(@Res() res: Response) {
    try {
      const dailySummary = await this.donationAnalyticsService.getDailyDonationSummary();
      if (dailySummary) {
        res.status(200).json(dailySummary);
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/monthly')
  async getMonthlySummary(@Res() res: Response) {
    try {
      const monthlySummary = await this.donationAnalyticsService.getMonthlyDonationSummary();
      if (monthlySummary) {
        res.status(200).json(monthlySummary);
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/annual')
  async getAnnualSummary(@Res() res: Response) {
    try {
      const summary = await this.donationAnalyticsService.getAnnualDonationSummary();
      if (summary) {
        res.status(200).json(summary);
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Put('/daily')
  async editDailySummary(
    @Body() edit: CreateDailyDonationSummaryDto,
    @Res() res: Response,
  ) {
    try {
      await this.donationAnalyticsService
        .postDailyDonationSummary(edit)
        .then(() => {
          res.status(201).json({
            message: 'Daily summary updated successfully',
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  @Put('/monthly')
  async editMonthlySummary(
    @Body() edit: CreateMonthlyDonationSummaryDto,
    @Res() res: Response,
  ) {
    try {
      await this.donationAnalyticsService
        .postMonthlyDonationSummary(edit)
        .then(() => {
          res.status(201).json({
            message: 'Monthly summary updated successfully',
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  @Put('/annual')
  async editAnnualSummary(
    @Body() edit: CreateAnnualDonationSummaryDto,
    @Res() res: Response,
  ) {
    try {
      await this.donationAnalyticsService
        .postAnnualDonationSummary(edit)
        .then(() => {
          res.status(201).json({
            message: 'Annual summary updated successfully',
          });
        });
    } catch (error) {
      console.log(error);
    }
  }
}
