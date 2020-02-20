import { Controller, Post, Body, Get, Put, Res } from '@nestjs/common';
import { VisitAnalyticsService } from './visit-analytics.service';
import {
  CreateVisitAnalyticsDto,
  CreateDailyVisitSummaryDto,
  CreateMonthlyVisitSummaryDto,
  CreateAnnualVisitSummaryDto,
} from './dto/create-visit-analytics.dto';
import { Response } from 'express';

@Controller('/api/admin/visit-analytics')
export class VisitAnalyticsController {
  constructor(private readonly visitAnalyticsService: VisitAnalyticsService) {}

  @Post()
  async createDonationAnalyticsDocument(
    @Body() doc: CreateVisitAnalyticsDto,
    @Res() res: Response,
  ) {
    try {
      await this.visitAnalyticsService
        .createVisitAnalyticsDocument(doc)
        .then(() => {
          res.status(201).json({
            message: 'Visit Analytics document created successfully',
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/latest')
  async getLatestDonation(@Res() res: Response) {
    try {
      const result = await this.visitAnalyticsService.getLatestVisit();
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/daily')
  async getDailySummary(@Res() res: Response) {
    try {
      const result = await this.visitAnalyticsService.getDailyVisitSummary();
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/monthly')
  async getMonthlySummary(@Res() res: Response) {
    try {
      const result = await this.visitAnalyticsService.getMonthlyVisitSummary();
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/annual')
  async getAnnualSummary(@Res() res: Response) {
    try {
      const result = await this.visitAnalyticsService.getAnnualVisitSummary();
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Put('/daily')
  async editDailySummary(
    @Body() edit: CreateDailyVisitSummaryDto,
    @Res() res: Response,
  ) {
    try {
      await this.visitAnalyticsService.postDailyVisitSummary(edit).then(() => {
        res.status(200).json({
          message: 'Daily summary updated successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Put('/monthly')
  async editMonthlySummary(
    @Body() edit: CreateMonthlyVisitSummaryDto,
    @Res() res: Response,
  ) {
    try {
      await this.visitAnalyticsService
        .postMonthlyVisitSummary(edit)
        .then(() => {
          res.status(200).json({
            message: 'Monthly summary updated successfully',
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  @Put('/annual')
  async editAnnualSummary(
    @Body() edit: CreateAnnualVisitSummaryDto,
    @Res() res: Response,
  ) {
    try {
      await this.visitAnalyticsService.postAnnualVisitSummary(edit).then(()=> {
        res.status(200).json({
          message: "Annual summary updated successfully"
        })
      })
    } catch (error) {
      console.log(error);
    }
  }
}
