import { Module } from '@nestjs/common';
import { ResidentController } from './resident.controller';
import { ResidentService } from './resident.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { Resident } from './schemas/resident.schema';

@Module({
  imports: [TypegooseModule.forFeature([Resident]), AuthModule],
  controllers: [ResidentController],
  providers: [ResidentService],
})
export class ResidentModule {}
