import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AboutPageModule } from './about-page/about-page.module';
import { BlogModule } from './blog/blog.module';
import { BlogPageModule } from './blog-page/blog-page.module';
import { DonationModule } from './donation/donation.module';
import { EventModule } from './event/event.module';
import { GalleryModule } from './gallery/gallery.module';
import { HomePageModule } from './home-page/home-page.module';
import { NavFooterModule } from './nav-footer/nav-footer.module';
import { ProjectModule } from './project/project.module';
import { ResidentModule } from './resident/resident.module';
import { UserModule } from './user/user.module';
import { CampHouseModule } from './campHouse/camp-house.module';
import { AuthModule } from './auth/auth.module';
import { TypegooseModule } from "nestjs-typegoose";
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/home-for-the-needy', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MulterModule.register({
      dest: './files',
    }),
    AboutPageModule,
    AuthModule,
    BlogModule,
    BlogPageModule,
    DonationModule,
    EventModule,
    GalleryModule,
    HomePageModule,
    NavFooterModule,
    ProjectModule,
    ResidentModule,
    UserModule,
    CampHouseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
