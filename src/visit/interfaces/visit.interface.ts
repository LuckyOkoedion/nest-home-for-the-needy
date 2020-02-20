import { Document } from 'mongoose';

export interface IVisit extends Document {
  readonly date: Date;
  readonly time: Date;
  readonly ipAddress: string;
  readonly ipState: string;
  readonly userId: string;
  readonly ipDevice: string;
}
