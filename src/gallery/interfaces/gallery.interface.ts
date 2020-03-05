import { Document } from 'mongoose';

export interface IGallery extends Document {
  readonly picture: string;
  readonly pictureName: string;
  readonly dateCaptured: Date;
  readonly peopleInPictureUserId?: string[];
  readonly occassionCaptured: string;
  readonly approved: Boolean;
}
