import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { InstantQuote } from "../model/InstantQuote.js";
import cloudinary from "cloudinary";
import nodemailer from 'nodemailer';
import { adminTemplate, customerTemplate, instantTemplate } from "../utils/emailTemplate.js";
cloudinary.v2.config({
  cloud_name: "di4vtp5l3",
  api_key: "855971682725667",
  api_secret: "U8n6H8d_rhDzSEBr03oHIqaPF5k",
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "gm6681328@gmail.com",
    pass: "ptpatylqsrszlqtq", 
  },
  tls: {
    rejectUnauthorized: false 
  }
});

// create blog
export const createInstantQuote = catchAsyncError(async (req, res, next) => {
  let image = req.files.image;
  const data = req.body;
  const result = await cloudinary.v2.uploader.upload(image.tempFilePath);
  const url = result.url;
  let data1 = {
    image: url,
    name: data?.name,
    email: data?.email,
    phoneNumber: data?.phoneNumber,
    message: data?.message,
  };

  const newInstantQuote = await InstantQuote.create(data1);



  const mailOptions = {
    from: 'gm6681328@gmail.com',
    to: data?.email,
    subject: 'Thank You for Your Quote Request - Umbrella Packaging',
    html: customerTemplate(data?.name)
  };

  const adminMailOptions = {
    from: 'gm6681328@gmail.com',
    to: data?.email,
    subject: 'Thank You for Your Quote Request - Umbrella Packaging',
    html: instantTemplate(data)
  };  
  try {
    await transporter.sendMail(mailOptions);

    await transporter.sendMail(adminMailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }

  res.status(200).json({
    status: "success",
    message: "Request Quote created successfully and confirmation email sent!",
    data: newInstantQuote,
  });
});

// get blog by id
export const getInstantQuoteById = async (req, res, next) => {
  const id = req?.params.id;
  try {
    const data = await InstantQuote.findById(id);

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
export const updateInstantQuote = catchAsyncError(async (req, res, next) => {
    const data = req.body;
    const InstantQuoteId = req.params.id;
    const existingInstantQuote = await InstantQuote.findById(InstantQuoteId);
    if (!existingInstantQuote) {
      return res.status(404).json({ message: "Request quote not found" });
    }
    if (req.files && req.files.image) {
      const image = req.files.image;
      if (existingInstantQuote.image) {
        try {
          
          const urlParts = existingInstantQuote.image.split('/');
          const publicIdWithExtension = urlParts[urlParts.length - 1];
          const publicId = publicIdWithExtension.split('.')[0];
          
          await cloudinary.v2.uploader.destroy(publicId);
        } catch (error) {
          console.error("Error deleting old image from Cloudinary:", error);
          
        }
      }
      
      const result = await cloudinary.v2.uploader.upload(image.tempFilePath);
      data.image = result.url;
    }
  
    const updatedInstantQuote = await InstantQuote.findByIdAndUpdate(
      InstantQuoteId, 
      data, 
      { new: true }
    );
  
    res.status(200).json({
      status: "success",
      data: updatedInstantQuote,
      message: "Request Quote updated successfully!",
    });
  });


export const getAllInstantQuote = catchAsyncError(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const blogs = await InstantQuote.aggregate([
      { $skip: skip },
      { $limit: limit },
    ]);
    const totalInstantQuote = await InstantQuote.countDocuments();

    res.status(200).json({
      status: "success",
      data: blogs,
      pagination: {
        total: totalInstantQuote,
        page,
        limit,
        totalPages: Math.ceil(totalInstantQuote / limit),
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
export const deleteInstantQuoteById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deleteInstantQuote = await InstantQuote.findByIdAndDelete(id);
    if (!deleteInstantQuote) {
      return res.json({ status: "fail", message: "Blog not Found" });
    }
    res.json({
      status: "success",
      message: "Request Quote deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};






