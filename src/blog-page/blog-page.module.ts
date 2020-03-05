import { Module } from '@nestjs/common';
import { BlogPageController } from './blog-page.controller';
import { BlogPageService } from './blog-page.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPageSchema } from './schemas/blog-page.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'BlogPage', schema: BlogPageSchema }]),
    AuthModule,
  ],
  controllers: [BlogPageController],
  providers: [BlogPageService],
})
export class BlogPageModule {}
