import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { MidCategory } from "../model/MidCategory.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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

    const requiredFiles = [
      'image', 
      'icon', 
      'bannerImageFirst', 
      'bannerImageSecond', 
      'bannerImageThird', 
      'bannerImageFourth'
    ];
    
    requiredFiles.forEach(field => {
      if (req.files?.[field]) {
        const filePath = path.join(__dirname, '../..', req.files[field][0].path);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    });
    
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
    field => !req.files?.[field] || !req.files[field][0]
  );

  if (missingFiles.length > 0) {
    return res.status(400).json({
      status: "fail",
      message: `The following files are missing or invalid: ${missingFiles.join(', ')}`,
    });
  }

  try {
    const categoryData = {
      title,
      subTitle,
      description,
      videoLink,
      videoDescription,
      brandId,
      icon: `${process.env.BASEURL}/images/${req.files.icon[0].filename}`.replace(/\\/g, '/'),
      image: `${process.env.BASEURL}/images/${req.files.image[0].filename}`.replace(/\\/g, '/'),
      bannerTitleFirst,
      bannerContentFirst,
      bannerImageFirst: `${process.env.BASEURL}/images/${req.files.bannerImageFirst[0].filename}`.replace(/\\/g, '/'),
      bannerTitleSecond,
      bannerContentSecond,
      bannerImageSecond: `${process.env.BASEURL}/images/${req.files.bannerImageSecond[0].filename}`.replace(/\\/g, '/'),
      bannerTitleThird,
      bannerContentThird,
      bannerImageThird: `${process.env.BASEURL}/images/${req.files.bannerImageThird[0].filename}`.replace(/\\/g, '/'),
      bannerTitleFourth,
      bannerContentFourth,
      bannerImageFourth: `${process.env.BASEURL}/images/${req.files.bannerImageFourth[0].filename}`.replace(/\\/g, '/'),
    };

    const newCategory = await MidCategory.create(categoryData);
    
    res.status(200).json({
      status: "success",
      message: "New Category created successfully!",
      data: newCategory,
    });

  } catch (error) {
   
    requiredFiles.forEach(field => {
      if (req.files?.[field]) {
        const filePath = path.join(__dirname, '../..', req.files[field][0].path);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    });
    
    return next(error);
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
  const categoryId = req.params.id;
  
  const existingCategory = await MidCategory.findById(categoryId);
  if (!existingCategory) {
    return res.status(404).json({ 
      status: "fail",
      message: "Category not found" 
    });
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

  const newFiles = [];

  try {
    if (req.files?.image) {
      const imagePath = `${process.env.BASEURL}/images/${req.files.image[0].filename}`.replace(/\\/g, '/');
      updateData.image = imagePath;
      newFiles.push({ field: 'image', path: req.files.image[0].path });
      
      if (existingCategory.image) {
        const oldImagePath = existingCategory.image.replace(process.env.BASEURL, '').replace('/images/', '');
        const fullOldPath = path.join(__dirname, 'images', oldImagePath);
        if (fs.existsSync(fullOldPath)) {
          fs.unlinkSync(fullOldPath);
        }
      }
    }

    if (req.files?.icon) {
      const iconPath = `${process.env.BASEURL}/images/${req.files.icon[0].filename}`.replace(/\\/g, '/');
      updateData.icon = iconPath;
      newFiles.push({ field: 'icon', path: req.files.icon[0].path });
      
      if (existingCategory.icon) {
        const oldIconPath = existingCategory.icon.replace(process.env.BASEURL, '').replace('/images/', '');
        const fullOldPath = path.join(__dirname, 'images', oldIconPath);
        if (fs.existsSync(fullOldPath)) {
          fs.unlinkSync(fullOldPath);
        }
      }
    }

    const bannerFields = [
      'bannerImageFirst',
      'bannerImageSecond',
      'bannerImageThird',
      'bannerImageFourth'
    ];

    for (const field of bannerFields) {
      if (req.files?.[field]) {
        const filePath = `${process.env.BASEURL}/images/${req.files[field][0].filename}`.replace(/\\/g, '/');
        updateData[field] = filePath;
        newFiles.push({ field, path: req.files[field][0].path });
        
        if (existingCategory[field]) {
          const oldPath = existingCategory[field].replace(process.env.BASEURL, '').replace('/images/', '');
          const fullOldPath = path.join(__dirname, 'images', oldPath);
          if (fs.existsSync(fullOldPath)) {
            fs.unlinkSync(fullOldPath);
          }
        }
      }
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

  } catch (error) {
  
    newFiles.forEach(file => {
      const fullPath = path.join(__dirname, '..', file.path);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    });
    
    return next(error);
  }
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
      
      totalCategory: count,
        pagination: {
          page,
          perPage,
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
