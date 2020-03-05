import { Module } from '@nestjs/common';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitSchema } from './schemas/visit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Visit', schema: VisitSchema }]),
    AuthModule,
  ],
  providers: [VisitService],
  controllers: [VisitController],
})
export class VisitModule {}
