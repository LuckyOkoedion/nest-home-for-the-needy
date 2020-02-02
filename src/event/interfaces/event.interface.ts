import { Document } from 'mongoose';

export interface IEvent extends Document {
  readonly eventName: string;
  readonly eventDescription: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly host: string;
  readonly venue: string;
  readonly eventManager?: {
    readonly name: string;
    readonly phoneNo: string;
    readonly email: string;
  };
  readonly invitees?: [
    {
      readonly name: string;
      readonly phoneNo: string;
      readonly email: string;
      readonly rsvp: Boolean;
      readonly declined: Boolean;
    },
  ];
}
