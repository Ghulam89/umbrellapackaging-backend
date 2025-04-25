import express from "express";
import {
  createProducts,
  getAllProducts,
  getProductsById,
  deleteproductsById,
  searchProduct,
  updateProducts,
  getBrandProductsByCategory,
} from "../controller/ProductController.js";
const productRouter = express.Router();
productRouter.route("/create").post(createProducts);
productRouter.route("/getAll").get(getAllProducts);
productRouter.route("/categoryProducts/:brandId/products-by-category").get(getBrandProductsByCategory);
productRouter.route("/search").get(searchProduct);
productRouter.route("/get/:id").get(getProductsById);
productRouter.route("/delete/:id").delete(deleteproductsById);
productRouter.route("/update/:id").put(updateProducts);
export default productRouter;
