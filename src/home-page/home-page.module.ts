import { Module } from '@nestjs/common';
import { HomePageService } from './home-page.service';
import { HomePageController } from './home-page.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HomePageSchema } from './schemas/home-page.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'HomePage', schema: HomePageSchema }]),
    AuthModule,
  ],
  providers: [HomePageService],
  controllers: [HomePageController],
})
export class HomePageModule {}
