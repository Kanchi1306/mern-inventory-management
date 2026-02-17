const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["IN", "OUT"],
    },
    quantity: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
