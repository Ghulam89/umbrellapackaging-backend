import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { MidCategory } from "../model/MidCategory.js";
import cloudinary from "cloudinary";
cloudinary.v2.config({
  cloud_name: "ddu4sybue",
  api_key: "658491673268817",
  api_secret: "w35Ei6uCvbOcaN4moWBKL3BmW4Q",
});


export const createCategory = catchAsyncError(async (req, res, next) => {
  let image = req.files.image;
  let icon = req.files.icon;
  const data = req.body;
  const title = data?.title;
  
  const findName = await MidCategory.findOne({ title: title });
  if (findName) {
    return res.status(400).json({
      status: "fail",
      message: "This name already exists!",
    });
  }
  
  const result = await cloudinary.v2.uploader.upload(image.tempFilePath);
  const iconResult = await cloudinary.v2.uploader.upload(icon.tempFilePath);
  
  let data1 = {
    image: result.url,
    icon: iconResult.url,
    title: title,
    subTitle: data.subTitle,
    description: data.description,
    videoLink: data.videoLink,
    brandId: data?.brandId
  };
  
  const newCategory = await MidCategory.create(data1);
  res.status(200).json({
    status: "success",
    message: "New Category created successfully!",
    data: newCategory,
  });
});

export const getCategoryById = async (req, res, next) => {
  const id = req?.params.id;
  try {
    const data = await MidCategory.findById(id);

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

export const updateCategory = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const categoryId = req.params.id;
  const existingCategory = await MidCategory.findById(categoryId);
  if (!existingCategory) {
    return res.status(404).json({ message: "Category not found" });
  }
  let updateData = {
    title: data.title,
    subTitle: data.subTitle,
    description: data.description,
    videoLink: data.videoLink,
    brandId: data.brandId
  };

  if (req.files?.image) {
    const image = req.files.image;
    const result = await cloudinary.v2.uploader.upload(image.tempFilePath);
    updateData.image = result.url;
    
  }
  if (req.files?.icon) {
    const icon = req.files.icon;
    const iconResult = await cloudinary.v2.uploader.upload(icon.tempFilePath);
    updateData.icon = iconResult.url;
  }

  const updatedCategory = await MidCategory.findByIdAndUpdate(
    categoryId, 
    updateData, 
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedCategory,
    message: "Category updated successfully!",
  });
});

export const getAllCategory = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1; 
  const perPage = 5;
  const skip = (page - 1) * perPage;
  const searchQuery = req.query.search || '';
  try {
    const filter = searchQuery
    ? { 
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },
        ],
      }
    : {};
    const count = await MidCategory.countDocuments(filter);
    const categories = await MidCategory.find(filter).populate({
      path: "brandId",
      select: "name"
    }).skip(skip)
    .limit(perPage)
    .sort({ updatedAt: -1 });
  const totalPages = Math.ceil(count / perPage);

    res.status(200).json({
      status: "success",
      data:categories,
        pagination: {
          page,
          perPage,
          totalUsers: count,
          totalPages,
        }
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error",
    });
  }
});

export const deleteCategoryById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const delCategory = await MidCategory.findByIdAndDelete(id);
    if (!delCategory) {
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
