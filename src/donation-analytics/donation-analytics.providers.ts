import { DonationAnalyticsSchema } from './schemas/donation-analytics.schema';
import { Connection } from 'mongoose';

export const donationAnalyticsProviders = [
  {
    provide: 'DONATION_ANALYTICS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('DonationAnalytics', DonationAnalyticsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
