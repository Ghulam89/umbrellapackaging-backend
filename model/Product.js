import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brands",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MidCategory",
  },
  title: {
    type: String,
    require: true,
  },
  images: {
    type: Array,
    require: true,
  },
  actualPrice: {
    type: String,
    require: true,
  },
  size: {
    type: String,
    require: true,
  },
  description: {
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
export const Products = mongoose.model("Products", productSchema);
