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
import { CampHouseService } from './camp-house.service';
import { CreateCampHouseDto } from './dto/create-camp-house.dto';
import { Response } from 'express';

@Controller('/api/admin/camp-house')
export class CampHouseController {
  constructor(private readonly campHouseService: CampHouseService) {}

  @Post()
  async createCampHouse(
    @Body() house: CreateCampHouseDto,
    @Res() res: Response,
  ) {
    try {
      await this.campHouseService.createCampHouse(house).then(() => {
        res.status(201).json({
          message: 'A camp house created successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  @Get()
  async getAllCampHouses(@Res() res: Response) {
    try {
      const allCampHouses = await this.campHouseService.getAllCampHouses();
      if (allCampHouses) {
        res.status(200).json(allCampHouses);
      }
    } catch (error) {
      console.log(error);
    }
  }
  @Get('/:campHouseId')
  async campHouseDetail(
    @Param('campHouseId') campHouseId,
    @Res() res: Response,
  ) {
    try {
      const campHouseDetail = await this.campHouseService.getCampHouseDetail(
        campHouseId,
      );
      if (campHouseDetail) {
        res.status(200).json(campHouseDetail);
      }
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:campHouseId')
  async editCampHouse(
    @Param('campHouseId') campHouseId,
    @Body() edit,
    @Res() res: Response,
  ) {
    try {
      await this.campHouseService.editCampHouse(campHouseId, edit).then(() => {
        res.status(200).json({
          message: 'A camp house edited successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  @Delete('/:campHouseId')
  async deleteCampHouse(
    @Param('campHouseId') campHouseId,
    @Res() res: Response,
  ) {
    try {
      await this.campHouseService.deleteCampHouse(campHouseId).then(() => {
        res.status(200).json({
          message: 'A camp house deleted successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}
