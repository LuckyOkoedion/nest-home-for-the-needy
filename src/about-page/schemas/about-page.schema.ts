import { prop, mongoose } from '@typegoose/typegoose';
import { IsString, IsNumber } from 'class-validator';

export class AboutPage {
  @IsString()
  @prop({ default: new mongoose.Types.ObjectId() })
  _id: mongoose.Schema.Types.ObjectId;
  @IsString()
  @prop()
  bigText: string;
  @IsString()
  @prop()
  bioTitle: string;
  @IsString()
  @prop()
  biodesc: string;
  @IsString()
  @prop()
  servedTitle: string;
  @IsNumber()
  @prop()
  servedNo: number;
  @IsString()
  @prop()
  servedSubTitle: string;
  @IsString()
  @prop()
  donateTitle: string;
  @IsString()
  @prop()
  donateSub: string;
  @IsString()
  @prop()
  donateBtn: string;
  @IsString()
  @prop()
  volunteerTitle: string;
  @IsString()
  @prop()
  volunteerSub: string;
  @IsString()
  @prop()
  volunteerBtn: string;
  @IsString()
  @prop()
  latestDonationTitle: string;
  @IsString()
  @prop()
  latestDonationQuote: string;
  @IsString()
  @prop()
  bioPic: string;
}
