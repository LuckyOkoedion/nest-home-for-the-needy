import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
    projectName: { type: String, required: true },
    projectManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    projectScope: { type: String, required: true },
    projectBudgetedStartDate: { type: Date, required: true },
    projectBudgetedEndDate: { type: Date, required: true },
    projectActualStartDate: { type: Date, required: true },
    projectActualEndDate: { type: Date, required: true },
    projectBudgetedDays: { type: Number, required: true },
    projectBudgetedCost: { type: Number, required: true },
    projectActualCost: { type: Number, required: true }
  });