import {
  Module,
} from '@nestjs/common';
import { HomePageService } from './home-page.service';
import { HomePageController } from './home-page.controller';
import { homePageProviders } from './home-page.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [HomePageService, ...homePageProviders],
  controllers: [HomePageController],
})
export class HomePageModule {}
