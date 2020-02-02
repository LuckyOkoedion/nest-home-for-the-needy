import { Connection } from 'mongoose';
import { ResidentSchema } from './schemas/resident.schema';

export const residentProviders = [
  {
    provide: 'RESIDENT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Resident', ResidentSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
