import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateAboutPageDto {
  @IsString()
  @IsNotEmpty()
  readonly bigText: string;
  @IsString()
  @IsNotEmpty()
  readonly biodesc: string;
  @IsString()
  @IsNotEmpty()
  readonly servedTitle: string;
  @IsNumber()
  @IsNotEmpty()
  readonly servedNo: number;
  @IsString()
  @IsNotEmpty()
  readonly servedSubTitle: string;
  @IsString()
  @IsNotEmpty()
  readonly donateTitle: string;
  @IsString()
  @IsNotEmpty()
  readonly donateSub: string;
  @IsString()
  @IsNotEmpty()
  readonly donateBtn: string;
  @IsString()
  @IsNotEmpty()
  readonly volunteerTitle: string;
  @IsString()
  @IsNotEmpty()
  readonly volunteerSub: string;
  @IsString()
  @IsNotEmpty()
  readonly volunteerBtn: string;
  @IsString()
  @IsNotEmpty()
  readonly latestDonationTitle: string;
  @IsString()
  @IsNotEmpty()
  readonly latestDonationQuote: string;
  @IsString()
  @IsNotEmpty()
  readonly bannerPic: string;
  @IsString()
  @IsNotEmpty()
  readonly bioPic: string;
  @IsString()
  @IsNotEmpty()
  readonly donorName: string;
  @IsString()
  @IsNotEmpty()
  readonly justNow: string;
  @IsString()
  @IsNotEmpty()
  readonly donateFor: string;
  @IsString()
  @IsNotEmpty()
  readonly donatePurpose: string;
}

export class CreateAboutPageWithoutPicturesDto {
  @IsString()
  @IsNotEmpty()
  readonly bigText: string;
  @IsString()
  @IsNotEmpty()
  readonly biodesc: string;
  @IsString()
  @IsNotEmpty()
  readonly servedTitle: string;
  @IsNumber()
  @IsNotEmpty()
  readonly servedNo: number;
  @IsString()
  @IsNotEmpty()
  readonly servedSubTitle: string;
  @IsString()
  @IsNotEmpty()
  readonly donateTitle: string;
  @IsString()
  @IsNotEmpty()
  readonly donateSub: string;
  @IsString()
  @IsNotEmpty()
  readonly donateBtn: string;
  @IsString()
  @IsNotEmpty()
  readonly volunteerTitle: string;
  @IsString()
  @IsNotEmpty()
  readonly volunteerSub: string;
  @IsString()
  @IsNotEmpty()
  readonly volunteerBtn: string;
  @IsString()
  @IsNotEmpty()
  readonly latestDonationTitle: string;
  @IsString()
  @IsNotEmpty()
  readonly latestDonationQuote: string;
  @IsString()
  @IsNotEmpty()
  readonly donorName: string;
  @IsString()
  @IsNotEmpty()
  readonly justNow: string;
  @IsString()
  @IsNotEmpty()
  readonly donateFor: string;
  @IsString()
  @IsNotEmpty()
  readonly donatePurpose: string;
}

export class EditAboutPageDto {
  @IsOptional()
  @IsString()
  readonly bigText?: string;
  @IsOptional()
  @IsString()
  readonly biodesc?: string;
  @IsOptional()
  @IsString()
  readonly servedTitle?: string;
  @IsOptional()
  @IsNumber()
  readonly servedNo?: number;
  @IsOptional()
  @IsString()
  readonly servedSubTitle?: string;
  @IsOptional()
  @IsString()
  readonly donateTitle?: string;
  @IsOptional()
  @IsString()
  readonly donateSub?: string;
  @IsOptional()
  @IsString()
  readonly donateBtn?: string;
  @IsOptional()
  @IsString()
  readonly volunteerTitle?: string;
  @IsOptional()
  @IsString()
  readonly volunteerSub?: string;
  @IsOptional()
  @IsString()
  readonly volunteerBtn?: string;
  @IsOptional()
  @IsString()
  readonly latestDonationTitle?: string;
  @IsOptional()
  @IsString()
  readonly latestDonationQuote?: string;
  @IsOptional()
  @IsString()
  readonly bannerPic?: string;
  @IsOptional()
  @IsString()
  readonly bioPic?: string;
  @IsString()
  readonly donorName?: string;
  @IsOptional()
  @IsString()
  readonly justNow?: string;
  @IsOptional()
  @IsString()
  readonly donateFor?: string;
  @IsOptional()
  @IsString()
  readonly donatePurpose?: string;
}
