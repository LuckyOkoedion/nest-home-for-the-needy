import { Module } from '@nestjs/common';
import { ResidentController } from './resident.controller';
import { ResidentService } from './resident.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ResidentSchema } from './schemas/resident.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Resident', schema: ResidentSchema }]),
    AuthModule,
  ],
  controllers: [ResidentController],
  providers: [ResidentService],
})
export class ResidentModule {}
