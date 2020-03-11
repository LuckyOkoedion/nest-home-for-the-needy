import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreateCampHouseDto {
  @IsOptional()
  @IsArray()
  readonly residentsIds?: string[];
  @IsOptional()
  @IsString()
  readonly leaderResidentId?: string;
}
