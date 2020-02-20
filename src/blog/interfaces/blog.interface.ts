import { Document } from 'mongoose';

export interface IBlog extends Document {
  readonly authorUserId: string;
  readonly title: string;
  readonly category: string;
  readonly pic: string;
  readonly body: string;
  readonly timestamp: Date;
  readonly comments?: IBlogComment[];
  readonly approved?: Boolean;
  readonly approvedByUserId?: string;
}

export interface IBlogComment extends Document {
  readonly commenterUserId: string;
  readonly comment: string;
  readonly time: Date;
  readonly hide: Boolean;
  readonly edited: Boolean
}
