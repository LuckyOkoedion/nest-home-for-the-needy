import { Module } from '@nestjs/common';
import { BlogPageController } from './blog-page.controller';
import { BlogPageService } from './blog-page.service';
import { blogPageProviders } from './blog-page.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [BlogPageController],
  providers: [BlogPageService, ...blogPageProviders]
})
export class BlogPageModule {}

