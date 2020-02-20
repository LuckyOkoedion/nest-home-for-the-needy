import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { CheckAuthLevelTwoMiddleware } from 'src/middleware/auth/check-auth-level-two.middleware';
import { DatabaseModule } from 'src/database/database.module';
import { CampHouseController } from './camp-house.controller';
import { CampHouseService } from './camp-house.service';
import { campHouseProviders } from './camp-house.providers';
import { AuthModule } from 'src/middleware/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [CampHouseController],
  providers: [CampHouseService, ...campHouseProviders],
})
export class CampHouseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply( CheckAuthLevelTwoMiddleware)
      .forRoutes(CampHouseController);
  }
}
