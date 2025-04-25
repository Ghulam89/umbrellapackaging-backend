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
  videoDescription: {
    type: String,
    require: true,
  },
  bannerTitleFirst: {
    type: String,
    require: true,
  },
  bannerContentFirst: {
    type: String,
    require: true,
  },
  bannerImageFirst: {
    type: String,
    require: true,
  },
  bannerTitleSecond: {
    type: String,
    require: true,
  },
  bannerContentSecond: {
    type: String,
    require: true,
  },
  bannerImageSecond: {
    type: String,
    require: true,
  },
  bannerTitleThird: {
    type: String,
    require: true,
  },
  bannerContentThird: {
    type: String,
    require: true,
  },
  bannerImageThird: {
    type: String,
    require: true,
  },
  bannerTitleFourth: {
    type: String,
    require: true,
  },
  bannerContentFourth: {
    type: String,
    require: true,
  },
  bannerImageFourth: {
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
