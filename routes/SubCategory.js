import express from "express";

import {
  createSubCategory,
  getAllSubCategory,
  getSubCategoryById,
  deleteSubCategoryById,
  updateSubCategory,getCategoryById
} from "../controller/SubCategory.js";
const subcategoryRouter = express.Router();

subcategoryRouter.route("/create").post(createSubCategory);
subcategoryRouter.route("/getAll").get(getAllSubCategory);
subcategoryRouter.route("/update/:id").put(updateSubCategory);
subcategoryRouter.route("/getbyCategoryId/:id").get(getCategoryById);
subcategoryRouter.route("/get/:id").get(getSubCategoryById);
subcategoryRouter.route("/delete/:id").delete(deleteSubCategoryById);

export default subcategoryRouter;
