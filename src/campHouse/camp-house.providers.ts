import { Connection } from 'mongoose';
import { CampHouseSchema } from './schemas/camp-house.schema';

export const campHouseProviders = [
  {
    provide: 'CAMP_HOUSE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('CampHouse', CampHouseSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
