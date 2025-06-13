
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Brands } from "../model/Brand.js";
import { Products } from "../model/Product.js";
import { MidCategory } from "../model/MidCategory.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createProducts = catchAsyncError(async (req, res, next) => {
  const {
    name,
    slug,
    metaTitle,
      metaDescription,
      keywords,
      robots,
    actualPrice,
    size,
    description,
    bannerTitle,
    bannerContent,
    brandId,
    categoryId,
    bannerImageAltText
  } = req.body;

  if (!req.files || !req.files['images'] || !req.files['bannerImage']) {
    return res.status(400).json({
      status: "fail",
      message: "Both product images (field name: 'images') and banner image (field name: 'bannerImage') are required",
    });
  }

  const existingProduct = await Products.findOne({ name });
  if (existingProduct) {
    if (req.files['images']) {
      req.files['images'].forEach(image => {
        if (fs.existsSync(image.path)) {
          fs.unlinkSync(image.path);
        }
      });
    }
    if (req.files['bannerImage']) {
      const bannerPath = req.files['bannerImage'][0].path;
      if (fs.existsSync(bannerPath)) {
        fs.unlinkSync(bannerPath);
      }
    }

    return res.status(409).json({
      status: "fail",
      message: "Product with this name already exists",
    });
  }

  try {
    const productImages = Array.isArray(req.files['images'])
      ? req.files['images']
      : [req.files['images']];

    const images = productImages.map(image => ({
      url: `images/${image.filename}`.replace(/\\/g, '/'),
      altText: image.originalname
    }));

    const bannerImageFile = Array.isArray(req.files['bannerImage'])
      ? req.files['bannerImage'][0]
      : req.files['bannerImage'];

    const bannerPath = `images/${bannerImageFile.filename}`.replace(/\\/g, '/');

    const productData = {
      name,
      slug,
       metaTitle,
      metaDescription,
      keywords,
      robots,
      actualPrice,
      size,
      description,
      bannerTitle,
      bannerContent,
      images,
      bannerImage: bannerPath,
      bannerImageAltText,
      brandId,
      categoryId,
    };

    const newProduct = await Products.create(productData);

    res.status(201).json({
      status: "success",
      message: "Product created successfully!",
      data: newProduct,
    });
  } catch (error) {
    if (req.files['images']) {
      req.files['images'].forEach(image => {
        fs.unlinkSync(path.join(__dirname, '..', image.path));
      });
    }
    if (req.files['bannerImage']) {
      const bannerImageFile = Array.isArray(req.files['bannerImage'])
        ? req.files['bannerImage'][0]
        : req.files['bannerImage'];
      fs.unlinkSync(path.join(__dirname, '..', bannerImageFile.path));
    }
    return next(error);
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
        $match: {
          brandId: new mongoose.Types.ObjectId(brandId)
        }
      },
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
              slug: "$slug",
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


export const getRelatedProducts = catchAsyncError(async (req, res, next) => {
  const productId = req.params.productId;

  try {
    // 1. Find the main product
    const mainProduct = await Products.findById(productId);
    if (!mainProduct) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    const relatedProducts = await Products.find({
      _id: { $ne: productId },
      $or: [
        { categoryId: mainProduct.categoryId },
        { brandId: mainProduct.brandId }, 
        
      ],
    })
      .limit(8) 
      .sort({ createdAt: -1 }); 

    res.status(200).json({
      status: "success",
      data: {
        
        relatedProducts,
      },
    });
  } catch (error) {
    next(error);
  }
});

export const getProductsByCategory = catchAsyncError(async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const page = parseInt(req.query.page) || 1;
  const limit = 12;

  try {

    const category = await MidCategory.findById(categoryId);

    if (!category) {

      return res.status(404).json({
        status: "fail",
        message: "Category not found",
      });
    }

    console.log('Found category:', category.name);

    const skip = (page - 1) * limit;

    const queryConditions = {
      $or: [
        { category: categoryId },
        { midCategory: categoryId },
        { categoryId: categoryId }
      ]
    };


    const products = await Products.find(queryConditions)
      .skip(skip)
      .limit(limit)
      .lean();


    const totalProducts = await Products.countDocuments(queryConditions);
    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      status: "success",
      results: products.length,
      currentPage: page,
      totalPages: totalPages,
      totalProducts: totalProducts,
      data: products
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",

    });
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
  const {
    // Other fields...
    imagesAltTexts = [], // Array of updated alt texts for existing images
    bannerImageAltText,
    existingImages // Array of existing images with their current URLs
  } = req.body;
  
  const productId = req.params.id;
  const updateData = { ...req.body };

  try {
    // Get the current product to verify existing images
    const currentProduct = await Products.findById(productId);
    if (!currentProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Handle altText updates for existing images
    if (imagesAltTexts && existingImages) {
      const existingImagesParsed = JSON.parse(existingImages);
      
      // Update only altText for existing images
      updateData.images = currentProduct.images.map((img, index) => ({
        url: img.url, // Keep the same URL
        altText: imagesAltTexts[index] || img.altText // Update altText if provided
      }));
    }

    // Handle new image uploads (if any)
    if (req.files && req.files['images']) {
      const newImages = Array.isArray(req.files['images'])
        ? req.files['images']
        : [req.files['images']];

      const uploadedImages = newImages.map((image, index) => ({
        url: `images/${image.filename}`.replace(/\\/g, '/'),
        altText: imagesAltTexts[index + (updateData.images?.length || 0)] || image.originalname
      }));

      updateData.images = [...(updateData.images || currentProduct.images), ...uploadedImages];
    }

    // Handle banner image updates
    if (req.files && req.files['bannerImage']) {
      const bannerImageFile = req.files['bannerImage'][0] || req.files['bannerImage'];
      updateData.bannerImage = `images/${bannerImageFile.filename}`.replace(/\\/g, '/');
    }
    if (bannerImageAltText) {
      updateData.bannerImageAltText = bannerImageAltText;
    }

    const updatedProduct = await Products.findByIdAndUpdate(
      productId, 
      updateData, 
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      data: updatedProduct,
      message: "Product updated successfully!",
    });
  } catch (error) {
    // Handle file cleanup if error occurs
    if (req.files) {
      Object.values(req.files).forEach(fileArray => {
        if (Array.isArray(fileArray)) {
          fileArray.forEach(file => {
            if (fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
          });
        } else if (fs.existsSync(fileArray.path)) {
          fs.unlinkSync(fileArray.path);
        }
      });
    }
    next(error);
  }
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
      filter['brandId'] = await Brands.findOne({
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
      totalProducts: totalProducts,
      pagination: {
        page,
        perPage,
        totalPages,
        
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
  const { name } = req.query;

  try {
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const products = await Products.find({
      name: { $regex: name, $options: "i" },
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



