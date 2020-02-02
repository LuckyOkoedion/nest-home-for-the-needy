import { Document } from "mongoose";

export interface IAboutPage extends Document {
  readonly bigText: string;
  readonly biodesc: string;
  readonly servedTitle: string;
  readonly servedNo: number;
  readonly servedSubTitle: string;
  readonly donateTitle: string;
  readonly donateSub: string;
  readonly donateBtn: string;
  readonly volunteerTitle: string;
  readonly volunteerSub: string;
  readonly volunteerBtn: string;
  readonly latestDonationTitle: string;
  readonly latestDonationQuote: string;
  readonly bannerPic: string;
  readonly bioPic: string;
  readonly donorName: string;
  readonly justNow: string;
  readonly donateFor: string;
  readonly donatePurpose: string;
}
