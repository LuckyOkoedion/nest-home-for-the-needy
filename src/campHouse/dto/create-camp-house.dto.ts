import { IsString, IsArray } from 'class-validator';

export class CreateCampHouseDto {
  @IsArray()
  readonly residentsIds?: [string];
  @IsString()
  readonly leaderResidentId?: string;
}
