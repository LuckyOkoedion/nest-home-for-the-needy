import * as mongoose from 'mongoose';

export const CampHouseSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  residents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resident',
    },
  ],
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resident',
  },
});
