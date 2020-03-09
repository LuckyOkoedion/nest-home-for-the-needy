import { Module } from '@nestjs/common';
import { CampHouseController } from './camp-house.controller';
import { CampHouseService } from './camp-house.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { CampHouse } from './schemas/camp-house.schema';

@Module({
  imports: [TypegooseModule.forFeature([CampHouse]), AuthModule],
  controllers: [CampHouseController],
  providers: [CampHouseService],
})
export class CampHouseModule {}
