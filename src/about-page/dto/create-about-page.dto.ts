import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

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
  @IsString()
  readonly bigText?: string;
  @IsString()
  readonly biodesc?: string;
  @IsString()
  readonly servedTitle?: string;
  @IsNumber()
  readonly servedNo?: number;
  @IsString()
  readonly servedSubTitle?: string;
  @IsString()
  readonly donateTitle?: string;
  @IsString()
  readonly donateSub?: string;
  @IsString()
  readonly donateBtn?: string;
  @IsString()
  readonly volunteerTitle?: string;
  @IsString()
  readonly volunteerSub?: string;
  @IsString()
  readonly volunteerBtn?: string;
  @IsString()
  readonly latestDonationTitle?: string;
  @IsString()
  readonly latestDonationQuote?: string;
  @IsString()
  readonly bannerPic?: string;
  @IsString()
  readonly bioPic?: string;
  @IsString()
  readonly donorName?: string;
  @IsString()
  readonly justNow?: string;
  @IsString()
  readonly donateFor?: string;
  @IsString()
  readonly donatePurpose?: string;
}
