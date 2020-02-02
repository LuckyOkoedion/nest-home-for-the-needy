import { Document } from 'mongoose';

export interface IGallery extends Document {
  readonly picture: string;
  readonly pictureName: string;
  readonly dateCaptured: string;
  readonly peopleInPictureUserId?: string[];
  readonly occassionCaptured: string;
  readonly approved: Boolean;
}
