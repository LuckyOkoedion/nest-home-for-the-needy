import * as mongoose from 'mongoose';

export const VisitSchema = new mongoose.Schema({
    visits: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        date: { type: Date, required: true },
        time: { type: Date, required: true },
        ipAddress: { type: String, required: true },
        ipState: { type: String, required: true },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        ipDevice: { type: String, required: true }
      }
    ]
  });