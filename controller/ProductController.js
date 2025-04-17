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
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error uploading images" });
      }
    }
    data.images = response;
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



