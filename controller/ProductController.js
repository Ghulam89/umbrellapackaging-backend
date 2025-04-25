import mongoose from "mongoose";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Brands } from "../model/Brand.js";
import { Products } from "../model/Product.js";
import cloudinary from "cloudinary";


cloudinary.v2.config({
  cloud_name: "ddu4sybue",
  api_key: "658491673268817",
  api_secret: "w35Ei6uCvbOcaN4moWBKL3BmW4Q",
});



export const createProducts = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  
  if (!data.name || !data.actualPrice || !data.size || !data.description || 
      !data.bannerTitle || !data.bannerContent) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  let images = [];
  let bannerImageUrl = null;

  if (req.files) {
    if (req.files.bannerImage) {
      try {
        const bannerResult = await cloudinary.v2.uploader.upload(req.files.bannerImage.tempFilePath);
        bannerImageUrl = bannerResult.secure_url;
      } catch (error) {
        console.error("Banner image upload error:", error);
        return res.status(500).json({ error: "Error uploading banner image" });
      }
    }

    if (req.files.images) {
      const productImages = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
      
      try {
      
        const uploadPromises = productImages.map(image => 
          cloudinary.v2.uploader.upload(image.tempFilePath)
        );
        
        const results = await Promise.all(uploadPromises);
        images = results.map(result => result.secure_url);
      } catch (error) {
        console.error("Product images upload error:", error);
        return res.status(500).json({ error: "Error uploading product images" });
      }
    }
  }

  if (images.length === 0 || !bannerImageUrl) {
    return res.status(400).json({ error: "Both product images and banner image are required" });
  }

  const productData = {
    ...data,
    images,
    bannerImage: bannerImageUrl,
  };

  try {
    const newProduct = await Products.create(productData);
    
    res.status(201).json({
      status: "success",
      message: "New Product created successfully!",
      data: newProduct
    });
  } catch (error) {
    console.error("Product creation error:", error);
    res.status(500).json({ error: "Error creating product" });
  }
});

export const getBrandProductsByCategory = catchAsyncError(async (req, res, next) => {
  const brandId = req.params.brandId;
  
  try {
    const brand = await Brands.findById(brandId);
    if (!brand) {
      return res.status(404).json({
        status: "fail",
        message: "Brand not found",
      });
    }
    const productsByCategory = await Products.aggregate([  
      {
        $lookup: {
          from: "midcategories",
          localField: "categoryId",
          foreignField: "_id",
          as: "categoryInfo"
        }
      },
      {
        $unwind: {
          path: "$categoryInfo",
          preserveNullAndEmptyArrays: true 
        }
      },
      {
        $group: {
          _id: "$categoryInfo._id",
          categoryName: { $first: "$categoryInfo.title" },
          categoryImage: { $first: "$categoryInfo.image" },
          products: {
            $push: {
              _id: "$_id",
              name: "$name",
              price: "$price",
              images: "$images",
              actualPrice: "$actualPrice",
              size: "$size",
              description: "$description",
           
            }
          }
        }
      },
      {
        $match: {
          _id: { $ne: null } 
        }
      },
      {
        $project: {
          _id: 1,
          categoryName: 1,
          categoryImage: 1,
          products: 1,
          productCount: { $size: "$products" }
        }
      },
      {
        $sort: { categoryName: 1 } 
      }
    ]);

    res.status(200).json({
      status: "success",
      data: {
        brand: {
          _id: brand._id,
          name: brand.name,
          image: brand.image
        },
        categories: productsByCategory
      }
    });

  } catch (error) {
    next(error);
  }
});

export const getProductsById = async (req, res, next) => {
  const id = req?.params.id;
  try {
    const data = await Products.findById(id)
      .populate("categoryId")
      .populate("brandId")

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

export const updateProducts = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const productsId = req.params.id;

  // Handle multiple images upload
  if (req.files && req.files.images) {
    let images = [];
    if (!Array.isArray(req.files.images)) {
      images.push(req.files.images);
    } else {
      images = req.files.images;
    }

    let response = [];
    for (const image of images) {
      try {
        const result = await cloudinary.v2.uploader.upload(image.tempFilePath);
        response.push(result.url);
        // Consider removing the temp file after upload
        // fs.unlinkSync(image.tempFilePath);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error uploading images" });
      }
    }
    data.images = response;
  }

  if (req.files && req.files.bannerImage) {
    try {
      const bannerImage = req.files.bannerImage;
      const result = await cloudinary.v2.uploader.upload(bannerImage.tempFilePath);
      data.bannerImage = result.url; // Assign to data object
      // Consider removing the temp file after upload
      // fs.unlinkSync(bannerImage.tempFilePath);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error uploading banner image" });
    }
  }

  const updatedProducts = await Products.findByIdAndUpdate(productsId, data, {
    new: true,
  });

  if (!updatedProducts) {
    return res.status(404).json({ message: "Products not found" });
  }

  res.status(200).json({
    status: "success",
    data: updatedProducts,
    message: "Products updated successfully!",
  });
});

export const getAllProducts = catchAsyncError(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const perPage = parseInt(req.query.perPage, 10) || 5;
    const skip = (page - 1) * perPage;
    const sortOption = getSortOption(req.query.sort);
    let filter = {};
    if (req.query.categoryId) {
      filter['categoryId'] = req.query.categoryId;
    } else if (req.query.categoryTitle) {
      filter['categoryId'] = await Category.findOne({ 
        title: new RegExp(req.query.categoryTitle, "i") 
      }).select('_id');
    }
    
    if (req.query.brandId) {
      filter['brandId'] = req.query.brandId;
    } else if (req.query.brandName) {
      filter['brandId'] = await Brand.findOne({ 
        name: new RegExp(req.query.brandName, "i") 
      }).select('_id');
    }
    
    if (req.query.name) {
      filter.name = new RegExp(req.query.name, "i");
    }
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
    }
    
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    const products = await Products.find(filter)
      .populate({
        path: "categoryId",
        select: "title description"
      })
      .populate({
        path: "brandId",
        select: "name logo" 
      })
      .sort(sortOption)
      .skip(skip)
      .limit(perPage);
    
    const totalProducts = await Products.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / perPage);
    
    res.status(200).json({
      status: "success",
      data: products,
      pagination: {
        page,
        perPage,
        totalPages,
        totalItems: totalProducts
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error",
      message: error.message
    });
  }
});

export const searchProduct = catchAsyncError(async (req, res, next) => {
  const { title } = req.query;

  try {
    if (!title) {
      return res.status(400).json({ error: "title is required" });
    }

    const products = await Products.find({
      title: { $regex: title, $options: "i" },
    });

    res.status(200).json({ data: products, status: "success" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});


const getSortOption = (sort) => {
  switch (sort) {
    case "releaseDate-asc":
      return { createdAt: 1 };
    case "releaseDate-desc":
      return { createdAt: -1 };
    case "price-asc":
      return { discountPrice: 1 };
    case "price-desc":
      return { discountPrice: -1 }; 
    default:
      return { createdAt: -1 };
  }
};


export const deleteproductsById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const delProducts = await Products.findByIdAndDelete(id);
    if (!delProducts) {
      return res.json({ status: "fail", message: "Product not Found" });
    }
    res.json({
      status: "success",
      message: "Product deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};



