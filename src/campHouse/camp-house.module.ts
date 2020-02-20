import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CampHouseController } from './camp-house.controller';
import { CampHouseService } from './camp-house.service';
import { campHouseProviders } from './camp-house.providers';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [CampHouseController],
  providers: [CampHouseService, ...campHouseProviders],
})
export class CampHouseModule {}
