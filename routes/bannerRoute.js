import express from "express";

import { createBanner,getAllbanners,getBannerById,deleteBannerById } from "../controller/bannerController.js";



const bannerRouter = express.Router();

bannerRouter.route("/create").post(createBanner);
bannerRouter.route("/getAll").get(getAllbanners);
bannerRouter.route("/get/:id").get(getBannerById);
bannerRouter.route("/delete/:id").delete(deleteBannerById);


export default bannerRouter;
