import { Controller, Post, Get, Put, Body, Param, Res } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { VisitService } from './visit.service';
import { Response } from 'express';
import { IUserData } from 'src/user/interfaces/user.interface';
import { IVisit } from './interfaces/visit.interface';
import { Mongoose } from 'mongoose';

@Controller('/api/admin/visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Post()
  async createVisit(
    @Body() visit: CreateVisitDto,
    @Res() res: Response,
    @Param('userData') userData?: IUserData,
  ) {
    try {
      const theVisit = {
        date: visit.date,
        time: visit.time,
        ipAddress: visit.ipAddress,
        ipDevice: visit.ipDevice,
        ipState: visit.ipState,
        userId: userData.userId,
      };
      await this.visitService.createVisit(theVisit).then(() => {
        res.status(201).json({
          message: 'A visit entry done successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  @Get()
  async getAllVisits(@Res() res: Response) {
    try {
      const visit = await this.visitService.getAllVisits();
      if (visit) {
        res.status(200).json(visit);
      }
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:visitId')
  async editVisit(
    @Param('visitId') visitId,
    @Body() edit,
    @Res() res: Response,
  ) {
    try {
      await this.visitService.updateVisit(visitId, edit).then(() => {
        res.status(200).json({
          message: 'Visit object updated successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}
