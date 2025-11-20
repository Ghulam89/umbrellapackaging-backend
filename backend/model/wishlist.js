import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
});

wishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });
wishlistSchema.index({ userId: 1 });
wishlistSchema.index({ productId: 1 });
wishlistSchema.index({ addedAt: -1 });

wishlistSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Wishlist.deleteMany({ productId: doc._id });
  }
});

export const Wishlist = mongoose.model("wishlist", wishlistSchema);
