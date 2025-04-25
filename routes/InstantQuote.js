import express from "express";

import { createInstantQuote, deleteInstantQuoteById, getAllInstantQuote, getInstantQuoteById, updateInstantQuote } from "../controller/InstantQuote.js";

const instantQuoteRouter = express.Router();

instantQuoteRouter.route("/create").post(createInstantQuote);
instantQuoteRouter.route("/getAll").get(getAllInstantQuote);
instantQuoteRouter.route("/update/:id").put(updateInstantQuote);
instantQuoteRouter.route("/get/:id").get(getInstantQuoteById);
instantQuoteRouter.route("/delete/:id").delete(deleteInstantQuoteById);

export default instantQuoteRouter;
