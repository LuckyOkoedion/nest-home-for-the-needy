import { Module } from '@nestjs/common';
import { HomePageService } from './home-page.service';
import { HomePageController } from './home-page.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { HomePage } from './schemas/home-page.schema';

@Module({
  imports: [
    TypegooseModule.forFeature([HomePage]),
    AuthModule,
  ],
  providers: [HomePageService],
  controllers: [HomePageController],
})
export class HomePageModule {}
