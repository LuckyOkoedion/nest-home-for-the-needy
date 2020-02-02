import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ResidentService } from './resident.service';
import { CreateResidentDto } from './dto/create-resident.dto';

@Controller('/api/admin/resident')
export class ResidentController {
  constructor(private readonly residentService: ResidentService) {}

  @Post()
  async createResident(@Body() resident: CreateResidentDto) {
    try {
      await this.residentService.createResident(resident);
    } catch (error) {
      console.log(error);
    }
  }
  @Get()
  async getAllResidents() {
    try {
      await this.residentService.getAllResidents();
    } catch (error) {
      console.log(error);
    }
  }
  @Get('/:residentId')
  async residentDetail(@Param('residentId') residentId) {
    try {
      await this.residentService.getResidentDetail(residentId);
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:residentId')
  async editResident(@Param('residentId') residentId, @Body() edit) {
    try {
      await this.residentService.editResident(residentId, edit);
    } catch (error) {
      console.log(error);
    }
  }
  @Delete('/:residentId')
  async deleteResident(@Param('residentId') residentId) {
    try {
      await this.residentService.deleteResident(residentId);
    } catch (error) {
      console.log(error);
    }
  }
}
