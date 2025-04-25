import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Banner } from "../model/Banner.js";
import cloudinary from "cloudinary";
cloudinary.v2.config({
    cloud_name: "ddu4sybue",
    api_key: "658491673268817",
    api_secret: "w35Ei6uCvbOcaN4moWBKL3BmW4Q",
});


// create banner
export const createBanner = catchAsyncError(async (req, res, next) => {
    let image = req.files.image;
    const result = await cloudinary.v2.uploader.upload(image.tempFilePath);
    const banner = result.url;
    let data = {
       image: banner,
       videoLink:req.body.videoLink,
       description:req.body.description
    };
    
    const newBanner = await Banner.create(data);
    res.status(200).json({
        status: "success",
        message: "New banner created successfully!",
        data: newBanner,
    });

});



// get banner by id
export const getBannerById = async (req, res, next) => {
    const id = req?.params.id;
    try {
        const data = await Banner.findById(id);

        res.json({
            status: "success",
            data: data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "fail",
            error: "Internal Server Error",
        });

    }
};


// Get All banners
export const getAllbanners = catchAsyncError(async (req, res, next) => {
    try {
        const users = await Banner.find();
        res.status(200).json({
            status: "success",
            data: users,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            status: "fail",
            error: "Internal Server Error",
        });
    }
});
// delete banners
export const deleteBannerById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const delBanner = await Banner.findByIdAndDelete(id);
        if (!delBanner) {
            return res.json({ status: "fail", message: "Banner not Found" });
        }
        res.json({
            status: "success",
            message: "banner deleted successfully!",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};



