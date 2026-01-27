import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { ContactUs } from "../model/ContactUs.js";
// contact us create

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { detect } from 'detect-browser';
import { getClientIP } from "../utils/ipDetection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const create = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  
  try {
    let imagePath = null;
    
    // Handle optional image upload
    if (req.files && req.files.image && req.files.image[0]) {
      imagePath = `images/${req.files.image[0].filename}`.replace(/\\/g, '/');
    }

    // Get client IP
    const clientIp = getClientIP(req);

    // Detect browser/device info
    const browserInfo = detect(req.headers['user-agent']);
    const deviceInfo = browserInfo
      ? `${browserInfo.name} ${browserInfo.version} on ${browserInfo.os}`
      : 'Unknown device';

    // Get pageUrl from request body or referer header
    const pageUrl = data?.pageUrl || req.headers.referer || req.headers.origin || '';

    const contactData = {
      image: imagePath || '',
      name: data?.name || '',
      email: data?.email || '',
      phoneNumber: data?.phoneNumber || '',
      companyName: data?.companyName || '',
      message: data?.message || '',
      pageUrl: pageUrl,
      device: deviceInfo,
      ip: clientIp || '',
    };

    const newContact = await ContactUs.create(contactData);

    res.status(200).json({
      status: "success",
      message: "Your request has been sent to our team successfully",
      data: newContact,
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    return next(error);
  }
});



 


// Get All Contact
export const getAllContact = catchAsyncError(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const searchQuery = req.query.search || '';

    // Build filter for search
    const filter = {};
    if (searchQuery) {
      filter.$or = [
        { name: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } },
        { phoneNumber: { $regex: searchQuery, $options: 'i' } },
        { companyName: { $regex: searchQuery, $options: 'i' } },
        { message: { $regex: searchQuery, $options: 'i' } },
      ];
    }

    const [contacts, totalContacts] = await Promise.all([
      ContactUs.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      ContactUs.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalContacts / limit);

    res.status(200).json({
      status: "success",
      data: contacts,
      totalPages: totalPages,
      currentPage: page,
      totalContacts: totalContacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error",
    });
  }
});
// delet Contact us
export const deleteContactById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const delContact = await ContactUs.findByIdAndDelete(id);
    if (!delContact) {
      return res.json({ status: "fail", message: "Contact us not Found" });
    }
    res.json({
      status: "success",
      message: "User deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};




