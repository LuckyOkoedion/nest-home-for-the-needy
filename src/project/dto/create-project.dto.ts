import { CreateUserDto } from '../../user/dto/create-user.dto';
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsNumber,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  readonly projectName: string;
  @IsString()
  @IsNotEmpty()
  readonly projectManagerUserId: string;
  @IsString()
  @IsNotEmpty()
  readonly projectScope: string;
  @IsDate()
  @IsNotEmpty()
  readonly projectBudgetedStartDate: Date;
  @IsDate()
  @IsNotEmpty()
  readonly projectBudgetedEndDate: Date;
  @IsDate()
  @IsNotEmpty()
  readonly projectActualStartDate: Date;
  @IsDate()
  @IsNotEmpty()
  readonly projectActualEndDate: Date;
  @IsNumber()
  @IsNotEmpty()
  readonly projectBudgetedDays: number;
  @IsNumber()
  @IsNotEmpty()
  readonly projectBudgetedCost: number;
  @IsNumber()
  @IsNotEmpty()
  readonly projectActualCost: number;
}
