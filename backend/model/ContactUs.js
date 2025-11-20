import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const ContactUsSchema = new Schema({
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
  companyName: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  message: {
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
});

ContactUsSchema.index({ email: 1, createdAt: -1 });
ContactUsSchema.index({ phoneNumber: 1 });
ContactUsSchema.index({ pageUrl: 1 });

export const ContactUs = mongoose.model("ContactUs", ContactUsSchema);
