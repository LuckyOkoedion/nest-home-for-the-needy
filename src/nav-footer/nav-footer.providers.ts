import { Connection } from 'mongoose';
import { NavFooterSchema } from './schemas/nav-footer.schema';

export const navFooterProviders = [
  {
    provide: 'NAV_FOOTER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('NavFooter', NavFooterSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
