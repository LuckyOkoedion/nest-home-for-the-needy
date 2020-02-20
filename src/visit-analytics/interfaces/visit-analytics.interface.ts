import { Document } from 'mongoose';

export interface IVisitAnalytics extends Document {
  readonly latestVisitId?: string;
  readonly dailySummary: {
    readonly mostIpLocationCountry: string;
    readonly mostIpLocationState: string;
    readonly frequentTime: Date;
    readonly frequentIpDevice: string;
    readonly totalVisits: number;
  };
  readonly monthlySummary: {
    readonly mostIpLocationCountry: string;
    readonly mostIpLocationState: string;
    readonly frequentTime: Date;
    readonly frequentIpDevice: string;
    readonly totalVisits: number;
  };
  readonly annualSummary: {
    readonly mostIpLocationCountry: string;
    readonly mostIpLocationState: string;
    readonly frequentTime: Date;
    readonly frequentIpDevice: string;
    readonly totalVisits: number;
  };
}
