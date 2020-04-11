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
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { permissionsEnum } from 'src/utils/permissions.enum';

@Controller('/api/admin/donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) { }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
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

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
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
  async donationDetail(@Param('donationId') donationId, @Res() res: Response) {
    try {
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

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Put('/:donationId')
  @Permissions(permissionsEnum.UPDATE_DONATIONS)
  async updateDonation(
    @Param('donationId') donationId,
    @Body() edit,
    @Res() res: Response,
  ) {
    try {
      await this.donationService.updateDonation(donationId, edit).then(() => {
        res.status(200).json({
          message: 'A donation data updated successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  @UseGuards(AuthenticatedGuard, PermissionsGuard)
  @Delete('/:donationId')
  @Permissions(permissionsEnum.DELETE_DONATIONS)
  async deleteDonation(@Param('donationId') donationId, @Res() res: Response) {
    try {
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
