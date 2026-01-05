import { catchAsyncError } from "../middleware/catchAsyncError.js";
import requestIp from 'request-ip';
import { detect } from 'detect-browser';

import { InstantQuote } from "../model/InstantQuote.js";
import nodemailer from 'nodemailer';
import {customerTemplate, instantTemplate } from "../utils/emailTemplate.js";

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { EMAIL, PASS } from "../config/index.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  // service: 'gmail',
  host: "smtp.hostinger.com",
  port: 587,
  secure: false,
  auth: {
    user:EMAIL,
    pass:PASS, 
  },
  tls: {
    rejectUnauthorized: false
  }
});

// create blog
export const createInstantQuote = catchAsyncError(async (req, res, next) => {
  const data = req.body;

  let imagePath = null;

  try {
    if (req.files.image) {
      imagePath = `images/${req.files.image[0].filename}`.replace(/\\/g, '/');
    }
    // Get client IP
    const clientIp = requestIp.getClientIp(req);

    console.log(requestIp);

    // Detect browser/device info
    const browserInfo = detect(req.headers['user-agent']);
    const deviceInfo = browserInfo
      ? `${browserInfo.name} ${browserInfo.version} on ${browserInfo.os}`
      : 'Unknown device';
    console.log(browserInfo);

    const quoteData = {
      image: imagePath,
      name: data?.name,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      message: data?.message,
      pageUrl: data?.pageUrl,
      device: deviceInfo,
      ip: clientIp,
    };

    const newInstantQuote = await InstantQuote.create(quoteData);

    // Send customer email first
    const mailOptions = {
      from:EMAIL,
      to: data?.email,
      subject: 'Thank You for Your Quote Request - Umbrella Packaging',
      html: customerTemplate(data?.name)
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Customer email sent successfully');
    } catch (error) {
      console.error('Error sending customer email:', error);
    }

    // Try to send admin email with customer email as sender
    const adminMailOptions = {
      from:`${data?.name} <${data?.email}>`,
      replyTo: data?.email,
      to:EMAIL,
      subject: `${data?.name} <${data?.email}> | ${EMAIL}`,
      html: instantTemplate(quoteData)
    };

    try {
      await transporter.sendMail(adminMailOptions);
      console.log('Admin email sent successfully with customer email as sender');
    } catch (error) {
      console.error('Error sending admin email with customer email:', error);
      console.error('Error code:', error.code, 'Response code:', error.responseCode);
      
      // If sending with customer email fails (EENVELOPE, 553, EAUTH, 535), use fallback
      if (error.code === 'EENVELOPE' || error.code === 'EAUTH' || 
          error.responseCode === 553 || error.responseCode === 535) {
        try {
          const fallbackAdminMailOptions = {
            from: `${data?.name} via Umbrella <${EMAIL}>`,
            replyTo: `${data?.name} <${data?.email}>`,
            to: EMAIL,
            subject: `${data?.name} <${data?.email}> | ${EMAIL}`,
            html: instantTemplate(quoteData)
          };
          await transporter.sendMail(fallbackAdminMailOptions);
          console.log('Admin email sent with fallback method (authenticated email)');
        } catch (fallbackError) {
          console.error('Fallback email also failed:', fallbackError);
        }
      }
    }

    res.status(201).json({
      status: "success",
      message: "Request Quote created successfully and confirmation email sent!",
      data: newInstantQuote,
    });
  } catch (error) {
    if (req.files?.image) {
      fs.unlinkSync(path.join(__dirname, '..', req.files.image[0].path));
    }
    return next(error);
  }
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
    return res.status(404).json({
      status: "fail",
      message: "Request quote not found"
    });
  }

  try {
    let updateData = { ...data };

    // Handle image update if new image is provided
    if (req.files?.image) {
      // Delete old image if it exists
      if (existingInstantQuote.image) {
        const oldImagePath = path.join(
          __dirname,
          '..',
          'public',
          existingInstantQuote.image.replace(process.env.BASEURL, '')
        );

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Add new image path
      updateData.image = `images/${req.files.image[0].filename}`.replace(/\\/g, '/');
    }

    const updatedInstantQuote = await InstantQuote.findByIdAndUpdate(
      InstantQuoteId,
      updateData,
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: updatedInstantQuote,
      message: "Request Quote updated successfully!",
    });
  } catch (error) {
    // Clean up uploaded file if error occurs
    if (req.files?.image) {
      fs.unlinkSync(path.join(__dirname, '..', req.files.image[0].path));
    }
    return next(error);
  }
});


export const getAllInstantQuote = catchAsyncError(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const blogs = await InstantQuote.aggregate([
      { $sort: { createdAt: -1 } },
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


// Test IP Detection
export const testIPDetection = catchAsyncError(async (req, res, next) => {
  const { getClientIP } = await import('../utils/ipDetection.js');
  const clientIp = getClientIP(req);

  console.log('Client IP in controller:', clientIp);

  res.status(200).json({
    status: "success",
    message: "IP Detection Test",
    clientIP: clientIp,
    headers: {
      'x-forwarded-for': req.headers['x-forwarded-for'],
      'x-real-ip': req.headers['x-real-ip'],
      'x-client-ip': req.headers['x-client-ip'],
      'user-agent': req.headers['user-agent']
    }
  });
});






