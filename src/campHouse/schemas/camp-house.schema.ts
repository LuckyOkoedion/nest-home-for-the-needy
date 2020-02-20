import * as mongoose from 'mongoose';

export const CampHouseSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
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
