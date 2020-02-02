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
