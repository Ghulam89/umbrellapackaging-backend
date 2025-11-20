import mongoose from "mongoose";
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
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
  banner: {
    type: Array,
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

subcategorySchema.index({ categoryId: 1, status: 1 });
subcategorySchema.index({ brandId: 1, categoryId: 1 });
subcategorySchema.index({ title: 1 });
subcategorySchema.index({ createdAt: -1 });

export const SubCategory = mongoose.model("SubCategory", subcategorySchema);
