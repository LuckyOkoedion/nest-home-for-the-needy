import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Put,
  Param,
  Res,
} from '@nestjs/common';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { Response } from 'express';

@Controller('/api/admin/donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}
  @Post()
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
      console.log(error);
    }
  }
  @Get()
  async getAllDonation(@Res() res: Response) {
    try {
      const allDonations = await this.donationService.getAllDonation();
      if (allDonations) {
        res.status(200).json(allDonations);
      }
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }
  @Put('/:donationId')
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
      console.log(error);
    }
  }
  @Delete('/:donationId')
  async deleteDonation(@Param('donationId') donationId, @Res() res: Response) {
    try {
      await this.donationService.deleteDonation(donationId).then(() => {
        res.status(200).json({
          message: 'A donation record deleted successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}
