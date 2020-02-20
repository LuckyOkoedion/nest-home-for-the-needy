import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AboutPageModule } from './about-page/about-page.module';
import { BlogModule } from './blog/blog.module';
import { BlogPageModule } from './blog-page/blog-page.module';
import { DatabaseModule } from './database/database.module';
import { DonationModule } from './donation/donation.module';
import { DonationAnalyticsModule } from './donation-analytics/donation-analytics.module';
import { EventModule } from './event/event.module';
import { GalleryModule } from './gallery/gallery.module';
import { HomePageModule } from './home-page/home-page.module';
import { NavFooterModule } from './nav-footer/nav-footer.module';
import { ProjectModule } from './project/project.module';
import { ResidentModule } from './resident/resident.module';
import { UserModule } from './user/user.module';
import { VisitModule } from './visit/visit.module';
import { VisitAnalyticsModule } from './visit-analytics/visit-analytics.module';
import { CampHouseModule } from './campHouse/camp-house.module';
import { AuthModule } from './middleware/auth/auth.module';

@Module({
  imports: [
    AboutPageModule,
    AuthModule,
    BlogModule,
    BlogPageModule,
    DatabaseModule,
    DonationModule,
    DonationAnalyticsModule,
    EventModule,
    GalleryModule,
    HomePageModule,
    NavFooterModule,
    ProjectModule,
    ResidentModule,
    UserModule,
    VisitModule,
    VisitAnalyticsModule,
    CampHouseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
