import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { MidCategory } from "../model/MidCategory.js";
import cloudinary from "cloudinary";
cloudinary.v2.config({
  cloud_name: "di4vtp5l3",
  api_key: "855971682725667",
  api_secret: "U8n6H8d_rhDzSEBr03oHIqaPF5k",
});


export const createCategory = catchAsyncError(async (req, res, next) => {
  const { 
    title,
    subTitle,
    description,
    videoLink,
    videoDescription,
    brandId,
    bannerTitleFirst,
    bannerContentFirst,
    bannerTitleSecond,
    bannerContentSecond,
    bannerTitleThird,
    bannerContentThird,
    bannerTitleFourth,
    bannerContentFourth,
  } = req.body;

  const findName = await MidCategory.findOne({ title });
  if (findName) {
    return res.status(400).json({
      status: "fail",
      message: "This name already exists!",
    });
  }

  const requiredFiles = [
    'image', 
    'icon', 
    'bannerImageFirst', 
    'bannerImageSecond', 
    'bannerImageThird', 
    'bannerImageFourth'
  ];

  const missingFiles = requiredFiles.filter(
    field => !req.files?.[field] || !req.files[field].tempFilePath
  );

  if (missingFiles.length > 0) {
    return res.status(400).json({
      status: "fail",
      message: `The following files are missing or invalid: ${missingFiles.join(', ')}`,
    });
  }

  try {
    // Upload all files to Cloudinary
    const uploadPromises = requiredFiles.map(field => 
      cloudinary.v2.uploader.upload(req.files[field].tempFilePath)
    );

    const [
      imageResult,
      iconResult,
      bannerImageFirstResult,
      bannerImageSecondResult,
      bannerImageThirdResult,
      bannerImageFourthResult
    ] = await Promise.all(uploadPromises);

    const categoryData = {
      title,
      subTitle,
      description,
      videoLink,
      videoDescription,
      brandId,
      icon: iconResult.url,
      image: imageResult.url,
      bannerTitleFirst,
      bannerContentFirst,
      bannerImageFirst: bannerImageFirstResult.url,
      bannerTitleSecond,
      bannerContentSecond,
      bannerImageSecond: bannerImageSecondResult.url,
      bannerTitleThird,
      bannerContentThird,
      bannerImageThird: bannerImageThirdResult.url,
      bannerTitleFourth,
      bannerContentFourth,
      bannerImageFourth: bannerImageFourthResult.url,
    };

    // Create new category
    const newCategory = await MidCategory.create(categoryData);
    
    res.status(200).json({
      status: "success",
      message: "New Category created successfully!",
      data: newCategory,
    });

  } catch (uploadError) {
    return res.status(500).json({
      status: "error",
      message: "Failed to upload one or more files to Cloudinary",
      error: uploadError.message
    });
  }
});
export const getCategoryById = async (req, res, next) => {
  const id = req?.params.id;
  try {
    const data = await MidCategory.findById(id).populate('brandId');

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
  console.log(data);
  
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
    brandId: data.brandId,
    videoDescription: data.videoDescription,
    bannerTitleFirst: data.bannerTitleFirst,
    bannerTitleSecond: data.bannerTitleSecond,
    bannerTitleThird: data.bannerTitleThird,
    bannerTitleFourth: data.bannerTitleFourth,
    bannerContentFirst: data.bannerContentFirst,
    bannerContentSecond: data.bannerContentSecond,
    bannerContentThird: data.bannerContentThird,
    bannerContentFourth: data.bannerContentFourth,
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

  if (req.files?.bannerImageFirst) {
    const bannerImageFirst = req.files.bannerImageFirst;
    const iconResult = await cloudinary.v2.uploader.upload(bannerImageFirst.tempFilePath);
    updateData.bannerImageFirst = iconResult.url;
  }

  if (req.files?.bannerImageSecond) {
    const bannerImageSecond = req.files.bannerImageSecond;
    const iconResult = await cloudinary.v2.uploader.upload(bannerImageSecond.tempFilePath);
    updateData.bannerImageSecond = iconResult.url;
  }
  if (req.files?.bannerImageThird) {
    const bannerImageThird = req.files.bannerImageThird;
    const iconResult = await cloudinary.v2.uploader.upload(bannerImageThird.tempFilePath);
    updateData.bannerImageThird = iconResult.url;
  }
  if (req.files?.bannerImageFourth) {
    const bannerImageFourth = req.files.bannerImageFourth;
    const iconResult = await cloudinary.v2.uploader.upload(bannerImageFourth.tempFilePath);
    updateData.bannerImageFourth = iconResult.url;
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
