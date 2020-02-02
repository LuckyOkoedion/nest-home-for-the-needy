import { Document } from 'mongoose';

export interface ICampHouse extends Document {
  readonly residentsIds?: [string];
  readonly leaderResidentId?: string;
}
