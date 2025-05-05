import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { RequestQuote } from "../model/RequestQuote.js";
import cloudinary from "cloudinary";
import nodemailer from 'nodemailer';
import { adminTemplate, customerTemplate } from "../utils/emailTemplate.js";
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
export const createRequestQuote = catchAsyncError(async (req, res, next) => {
  let image = req.files.image;
  const data = req.body;
  const result = await cloudinary.v2.uploader.upload(image.tempFilePath);
  const url = result.url;
  let data1 = {
    image: url,
    name: data?.name,
    email: data?.email,
    phoneNumber: data?.phoneNumber,
    companyName: data?.companyName,
    boxStyle: data?.boxStyle,
    length: data?.length,
    width: data?.width,
    depth: data?.depth,
    unit: data?.unit,
    quantity: data?.quantity,
    stock: data?.stock,
    color: data?.color,
    addons: data?.addons,
    message: data?.message,
  };

  const newRequestQuote = await RequestQuote.create(data1);

  const mailOptions = {
    from: 'gm6681328@gmail.com',
    to: data?.email,
    subject: 'Thank You for Your Quote Request - Umbrella Packaging',
    html: customerTemplate(data?.name)
  };

    console.log(data1);
 
  const adminMailOptions = {
    from: 'gm6681328@gmail.com',
    to: data?.email,
    subject: 'Thank You for Your Quote Request - Umbrella Packaging',
    html: adminTemplate(data1)
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
    data: newRequestQuote,
  });
});

// get blog by id
export const getRequestQuoteById = async (req, res, next) => {
  const id = req?.params.id;
  try {
    const data = await RequestQuote.findById(id);

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
export const updateRequestQuote = catchAsyncError(async (req, res, next) => {
    const data = req.body;
    const requestQuoteId = req.params.id;
    const existingRequestQuote = await RequestQuote.findById(requestQuoteId);
    if (!existingRequestQuote) {
      return res.status(404).json({ message: "Request quote not found" });
    }
    if (req.files && req.files.image) {
      const image = req.files.image;
      if (existingRequestQuote.image) {
        try {
          
          const urlParts = existingRequestQuote.image.split('/');
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
  
    const updatedRequestQuote = await RequestQuote.findByIdAndUpdate(
      requestQuoteId, 
      data, 
      { new: true }
    );
  
    res.status(200).json({
      status: "success",
      data: updatedRequestQuote,
      message: "Request Quote updated successfully!",
    });
  });


export const getAllRequestQuote = catchAsyncError(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const blogs = await RequestQuote.aggregate([
      { $skip: skip },
      { $limit: limit },
    ]);
    const totalRequestQuote = await RequestQuote.countDocuments();

    res.status(200).json({
      status: "success",
      data: blogs,
      pagination: {
        total: totalRequestQuote,
        page,
        limit,
        totalPages: Math.ceil(totalRequestQuote / limit),
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
export const deleteRequestQuoteById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deleteRequestQuote = await RequestQuote.findByIdAndDelete(id);
    if (!deleteRequestQuote) {
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






