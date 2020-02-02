import { Document } from 'mongoose';

export interface IDonationAnalytics extends Document {
  latestDonationId: string;
  readonly dailySummary: {
    readonly mostIpLocationCountry: string;
    readonly mostIpLocationState: string;
    readonly numberOfDonations: number;
    readonly frequentAmount: number;
    readonly frequentCurrency: string;
    readonly totalDonations: number;
  };

  readonly monthlySummary: {
    readonly mostIpLocationCountry: string;
    readonly mostIpLocationState: string;
    readonly numberOfDonations: number;
    readonly frequentAmount: number;
    readonly frequentCurrency: string;
    readonly totalDonations: number;
  };

  readonly annualSummary: {
    readonly mostIpLocationCountry: string;
    readonly mostIpLocationState: string;
    readonly numberOfDonations: number;
    readonly frequentAmount: number;
    readonly frequentCurrency: string;
    readonly totalDonations: number;
  };
}
