import mongoose from "mongoose";
const Schema = mongoose.Schema;

const midcategorySchema = new Schema({
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brands",
  },
  title: {
    type: String,
    require: true,
  },
  subTitle: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  icon: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  videoLink: {
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

export const MidCategory = mongoose.model("MidCategory", midcategorySchema);
