import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { CheckAuthLevelTwoMiddleware } from 'src/middleware/auth/check-auth-level-two.middleware';
import { CheckAuthLevelFiveMiddleware } from 'src/middleware/auth/check-auth-level-five.middleware';
import { DatabaseModule } from 'src/database/database.module';
import { projectProviders } from './project.providers';
import { AuthModule } from 'src/middleware/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [ProjectService, ...projectProviders],
  controllers: [ProjectController]
})
export class ProjectModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply( CheckAuthLevelTwoMiddleware)
      .forRoutes({ path: '/api/admin/project', method: RequestMethod.POST });
    consumer
      .apply( CheckAuthLevelFiveMiddleware)
      .forRoutes({ path: '/api/admin/project', method: RequestMethod.GET });
    consumer
      .apply( CheckAuthLevelFiveMiddleware)
      .forRoutes({
        path: '/api/admin/project/:projectId',
        method: RequestMethod.GET,
      });
    consumer.apply( CheckAuthLevelTwoMiddleware).forRoutes({
      path: '/api/admin/project/:projectId',
      method: RequestMethod.PUT,
    });
    consumer.apply( CheckAuthLevelTwoMiddleware).forRoutes({
      path: '/api/admin/project/:projectId',
      method: RequestMethod.DELETE,
    });
  }
}