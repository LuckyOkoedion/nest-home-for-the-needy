import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schemas/blog.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }]), AuthModule],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
