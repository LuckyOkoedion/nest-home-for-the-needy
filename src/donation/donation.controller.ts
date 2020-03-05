import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Put,
  Param,
  Res,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { permissionsEnum } from 'src/utils/permissions.enum';

@Controller('/api/admin/donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  @Permissions(permissionsEnum.MAKE_DONATIONS)
  async createDonation(
    @Body() donation: CreateDonationDto,
    @Res() res: Response,
  ) {
    try {
      await this.donationService.createDonation(donation).then(() => {
        res.status(201).json({
          message: 'A donation made successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get()
  @Permissions(permissionsEnum.READ_DONATIONS)
  async getAllDonation(@Res() res: Response) {
    try {
      const allDonations = await this.donationService.getAllDonation();
      if (allDonations) {
        res.status(200).json(allDonations);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  @Get('/:donationId')
  async donationDetail(@Param() params, @Res() res: Response) {
    try {
      const donationId = params.donationId;
      const donationDetail = await this.donationService.getDonationDetail(
        donationId,
      );
      if (donationDetail) {
        res.status(200).json(donationDetail);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:donationId')
  @Permissions(permissionsEnum.UPDATE_DONATIONS)
  async updateDonation(
    @Param() params,
    @Body() edit,
    @Res() res: Response,
  ) {
    try {
      const donationId = params.donationId
      await this.donationService.updateDonation(donationId, edit).then(() => {
        res.status(200).json({
          message: 'A donation data updated successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete('/:donationId')
  @Permissions(permissionsEnum.DELETE_DONATIONS)
  async deleteDonation(@Param() params, @Res() res: Response) {
    try {
      const donationId = params.donationId;
      await this.donationService.deleteDonation(donationId).then(() => {
        res.status(200).json({
          message: 'A donation record deleted successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }
}
