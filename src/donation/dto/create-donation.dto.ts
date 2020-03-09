import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateDonationDto {
  @IsString()
  @IsNotEmpty()
  readonly donorUserId: string;
  @IsString()
  @IsNotEmpty()
  readonly ipLocation: string;
  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;
  @IsString()
  @IsNotEmpty()
  readonly currency: string;
  @IsNumber()
  @IsNotEmpty()
  readonly exchangeRate: number;
  @IsNumber()
  @IsNotEmpty()
  readonly nairaAmount: number;
  @IsString()
  @IsNotEmpty()
  readonly projectId: string;
}
