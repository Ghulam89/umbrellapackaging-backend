import mongoose from "mongoose";
const Schema = mongoose.Schema;

const subscribeSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
});

subscribeSchema.index({ email: 1 }, { unique: true });

export const Subscribe = mongoose.model("Subscribe", subscribeSchema);
