import { prop, mongoose, Ref } from '@typegoose/typegoose';
import { User } from 'src/user/schemas/user.schema';
import { IsString, IsDate, IsNumber } from 'class-validator';

export class Project {
  @prop({ default: new mongoose.Types.ObjectId() })
  _id: mongoose.Schema.Types.ObjectId;
  @IsString()
  @prop({
    required: true,
  })
  projectName!: string;
  @prop({
    ref: 'User',
    required: true,
  })
  projectManagerId!: Ref<User>;
  @IsString()
  @prop({
    required: true,
  })
  projectScope!: string;
  @IsDate()
  @prop({
    required: true,
  })
  projectBudgetedStartDate!: Date;
  @IsDate()
  @prop({
    required: true,
  })
  projectBudgetedEndDate!: Date;
  @IsDate()
  @prop()
  projectActualStartDate: Date;
  @IsDate()
  @prop()
  projectActualEndDate: Date;
  @IsNumber()
  @prop({
    required: true,
  })
  projectBudgetedDays!: Number;
  @IsNumber()
  @prop({
    required: true,
  })
  projectBudgetedCost!: Number;
  @IsNumber()
  @prop({
    required: true,
  })
  projectActualCost: Number;
}
