import { Controller, Post, Body, Get, Put } from '@nestjs/common';
import { VisitAnalyticsService } from './visit-analytics.service';
import { CreateVisitAnalyticsDto } from './dto/create-visit-analytics.dto';

@Controller('/api/admin/visit-analytics')
export class VisitAnalyticsController {
  constructor(private readonly visitAnalyticsService: VisitAnalyticsService) {}

  @Post('/daily')
  async postDailySummary(@Body() summary: CreateVisitAnalyticsDto) {
    try {
      await this.visitAnalyticsService.postDailyVisitSummary(summary);
    } catch (error) {
      console.log(error);
    }
  }

  @Post('/monthly')
  async postMonthlySummary(@Body() summary: CreateVisitAnalyticsDto) {
    try {
      await this.visitAnalyticsService.postMonthlyVisitSummary(summary);
    } catch (error) {
      console.log(error);
    }
  }

  @Post('/annual')
  async postAnnualSummary(@Body() summary: CreateVisitAnalyticsDto) {
    try {
      await this.visitAnalyticsService.postAnnualVisitSummary(summary);
    } catch (error) {}
  }

  @Get('/daily')
  async getDailySummary() {
    try {
      await this.visitAnalyticsService.getDailyVisitSummary();
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/monthly')
  async getMonthlySummary() {
    try {
      await this.visitAnalyticsService.getMonthlyVisitSummary();
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/annual')
  async getAnnualSummary() {
    try {
      await this.visitAnalyticsService.getAnnualVisitSummary();
    } catch (error) {
      console.log(error);
    }
  }

  @Put('/daily')
  async editDailySummary(@Body() edit) {
    try {
      await this.visitAnalyticsService.editDailyVisitSummary(edit);
    } catch (error) {
      console.log(error);
    }
  }

  @Put('/monthly')
  async editMonthlySummary(@Body() edit) {
    try {
      await this.visitAnalyticsService.editMonthlyVisitSummary(edit);
    } catch (error) {
      console.log(error);
    }
  }

  @Put('/annual')
  async editAnnualSummary(@Body() edit) {
    try {
      await this.visitAnalyticsService.editAnnualVisitSummary(edit);
    } catch (error) {
      console.log(error);
    }
  }
}
