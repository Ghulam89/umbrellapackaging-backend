import express from "express";

import {
  createBlog,
  getBlogById,
  getAllBlogs,
  deleteBlogById,updateBlog
} from "../controller/BlogController.js";
import { uploadBlogImages } from "../upload/UploadFile.js";
const blogRouter = express.Router();
blogRouter.route("/create").post(uploadBlogImages,createBlog);
blogRouter.route("/getAll").get(getAllBlogs);
blogRouter.route("/update/:id").put(uploadBlogImages,updateBlog);
blogRouter.route("/get/:id").get(getBlogById);
blogRouter.route("/delete/:id").delete(deleteBlogById);

export default blogRouter;
