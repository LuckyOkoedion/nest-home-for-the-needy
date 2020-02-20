import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  authorUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
  category: { type: String, required: true },
  pic: { type: String, required: true },
  body: { type: String, required: true },
  timestamp: { type: Date, required: true },
  comments: [
    {
      _id: {
        type: String,
        default: new mongoose.Types.ObjectId(),
      },
      commenterUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      comment: { type: String, required: true },
      time: { type: Date, required: true },
      hide: { type: Boolean, default: false },
      edited: { type: Boolean, default: false },
    },
  ],
  approved: { type: Boolean, default: false },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
