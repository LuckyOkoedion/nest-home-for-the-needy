import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { Donation } from './schemas/donation.schema';

@Module({
  imports: [
    TypegooseModule.forFeature([Donation]),
    AuthModule,
  ],
  providers: [DonationService],
  controllers: [DonationController],
})
export class DonationModule {}
