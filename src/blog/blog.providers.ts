import { BlogSchema } from './schemas/blog.schema';
import { Connection } from 'mongoose';

export const blogProviders = [
  {
    provide: 'BLOG_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Blog', BlogSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
