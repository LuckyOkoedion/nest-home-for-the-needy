import * as mongoose from 'mongoose';

export const AboutPageSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  bigText: { type: String },
  biodesc: { type: String },
  servedTitle: { type: String },
  servedNo: { type: Number },
  servedSubTitle: { type: String },
  donateTitle: { type: String },
  donateSub: { type: String },
  donateBtn: { type: String },
  volunteerTitle: { type: String },
  volunteerSub: { type: String },
  volunteerBtn: { type: String },
  latestDonationTitle: { type: String },
  latestDonationQuote: { type: String },
  bannerPic: { type: String },
  bioPic: { type: String },
  donorName: { type: String },
  justNow: { type: String },
  donateFor: { type: String },
  donatePurpose: { type: String },
});
