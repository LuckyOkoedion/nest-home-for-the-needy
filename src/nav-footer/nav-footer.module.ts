import {
  Module
} from '@nestjs/common';
import { NavFooterController } from './nav-footer.controller';
import { NavFooterService } from './nav-footer.service';
import { navFooterProviders } from './nav-footer.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [NavFooterController],
  providers: [NavFooterService, ...navFooterProviders],
})
export class NavFooterModule {}
