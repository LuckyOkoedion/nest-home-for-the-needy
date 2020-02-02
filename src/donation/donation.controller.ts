import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Put,
  Param,
} from '@nestjs/common';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Controller('/api/admin/donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}
  @Post()
  async createDonation(@Body() donation: CreateDonationDto) {
    try {
      await this.donationService.createDonation(donation);
    } catch (error) {
      console.log(error);
    }
  }
  @Get()
  async getAllDonation() {
    try {
      await this.donationService.getAllDonation();
    } catch (error) {
      console.log(error);
    }
  }
  @Get('/:donationId')
  async donationDetail(@Param('donationId') donationId) {
    try {
      await this.donationService.getDonationDetail(donationId);
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:donationId')
  async updateDonation(@Param('donationId') donationId, @Body() edit) {
    try {
      await this.donationService.updateDonation(donationId, edit);
    } catch (error) {
      console.log(error);
    }
  }
  @Delete('/:donationId')
  async deleteDonation(@Param('donationId') donationId) {
    try {
      await this.donationService.deleteDonation(donationId);
    } catch (error) {
      console.log(error);
    }
  }
}
