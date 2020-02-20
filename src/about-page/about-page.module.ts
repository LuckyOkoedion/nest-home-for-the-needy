import { Module } from '@nestjs/common';
import { AboutPageController } from './about-page.controller';
import { AboutPageService } from './about-page.service';
import { aboutPageProviders } from './about-page.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AboutPageController],
  providers: [AboutPageService, ...aboutPageProviders],
})
export class AboutPageModule {}
