import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;



const questionAnswerSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});


const blogSchema = new Schema({
  title: {
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
  shortDescription: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
    imageAltText:{
     type: String,
    require: true,
  },
  content: {
    type: String,
  },
   processedContent: {
    type: String,
  },
   qna: [questionAnswerSchema],
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

blogSchema.index({ slug: 1 }, { unique: true });
blogSchema.index({ title: 1 });
blogSchema.index({ status: 1, createdAt: -1 });
blogSchema.index({ createdAt: -1 });

export const Blogs = mongoose.model("Blogs", blogSchema);
