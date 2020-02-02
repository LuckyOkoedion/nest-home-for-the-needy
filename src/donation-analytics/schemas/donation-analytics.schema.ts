import * as mongoose from 'mongoose';

export const DonationAnalyticsSchema = new mongoose.Schema({
  latestDonation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation',
  },
  dailySummary: {
    mostIpLocationCountry: { type: String },
    mostIpLocationState: { type: String },
    numberOfDonations: { type: Number },
    frequentAmount: { type: Number },
    frequentCurrency: { type: String },
    totalDonations: { type: Number },
  },
  monthlySummary: {
    mostIpLocationCountry: { type: String },
    mostIpLocationState: { type: String },
    numberOfDonations: { type: Number },
    frequentAmount: { type: Number },
    frequentCurrency: { type: String },
    totalDonations: { type: Number },
  },
  annualSummary: {
    mostIpLocationCountry: { type: String },
    mostIpLocationState: { type: String },
    numberOfDonations: { type: Number },
    frequentAmount: { type: Number },
    frequentCurrency: { type: String },
    totalDonations: { type: Number },
  },
});
