import mongoose from "mongoose";
const Schema = mongoose.Schema;

const checkoutSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  companyName: {
    type: String,
    require: true,
  },
  totalBill: {
    type: String,
    require: true,
  },
  note: {
    type: String,
    require: true,
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  delivery: { type: Object, require: true },
  productIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  },
});

export const Checkout = mongoose.model("Checkout", checkoutSchema);
