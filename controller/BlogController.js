import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Blogs } from "../model/Blog.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// create blog
const processContentImages = (content) => {
  if (!content) return content;
  
  return content.replace(/src="\/temp\/([^"]+)"/g, (match, filename) => {
    return `src="${process.env.BASEURL}/images/${filename}"`;
  });
};

// Create blog
export const createBlog = catchAsyncError(async (req, res, next) => {
  try {
    if (!req.files?.image) {
      return res.status(400).json({
        status: "fail",
        message: "Blog image is required",
      });
    }

    const imagePath = `${process.env.BASEURL}/images/${req.files.image[0].filename}`.replace(/\\/g, '/');
    
    const processedContent = processContentImages(req.body.content);

    const blogData = {
      image: imagePath,
      content: processedContent,
      title: req.body?.title,
      shortDescription: req.body?.shortDescription,
    };

    const newBlog = await Blogs.create(blogData);
    
    res.status(200).json({
      status: "success",
      message: "New blog created successfully!",
      data: newBlog,
    });

  } catch (error) {
    if (req.files?.image) {
      const filePath = path.join(__dirname, 'images', req.files.image[0].filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    return next(error);
  }
});

// get blog by id
export const getBlogById = async (req, res, next) => {
  const id = req?.params.id;
  try {
    const data = await Blogs.findById(id);

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
// update blog
// Update blog
export const updateBlog = catchAsyncError(async (req, res, next) => {
  const blogId = req.params.id;
  
  try {
    const existingBlog = await Blogs.findById(blogId);
    if (!existingBlog) {
      return res.status(404).json({ 
        status: "fail",
        message: "Blog not found" 
      });
    }

    const processedContent = processContentImages(req.body.content);

    let updateData = {
      content: processedContent || existingBlog.content,
      title: req.body?.title || existingBlog.title,
      shortDescription: req.body?.shortDescription || existingBlog.shortDescription,
    };

    if (req.files?.image) {
     
      const newImagePath = `${process.env.BASEURL}/images/${req.files.image[0].filename}`.replace(/\\/g, '/');
      updateData.image = newImagePath;
      
    
      if (existingBlog.image) {
        const oldImageName = existingBlog.image.split('/').pop();
        const oldImagePath = path.join(__dirname, 'images', oldImageName);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const updatedBlog = await Blogs.findByIdAndUpdate(
      blogId,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      data: updatedBlog,
      message: "Blog updated successfully!",
    });

  } catch (error) {
    
    if (req.files?.image) {
      const filePath = path.join(__dirname, 'images', req.files.image[0].filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    return next(error);
  }
});


export const getAllBlogs = catchAsyncError(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const blogs = await Blogs.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);
    const totalBlogs = await Blogs.countDocuments();

    res.status(200).json({
      status: "success",
      data: blogs,
      pagination: {
        total: totalBlogs,
        page,
        limit,
        totalPages: Math.ceil(totalBlogs / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching blogs with pagination:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error",
    });
  }
});



// delete blog
export const deleteBlogById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const delBlog = await Blogs.findByIdAndDelete(id);
    if (!delBlog) {
      return res.json({ status: "fail", message: "Blog not Found" });
    }
    res.json({
      status: "success",
      message: "Blog deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};






