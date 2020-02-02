import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Param,
  } from '@nestjs/common';
import { CampHouseService } from './camp-house.service';
import { CreateCampHouseDto } from './dto/create-camp-house.dto';
  
  @Controller('/api/admin/camp-house')
  export class CampHouseController {
    constructor(private readonly campHouseService: CampHouseService) {}
  
    @Post()
    async createCampHouse(@Body() house: CreateCampHouseDto) {
      try {
        await this.campHouseService.createCampHouse(house);
      } catch (error) {
        console.log(error);
      }
    }
    @Get()
    async getAllCampHouses() {
      try {
        await this.campHouseService.getAllCampHouses();
      } catch (error) {
        console.log(error);
      }
    }
    @Get('/:campHouseId')
    async campHouseDetail(@Param('campHouseId') campHouseId) {
      try {
        await this.campHouseService.getCampHouseDetail(campHouseId);
      } catch (error) {
        console.log(error);
      }
    }
    @Put('/:campHouseId')
    async editCampHouse(@Param('campHouseId') campHouseId, @Body() edit) {
      try {
        await this.campHouseService.editCampHouse(campHouseId, edit);
      } catch (error) {
        console.log(error);
      }
    }
    @Delete('/:campHouseId')
    async deleteCampHouse(@Param('campHouseId') campHouseId) {
      try {
        await this.campHouseService.deleteCampHouse(campHouseId);
      } catch (error) {
        console.log(error);
      }
    }
  }
  