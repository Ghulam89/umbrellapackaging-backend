import mongoose from "mongoose";
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  bannerImage: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  bgColor: {
    type: String,
    require: true,
  },
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

export const Brands = mongoose.model("Brands", brandSchema);
