import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { CheckAuthMiddleware } from 'src/middleware/auth/check-auth.middleware';
import { CheckAuthLevelTwoMiddleware } from 'src/middleware/auth/check-auth-level-two.middleware';
import { CheckAuthLevelFiveMiddleware } from 'src/middleware/auth/check-auth-level-five.middleware';
import { DatabaseModule } from 'src/database/database.module';
import { projectProviders } from './project.providers';

@Module({
  imports: [DatabaseModule],
  providers: [ProjectService, ...projectProviders],
  controllers: [ProjectController]
})
export class ProjectModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthMiddleware, CheckAuthLevelTwoMiddleware)
      .forRoutes({ path: '/api/admin/project', method: RequestMethod.POST });
    consumer
      .apply(CheckAuthMiddleware, CheckAuthLevelFiveMiddleware)
      .forRoutes({ path: '/api/admin/project', method: RequestMethod.GET });
    consumer
      .apply(CheckAuthMiddleware, CheckAuthLevelFiveMiddleware)
      .forRoutes({
        path: '/api/admin/project/:projectId',
        method: RequestMethod.GET,
      });
    consumer.apply(CheckAuthMiddleware, CheckAuthLevelTwoMiddleware).forRoutes({
      path: '/api/admin/project/:projectId',
      method: RequestMethod.PUT,
    });
    consumer.apply(CheckAuthMiddleware, CheckAuthLevelTwoMiddleware).forRoutes({
      path: '/api/admin/project/:projectId',
      method: RequestMethod.DELETE,
    });
  }
}