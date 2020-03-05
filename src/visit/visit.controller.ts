import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  Res,
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
  Scope,
  Inject,
} from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { VisitService } from './visit.service';
import { Response } from 'express';
import { IUserData } from 'src/user/interfaces/user.interface';
import { RequestWithUserData } from 'express.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { REQUEST } from '@nestjs/core';
import { permissionsEnum } from 'src/utils/permissions.enum';

@Controller({ path: '/api/admin/visit', scope: Scope.REQUEST })
export class VisitController {
  userData: IUserData;

  constructor(
    private readonly visitService: VisitService,
    @Inject(REQUEST) private readonly req: RequestWithUserData,
  ) {
    this.req = req;
    this.userData = this.req.userData;
  }

  @Post()
  async createVisit(
    @Body() visit: CreateVisitDto,
    @Res() res: Response,
    userData?: IUserData,
  ) {
    try {
      let theVisit: CreateVisitDto;

      if (this.req.userData) {
        userData = this.userData;
        theVisit = {
          date: visit.date,
          time: visit.time,
          ipAddress: visit.ipAddress,
          ipDevice: visit.ipDevice,
          ipState: visit.ipState,
          userId: userData.userId,
        };
      } else {
        theVisit = {
          date: visit.date,
          time: visit.time,
          ipAddress: visit.ipAddress,
          ipDevice: visit.ipDevice,
          ipState: visit.ipState,
        };
      }
      await this.visitService.createVisit(theVisit).then(() => {
        res.status(201).json({
          message: 'A visit entry done successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get()
  @Permissions(permissionsEnum.MANAGE_VISITS)
  async getAllVisits(@Res() res: Response) {
    try {
      const visit = await this.visitService.getAllVisits();
      if (visit) {
        res.status(200).json(visit);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:visitId')
  @Permissions(permissionsEnum.MANAGE_VISITS)
  async editVisit(@Param() params, @Body() edit, @Res() res: Response) {
    try {
      const visitId = params.visitId;
      await this.visitService.updateVisit(visitId, edit).then(() => {
        res.status(200).json({
          message: 'Visit object updated successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }
}
