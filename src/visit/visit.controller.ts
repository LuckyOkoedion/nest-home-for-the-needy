import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { VisitService } from './visit.service';

@Controller('/api/admin/visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Post()
  async createVisit(@Body() visit: CreateVisitDto) {
    try {
      await this.visitService.createVisit(visit);
    } catch (error) {
      console.log(error);
    }
  }
  @Get()
  async getAllVisits() {
    try {
      await this.visitService.getAllVisits();
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:visitId')
  async editVisit(@Param('visitId') visitId, @Body() edit) {
    try {
      await this.visitService.updateVisit(visitId, edit);
    } catch (error) {
      console.log(error);
    }
  }
}
