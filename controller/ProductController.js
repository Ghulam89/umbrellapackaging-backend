import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Products } from "../model/Product.js";
import cloudinary from "cloudinary";


cloudinary.v2.config({
  cloud_name: "ddu4sybue",
  api_key: "658491673268817",
  api_secret: "w35Ei6uCvbOcaN4moWBKL3BmW4Q",
});



export const createProducts = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  let images = [];
  if (req.files && req.files.images) {
    if (!Array.isArray(req.files.images)) {
      images.push(req.files.images);
    } else {
      images = req.files.images;
    }
  }
  let responce = [];
  for (const image of images) {
    try {
      const result = await cloudinary.v2.uploader.upload(image.tempFilePath);
      const url = result.url;
      responce.push(url);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error uploading images" });
    }
  }
  let data1 = {
    images: responce,
    ...data,
  };
  const newProducts = await Products.create(data1);
  res.status(200).json({
    status: "success",
    message: "New Product created successfully!",
    data: newProducts,
  });
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
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const sortOption = getSortOption(req.query.sort);
    let filter = {};
    if (req.query.categoryId) filter.categoryId = req.query.categoryId;
    if (req.query.brandId) filter.brandId = req.query.brandId;
    if (req.query.title) filter.title = new RegExp(req.query.title, "i");
    const products = await Products.find(filter)
      .populate("categoryId")
      .populate("brandId")
      .sort(sortOption)
      .skip(skip)
      .limit(limit);
    const totalProducts = await Products.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);
    res.status(200).json({
      status: "success",
      data: products,
      pagination: {
        total: totalProducts,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error",
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



