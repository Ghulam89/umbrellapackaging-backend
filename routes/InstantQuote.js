import express from "express";

import { createInstantQuote, deleteInstantQuoteById, getAllInstantQuote, getInstantQuoteById, updateInstantQuote } from "../controller/InstantQuote";

const instantQuoteRouter = express.Router();

blogRouter.route("/create").post(createInstantQuote);
blogRouter.route("/getAll").get(getAllInstantQuote);
blogRouter.route("/update/:id").put(updateInstantQuote);
blogRouter.route("/get/:id").get(getInstantQuoteById);
blogRouter.route("/delete/:id").delete(deleteInstantQuoteById);

export default instantQuoteRouter;
