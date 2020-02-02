import { IsNotEmpty, IsObject, IsString, IsNumber } from 'class-validator';

export class CreateDailyDonationSummaryDto {
  @IsString()
  @IsNotEmpty()
  readonly mostIpLocationCountry: string;
  @IsString()
  @IsNotEmpty()
  readonly mostIpLocationState: string;
  @IsNumber()
  @IsNotEmpty()
  readonly numberOfDonations: number;
  @IsNumber()
  @IsNotEmpty()
  readonly frequentAmount: number;
  @IsString()
  @IsNotEmpty()
  readonly frequentCurrency: string;
  @IsNumber()
  @IsNotEmpty()
  readonly totalDonations: number;
}

export class CreateMonthlyDonationSummaryDto {
  @IsString()
  @IsNotEmpty()
  readonly mostIpLocationCountry: string;
  @IsString()
  @IsNotEmpty()
  readonly mostIpLocationState: string;
  @IsNumber()
  @IsNotEmpty()
  readonly numberOfDonations: number;
  @IsNumber()
  @IsNotEmpty()
  readonly frequentAmount: number;
  @IsString()
  @IsNotEmpty()
  readonly frequentCurrency: string;
  @IsNumber()
  @IsNotEmpty()
  readonly totalDonations: number;
}

export class CreateAnnualDonationSummaryDto {
  @IsString()
  @IsNotEmpty()
  readonly mostIpLocationCountry: string;
  @IsString()
  @IsNotEmpty()
  readonly mostIpLocationState: string;
  @IsNumber()
  @IsNotEmpty()
  readonly numberOfDonations: number;
  @IsNumber()
  @IsNotEmpty()
  readonly frequentAmount: number;
  @IsString()
  @IsNotEmpty()
  readonly frequentCurrency: string;
  @IsNumber()
  @IsNotEmpty()
  readonly totalDonations: number;
}

export class CreateDonationAnalyticsDto {
  @IsString()
  readonly latestDonationId?: string;
  @IsObject()
  readonly dailySummary?: CreateDailyDonationSummaryDto;
  @IsObject()
  readonly monthlySummary?: CreateMonthlyDonationSummaryDto;
  @IsObject()
  readonly annualSummary?: CreateAnnualDonationSummaryDto;
}
