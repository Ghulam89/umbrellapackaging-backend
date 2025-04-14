import express from "express";

import {
  createCategory,
  getCategoryById,
  getAllCategory,
  deleteCategoryById,
  updateCategory
} from "../controller/MidCategory.js";
const categoryRouter = express.Router();
categoryRouter.route("/create").post(createCategory);
categoryRouter.route("/getAll").get(getAllCategory);
categoryRouter.route("/update/:id").put(updateCategory);
categoryRouter.route("/get/:id").get(getCategoryById);
categoryRouter.route("/delete/:id").delete(deleteCategoryById);

export default categoryRouter;
