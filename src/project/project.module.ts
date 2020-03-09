import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { Project } from './schemas/project.schema';

@Module({
  imports: [
    TypegooseModule.forFeature([Project]),
    AuthModule,
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
