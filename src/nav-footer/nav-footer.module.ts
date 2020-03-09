import { Module } from '@nestjs/common';
import { NavFooterController } from './nav-footer.controller';
import { NavFooterService } from './nav-footer.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { NavFooter } from './schemas/nav-footer.schema';

@Module({
  imports: [TypegooseModule.forFeature([NavFooter]), AuthModule],
  controllers: [NavFooterController],
  providers: [NavFooterService],
})
export class NavFooterModule {}
