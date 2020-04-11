import { prop, mongoose, arrayProp } from '@typegoose/typegoose';
import {
  IsString,
  IsDate,
  IsObject,
  IsBoolean,
  IsArray,
} from 'class-validator';

export class TheEventManager {
  @IsString()
  @prop({ required: true })
  name: string;
  @IsString()
  @prop({ required: true })
  phoneNo: string;
  @IsString()
  @prop({ required: true })
  email: string;
}

export class TheInvitees {
  @IsString()
  @prop({ required: true })
  name: string;
  @IsString()
  @prop({ required: true })
  phoneNO: string;
  @IsBoolean()
  @prop({ required: true, default: false })
  rsvp: boolean;
  @IsBoolean()
  @prop({ required: true, default: false })
  declined: boolean;
}

export class Event {
  @IsString()
  @prop({ required: true })
  eventName: string;
  @IsString()
  @prop({ required: true })
  eventDescription: string;
  @IsDate()
  @prop({ required: true })
  startDate: Date;
  @IsDate()
  @prop({ required: true })
  endDate: Date;
  @IsString()
  @prop({ required: true })
  host: string;
  @IsString()
  @prop({ required: true })
  venue: string;
  @IsObject()
  @prop()
  eventManager: TheEventManager;
  @IsArray()
  @arrayProp({ items: TheInvitees })
  invitees: TheInvitees[];
}

