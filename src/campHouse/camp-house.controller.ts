import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Res,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CampHouseService } from './camp-house.service';
import { CreateCampHouseDto } from './dto/create-camp-house.dto';
import { Response } from 'express';
import { Permissions } from 'src/auth/permissions.decorator';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { permissionsEnum } from 'src/utils/permissions.enum';

@Controller('/api/admin/camp-house')
export class CampHouseController {
  constructor(private readonly campHouseService: CampHouseService) { }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Post()
  @Permissions(permissionsEnum.CREATE_INTERNAL_DATA)
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
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Get()
  @Permissions(permissionsEnum.READ_INTERNAL_DATA)
  async getAllCampHouses(@Res() res: Response) {
    try {
      const allCampHouses = await this.campHouseService.getAllCampHouses();
      if (allCampHouses) {
        res.status(200).json(allCampHouses);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Get('/:campHouseId')
  @Permissions(permissionsEnum.READ_INTERNAL_DATA)
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
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:campHouseId')
  @Permissions(permissionsEnum.UPDATE_INTERNAL_DATA)
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
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Delete('/:campHouseId')
  @Permissions(permissionsEnum.DELETE_INTERNAL_DATA)
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
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }
}
