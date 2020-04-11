import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
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
import { SessionSerializer } from './auth/session.serializer';
import { ConfigModule } from '@nestjs/config';
import { PassportAuthMiddleware } from './auth/auth-middleware';
import { UserController } from './user/user.controller';
import { BlogController } from './blog/blog.controller';
import { ProjectController } from './project/project.controller';
import { ResidentController } from './resident/resident.controller';
import { CampHouseController } from './campHouse/camp-house.controller';
import { AboutPageController } from './about-page/about-page.controller';
import { BlogPageController } from './blog-page/blog-page.controller';
import { DonationController } from './donation/donation.controller';
import { EventController } from './event/event.controller';
import { GalleryController } from './gallery/gallery.controller';
import { HomePageController } from './home-page/home-page.controller';
import { NavFooterController } from './nav-footer/nav-footer.controller';
import { userControllerAuthRoutesExcludes, aboutPageControllerAuthRoutesExcludes, blogControllerAuthRoutesExcludes, blogPageControllerAuthRoutesExcludes, galleryControllerAuthRoutesExcludes, homePageControllerAuthRoutesExcludes, navFooterControllerAuthRoutesExcludes } from './auth-excluded-routes';
import { strategyValueProvider } from './auth/strategy.config';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypegooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    AboutPageModule,
    AuthModule.forRoot('jwt'),
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
  providers: [
    AppService,
    SessionSerializer,
    strategyValueProvider
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PassportAuthMiddleware)
      .exclude(...userControllerAuthRoutesExcludes)
      .forRoutes(
        UserController,
      )
    consumer
      .apply(PassportAuthMiddleware)
      .forRoutes(
        ProjectController
      )

    consumer
      .apply(PassportAuthMiddleware)
      .forRoutes(
        ResidentController
      )
    consumer
      .apply(PassportAuthMiddleware)
      .forRoutes(
        CampHouseController
      )

    consumer
      .apply(PassportAuthMiddleware)
      .exclude(...aboutPageControllerAuthRoutesExcludes)
      .forRoutes(
        AboutPageController
      )
    consumer
      .apply(PassportAuthMiddleware)
      .exclude(...blogControllerAuthRoutesExcludes)
      .forRoutes(
        BlogController
      )
    consumer
      .apply(PassportAuthMiddleware)
      .exclude(...blogPageControllerAuthRoutesExcludes)
      .forRoutes(
        BlogPageController
      )
    consumer
      .apply(PassportAuthMiddleware)
      .forRoutes(
        DonationController
      )
    consumer
      .apply(PassportAuthMiddleware)
      .forRoutes(
        EventController
      )
    consumer
      .apply(PassportAuthMiddleware)
      .exclude(...galleryControllerAuthRoutesExcludes)
      .forRoutes(
        GalleryController
      )
    consumer
      .apply(PassportAuthMiddleware)
      .exclude(...homePageControllerAuthRoutesExcludes)
      .forRoutes(
        HomePageController
      )
    consumer
      .apply(PassportAuthMiddleware)
      .exclude(...navFooterControllerAuthRoutesExcludes)
      .forRoutes(
        NavFooterController
      )


  }
}
