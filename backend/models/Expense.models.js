import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: ['Shopping', "Food", "Transport", "Rent", "Entertainment", "Others"],
    },
  },
  { timestamps: true }
);
expenseSchema.index({ user: 1, date: -1 });
export const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
