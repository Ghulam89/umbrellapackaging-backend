import mongoose from "mongoose";
const Schema = mongoose.Schema;

const instantQuoteSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  pageUrl: {
    type: String,
    require: true,
  },
  device: {
    type: String,
    require: true,
  },
  ip: {
    type: String,
    require: true,
  },


  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  },
});

instantQuoteSchema.index({ email: 1, createdAt: -1 });
instantQuoteSchema.index({ phoneNumber: 1, createdAt: -1 });
instantQuoteSchema.index({ status: 1, createdAt: -1 });
instantQuoteSchema.index({ pageUrl: 1 });

export const InstantQuote = mongoose.model("InstantQuote", instantQuoteSchema);
