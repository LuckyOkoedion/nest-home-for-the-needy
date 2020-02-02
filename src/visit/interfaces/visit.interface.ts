import { Document } from "mongoose";
import { IUser } from "../../user/interfaces/user.interface";

export interface IVisit extends Document {
  visits: [
    {
      readonly id: string;
      readonly date: Date;
      readonly time: Date;
      readonly ipAddress: string;
      readonly ipState: string;
      readonly userId: string;
      readonly ipDevice: string;
    }
  ];
}
