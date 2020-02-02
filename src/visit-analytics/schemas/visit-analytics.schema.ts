import * as mongoose from 'mongoose';

export const VisitAnalyticsSchema = new mongoose.Schema({
    latestVisit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visit",
      required: true
    },
    dailySummary: {
        mostIpLocationCountry: {type: String, required: true},
        mostIpLocationState: {type: String, required: true},
        frequentTime: {type: Date, required: true},
        frequentIpDevice: {type: String, required: true},
        totalVisits: {type: Number, required: true}
    },
    monthlySummary: {
      mostIpLocationCountry: {type: String, required: true},
      mostIpLocationState: {type: String, required: true},
      frequentTime: {type: Date, required: true},
      frequentIpDevice: {type: String, required: true},
      totalVisits: {type: Number, required: true}
    },
    annualSummary: {
      mostIpLocationCountry: {type: String, required: true},
      mostIpLocationState: {type: String, required: true},
      frequentTime: {type: Date, required: true},
      frequentIpDevice: {type: String, required: true},
      totalVisits: {type: Number, required: true}
    }
  });