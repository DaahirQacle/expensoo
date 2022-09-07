import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "please provide a description"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "please provide a price"],
    },
    expense: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "please provide an expense "],
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide createdBy"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
