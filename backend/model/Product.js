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
  name: {
    type: String,
    require: true,
  },
 metaTitle: { type: String },
  metaDescription: { type: String },
  keywords: { type: String },
  robots: { type: String },
   slug: {
    type: String,
    unique: true,
  },
   images: [{
    url: {
      type: String,
      required: true
    },
    altText: {
      type: String,
      required: true
    }
  }],
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
  // bannerImage:{
  //  type:String,
  //  require:true 
  // },
  //  bannerImageAltText:{
  //    type: String,
  //   require: true,
  // },
  
  // bannerTitle:{
  //   type:String,
  //   require:true 
  //  },
  //  bannerContent:{
  //   type:String,
  //   require:true 
  //  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  }
});

productSchema.index({ slug: 1 }, { unique: true });
productSchema.index({ brandId: 1, categoryId: 1 });
productSchema.index({ categoryId: 1, createdAt: -1 });
productSchema.index({ brandId: 1, createdAt: -1 });
productSchema.index({ status: 1, createdAt: -1 });
productSchema.index({ name: 1 });

export const Products = mongoose.model("Products", productSchema);
