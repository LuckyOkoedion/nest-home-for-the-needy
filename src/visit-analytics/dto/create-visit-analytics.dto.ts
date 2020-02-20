import {
  IsNotEmpty,
  IsObject,
  IsString,
  IsDate,
  IsNumber,
} from 'class-validator';

export class CreateDailyVisitSummaryDto {
  @IsString()
  @IsNotEmpty()
  readonly mostIpLocationCountry: string;
  @IsString()
  @IsNotEmpty()
  readonly mostIpLocationState: string;
  @IsDate()
  @IsNotEmpty()
  readonly frequentTime: Date;
  @IsString()
  @IsNotEmpty()
  readonly frequentIpDevice: string;
  @IsNumber()
  @IsNotEmpty()
  readonly totalVisits: number;
}

export class CreateMonthlyVisitSummaryDto {
  @IsString()
  @IsNotEmpty()
  readonly mostIpLocationCountry: string;
  @IsString()
  @IsNotEmpty()
  readonly mostIpLocationState: string;
  @IsDate()
  @IsNotEmpty()
  readonly frequentTime: Date;
  @IsString()
  @IsNotEmpty()
  readonly frequentIpDevice: string;
  @IsNumber()
  @IsNotEmpty()
  readonly totalVisits: number;
}

export class CreateAnnualVisitSummaryDto {
  @IsString()
  @IsNotEmpty()
  readonly mostIpLocationCountry: string;
  @IsString()
  @IsNotEmpty()
  readonly mostIpLocationState: string;
  @IsDate()
  @IsNotEmpty()
  readonly frequentTime: Date;
  @IsString()
  @IsNotEmpty()
  readonly frequentIpDevice: string;
  @IsNumber()
  @IsNotEmpty()
  readonly totalVisits: number;
}

export class CreateVisitAnalyticsDto {
  @IsString()
  readonly latestVisitId?: string;
  @IsObject()
  @IsNotEmpty()
  readonly dailySummary: CreateDailyVisitSummaryDto;
  @IsObject()
  @IsNotEmpty()
  readonly monthlySummary: CreateMonthlyVisitSummaryDto;
  @IsObject()
  @IsNotEmpty()
  readonly annualSummary: CreateAnnualVisitSummaryDto;
}
