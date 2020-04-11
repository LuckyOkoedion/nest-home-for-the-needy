import { IsNotEmpty, IsString, IsNumber, IsOptional, IsNumberString } from 'class-validator';

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
  @IsNumberString()
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
  readonly bioPic: string;
}

export class CreateAboutPageWithoutPictureDto {
  @IsString()
  @IsNotEmpty()
  readonly bigText: string;
  @IsString()
  @IsNotEmpty()
  readonly bioTitle: string;
  @IsString()
  @IsNotEmpty()
  readonly biodesc: string;
  @IsString()
  @IsNotEmpty()
  readonly servedTitle: string;
  @IsNumberString()
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
}

export class EditAboutPageDto {
  @IsOptional()
  @IsString()
  readonly bigText?: string;
  @IsOptional()
  @IsString()
  readonly bioTitle?: string;
  @IsOptional()
  @IsString()
  readonly biodesc?: string;
  @IsOptional()
  @IsString()
  readonly servedTitle?: string;
  @IsOptional()
  @IsNumberString()
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
  readonly bioPic: string;
}
