import * as mongoose from 'mongoose';

export const BlogPageSchema = new mongoose.Schema({
  _id:  {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  bigText: { type: String, required: true },
});
