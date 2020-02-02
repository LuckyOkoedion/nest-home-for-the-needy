import { ProjectSchema } from './schemas/project.schema';
import { Connection } from 'mongoose';

export const projectProviders = [
  {
    provide: 'PROJECT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Project', ProjectSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
