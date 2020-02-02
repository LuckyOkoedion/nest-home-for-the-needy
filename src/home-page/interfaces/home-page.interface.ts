import { Document } from 'mongoose';

export interface IHomePage extends Document {
  readonly bigText: string;
  readonly bannerPic: string;
  readonly ourCauses: string;
}