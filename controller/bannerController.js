import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Banner } from "../model/Banner.js";
import cloudinary from "cloudinary";
cloudinary.v2.config({
    cloud_name: "di4vtp5l3",
    api_key: "855971682725667",
    api_secret: "U8n6H8d_rhDzSEBr03oHIqaPF5k",
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


// Update banner by id
export const updateBanner = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    try {
        let updateData = {
            videoLink: req.body.videoLink,
            description: req.body.description
        };

        if (req.files && req.files.image) {
            const image = req.files.image;
            const result = await cloudinary.v2.uploader.upload(image.tempFilePath);
            updateData.image = result.url;
        }

        const updatedBanner = await Banner.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedBanner) {
            return res.status(404).json({
                status: "fail",
                message: "Banner not found",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Banner updated successfully!",
            data: updatedBanner,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "fail",
            error: "Internal Server Error",
        });
    }
});

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



