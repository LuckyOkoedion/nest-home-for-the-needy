import * as mongoose from 'mongoose';

export const DonationSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    ipLocation: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    exchangeRate: { type: Number, required: true },
    nairaAmount: { type: Number, required: true },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project"
    }
  });