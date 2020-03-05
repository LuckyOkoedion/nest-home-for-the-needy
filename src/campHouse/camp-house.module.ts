import { Module } from '@nestjs/common';
import { CampHouseController } from './camp-house.controller';
import { CampHouseService } from './camp-house.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CampHouseSchema } from './schemas/camp-house.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'CampHouse', schema: CampHouseSchema }]), AuthModule],
  controllers: [CampHouseController],
  providers: [CampHouseService],
})
export class CampHouseModule {}
