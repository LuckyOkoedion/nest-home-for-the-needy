import { Document } from 'mongoose';

export interface IBlogPage extends Document {
  readonly bigText: string;
}
