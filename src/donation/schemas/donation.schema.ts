import { prop, mongoose, Ref } from '@typegoose/typegoose';
import { IsString, IsNumber } from 'class-validator';
import { User } from 'src/user/schemas/user.schema';
import { Project } from 'src/project/schemas/project.schema';

export class Donation {
  @IsString()
  @prop({
    ref: 'User',
    required: true,
  })
  donor: Ref<User>;
  @IsString()
  @prop()
  ipLocation: string;
  @IsNumber()
  @prop({ required: true })
  amount: number;
  @IsString()
  @prop({ required: true })
  currency: string;
  @IsNumber()
  @prop({ required: true })
  exchangeRate: number;
  @IsNumber()
  @prop({ required: true })
  homeCurrencyAmount: number;
  @IsString()
  @prop({
    ref: 'Project',
    required: true,
  })
  project: Ref<Project>;
}
