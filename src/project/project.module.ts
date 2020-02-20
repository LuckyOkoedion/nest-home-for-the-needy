import { Module} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { DatabaseModule } from 'src/database/database.module';
import { projectProviders } from './project.providers';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [ProjectService, ...projectProviders],
  controllers: [ProjectController]
})
export class ProjectModule {}