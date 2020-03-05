import { Module } from '@nestjs/common';
import { NavFooterController } from './nav-footer.controller';
import { NavFooterService } from './nav-footer.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NavFooterSchema } from './schemas/nav-footer.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'NavFooter', schema: NavFooterSchema }]), AuthModule],
  controllers: [NavFooterController],
  providers: [NavFooterService],
})
export class NavFooterModule {}
