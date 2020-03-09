import { Module } from '@nestjs/common';
import { BlogPageController } from './blog-page.controller';
import { BlogPageService } from './blog-page.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { BlogPage } from './schemas/blog-page.schema';

@Module({
  imports: [
   TypegooseModule.forFeature([BlogPage]),
    AuthModule,
  ],
  controllers: [BlogPageController],
  providers: [BlogPageService],
})
export class BlogPageModule {}
