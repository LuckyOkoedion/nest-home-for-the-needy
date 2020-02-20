import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Res,
} from '@nestjs/common';
import { ResidentService } from './resident.service';
import { CreateResidentDto } from './dto/create-resident.dto';
import { Response } from 'express';

@Controller('/api/admin/resident')
export class ResidentController {
  constructor(private readonly residentService: ResidentService) {}

  @Post()
  async createResident(
    @Body() resident: CreateResidentDto,
    @Res() res: Response,
  ) {
    try {
      await this.residentService.createResident(resident).then(() => {
        res.status(201).json({
          message: 'A resident has been created successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  @Get()
  async getAllResidents(@Res() res: Response) {
    try {
      const result = await this.residentService.getAllResidents();
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      console.log(error);
    }
  }
  @Get('/:residentId')
  async residentDetail(@Param('residentId') residentId, @Res() res: Response) {
    try {
      const result = await this.residentService.getResidentDetail(residentId);
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:residentId')
  async editResident(
    @Param('residentId') residentId,
    @Body() edit,
    @Res() res: Response,
  ) {
    try {
      await this.residentService.editResident(residentId, edit).then(() => {
        res.status(200).json({
          message: "A resident's has been updated successfully",
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  @Delete('/:residentId')
  async deleteResident(@Param('residentId') residentId, @Res() res: Response) {
    try {
      await this.residentService.deleteResident(residentId).then(() => {
        res.status(200).json({
          message: 'A resident has been deleted successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}
