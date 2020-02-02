import { Document } from "mongoose";

export interface IProject extends Document {
  readonly projectName: string;
  readonly projectManagerUserId: string;
  readonly projectScope: string;
  readonly projectBudgetedStartDate: Date;
  readonly projectBudgetedEndDate: Date;
  readonly projectActualStartDate: Date;
  readonly projectActualEndDate: Date;
  readonly projectBudgetedDays: number;
  readonly projectBudgetedCost: number;
  readonly projectActualCost: number;
}
