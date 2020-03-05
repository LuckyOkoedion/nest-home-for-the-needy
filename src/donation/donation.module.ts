import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DonationSchema } from './schemas/donation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Donation', schema: DonationSchema }]),
    AuthModule,
  ],
  providers: [DonationService],
  controllers: [DonationController],
})
export class DonationModule {}
