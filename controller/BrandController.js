import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Brands } from "../model/Brand.js";
import cloudinary from "cloudinary";
cloudinary.v2.config({
  cloud_name: "ddu4sybue",
  api_key: "658491673268817",
  api_secret: "w35Ei6uCvbOcaN4moWBKL3BmW4Q",
});



export const createBrand = catchAsyncError(async (req, res, next) => {
  console.log(req.body);
  
  const { name } = req.body;
  const existingBrand = await Brands.findOne({ name });
  if (existingBrand) {
    return res.status(400).json({
      status: "fail",
      message: "Category with this name already exists!",
    });
  }
  if (!req.files?.image || !req.files?.bannerImage) {
    return res.status(400).json({
      status: "fail",
      message: "Both image and banner image are required",
    });
  }

  const { image, bannerImage } = req.files;
  
  try {
    const [result, bannerResult] = await Promise.all([
      cloudinary.v2.uploader.upload(image.tempFilePath),
      cloudinary.v2.uploader.upload(bannerImage.tempFilePath)
    ]);
    const brandData = {
      image: result.url,
      bannerImage: bannerResult.url,
      name: req.body.name,
      bgColor: req.body.bgColor,
      content: req.body.content,
    };

    const newBrand = await Brands.create(brandData);
    
    res.status(201).json({
      status: "success",
      message: "Category created successfully!",
      data: newBrand,
    });

  } catch (error) {
    if (result) await cloudinary.v2.uploader.destroy(result.public_id);
    if (bannerResult) await cloudinary.v2.uploader.destroy(bannerResult.public_id);
    return next(error);
  }
});


export const getBrandById = async (req, res, next) => {
  const id = req?.params.id;
  try {
    const data = await Brands.findById(id);

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


export const updateBrand = catchAsyncError(async (req, res, next) => {
  const blogId = req.params.id;
  const { name, bgColor, content } = req.body;
  
  const existingBrand = await Brands.findById(blogId);
  if (!existingBrand) {
    return res.status(404).json({ message: "Brand not found" });
  }

  if (name && name !== existingBrand.name) {
    const nameExists = await Brands.findOne({ name });
    if (nameExists) {
      return res.status(400).json({
        status: "fail",
        message: "Brand with this name already exists!",
      });
    }
  }

  const updateData = {
    name: name || existingBrand.name,
    bgColor: bgColor || existingBrand.bgColor,
    content: content || existingBrand.content,
  };

  if (req.files?.image) {
    try {
      if (existingBrand.image) {
        const publicId = existingBrand.image.split('/').pop().split('.')[0];
        await cloudinary.v2.uploader.destroy(publicId);
      }
      
      const result = await cloudinary.v2.uploader.upload(req.files.image.tempFilePath);
      updateData.image = result.url;
    } catch (error) {
      return next(error);
    }
  }

  if (req.files?.bannerImage) {
    try {
      
      if (existingBrand.bannerImage) {
        const publicId = existingBrand.bannerImage.split('/').pop().split('.')[0];
        await cloudinary.v2.uploader.destroy(publicId);
      }
      
      const bannerResult = await cloudinary.v2.uploader.upload(req.files.bannerImage.tempFilePath);
      updateData.bannerImage = bannerResult.url;
    } catch (error) {
      return next(error);
    }
  }
  const updatedBrand = await Brands.findByIdAndUpdate(blogId, updateData, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedBrand,
    message: "Brand updated successfully!",
  });
});

export const getAllBrand = async (req, res, next) => {
  try {
    const { page = 1, limit = 4, search = '', all = false } = req.query;
    if (all === 'true') {
      const brands = await Brands.aggregate([
        {
          $match: {
            $or: [{ name: { $regex: search, $options: 'i' } }],
          },
        },
        {
          $lookup: {
            from: "midcategories",
            localField: "_id",
            foreignField: "brandId",
            as: "midcategories",
          },
        },
        {
          $project: {
            name: 1,
            image: 1,
            bannerImage:1,
            bgColor: 1,
            content: 1,
            createdAt: 1,
            status: 1,
            midcategories: 1,
          },
        },
      ]);

      return res.status(200).json({
        status: "success",
        data: brands,
        totalBrands: brands.length,
      });
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const brands = await Brands.aggregate([
      {
        $match: {
          $or: [{ name: { $regex: search, $options: 'i' } }],
        },
      },
      {
        $lookup: {
          from: "midcategories",
          localField: "_id",
          foreignField: "brandId",
          as: "midcategories",
        },
      },
      {
        $project: {
          name: 1,
          image: 1,
          bannerImage: 1,
          bgColor: 1,
          content:1,
          createdAt: 1,
          status: 1,
          midcategories: 1,
        },
      },
      { $skip: skip },
      { $limit: parseInt(limit, 10) },
    ]);

    const totalBrands = await Brands.countDocuments({
      $or: [{ name: { $regex: search, $options: 'i' } }],
    });

    res.status(200).json({
      status: "success",
      data: brands,
      totalBrands,
      pagination: {
        total: totalBrands,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        totalPages: Math.ceil(totalBrands / parseInt(limit, 10)),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBrandById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const delBrands = await Brands.findByIdAndDelete(id);
    if (!delBrands) {
      return res.json({ status: "fail", message: "Category not Found" });
    }
    res.json({
      status: "success",
      message: "Category deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
