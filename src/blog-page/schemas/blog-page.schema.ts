import * as mongoose from 'mongoose';

export const BlogPageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  bigText: { type: String, required: true },
});
