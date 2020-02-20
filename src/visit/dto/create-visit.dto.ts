import { IsNotEmpty, IsObject, IsDate, IsString } from 'class-validator';

export class CreateVisitDto {
  @IsDate()
  @IsNotEmpty()
  readonly date: Date;
  @IsDate()
  @IsNotEmpty()
  readonly time: Date;
  @IsString()
  @IsNotEmpty()
  readonly ipAddress: string;
  @IsString()
  readonly ipState?: string;
  @IsString()
  readonly userId?: string;
  @IsString()
  readonly ipDevice?: string;
}
