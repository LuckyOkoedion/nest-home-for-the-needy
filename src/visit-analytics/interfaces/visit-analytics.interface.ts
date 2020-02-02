import { Document } from 'mongoose';
import { IVisit } from '../../visit/interfaces/visit.interface';

export interface IVisitAnalytics extends Document {
  readonly latestVisit: IVisit;
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