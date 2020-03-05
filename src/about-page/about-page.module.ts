import { Module } from '@nestjs/common';
import { AboutPageController } from './about-page.controller';
import { AboutPageService } from './about-page.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AboutPageSchema } from './schemas/about-page.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'AboutPage', schema: AboutPageSchema }]),
    AuthModule,
  ],
  controllers: [AboutPageController],
  providers: [AboutPageService],
})
export class AboutPageModule {}
