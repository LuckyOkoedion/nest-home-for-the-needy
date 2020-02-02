import { VisitAnalyticsSchema } from './schemas/visit-analytics.schema';
import { Connection } from 'mongoose';

export const visitAnalyticsProviders = [
  {
    provide: 'VISIT_ANALYTICS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('VisitAnalytics', VisitAnalyticsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
