import { Module } from '@nestjs/common';
import { AboutPageController } from './about-page.controller';
import { AboutPageService } from './about-page.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypegooseModule } from "nestjs-typegoose";
import { AboutPage } from './schemas/about-page.schema';

@Module({
  imports: [
    TypegooseModule.forFeature([AboutPage]),
    AuthModule,
  ],
  controllers: [AboutPageController],
  providers: [AboutPageService],
})
export class AboutPageModule {}
