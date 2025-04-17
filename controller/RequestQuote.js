import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { RequestQuote } from "../model/RequestQuote.js";
import cloudinary from "cloudinary";
import nodemailer from 'nodemailer';
cloudinary.v2.config({
  cloud_name: "ddu4sybue",
  api_key: "658491673268817",
  api_secret: "w35Ei6uCvbOcaN4moWBKL3BmW4Q",
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

  const emailTemplate = `
  <!DOCTYPE html>
  <html>
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
  @media (max-width: 600px) {
      a {
          font-size: 12px;
          overflow:hidden;
      }
    .mainContainer{
     padding:25px !important
    }
  }
  </style>
  </head>
  <body style="font-family: 'Arial', sans-serif; color: #333333; line-height: 1.7; padding: 20px; background-color: #f4f4f4; margin: 0;">
      <div class="mainContainer" style="max-width: 600px; margin: 0 auto; padding: 40px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
          <!-- Logo Section -->
          <div style="text-align: center; margin-bottom: 30px;">
              <a href="https://old.umbrellapackaging.com" target="_blank">
                  <img src="https://99de0d612a.imgdist.com/public/users/Integrators/BeeProAgency/1039128_1024229/Umbrella-packaging-final-logo-png.png" alt="Umbrella Packaging" title="Umbrella Packaging" style="width: 200px; max-width: 100%; display: block; margin: 0 auto;">
              </a>
          </div>
  
          <!-- Greeting Section -->
          <h1 style="font-size: 24px; font-weight: bold; color: #2a2e7b; text-align: center; margin: 0 0 20px;">Dear ${data?.name}</h1>
          
          <!-- Introductory Message -->
          <p style="font-size: 16px; text-align: center; color: #555555; margin: 0 0 30px;">
              Thank you for sharing the order details with us! We are currently reviewing your request and will provide the best price quote within the next <strong>45 minutes</strong>.
          </p>
  
          <!-- Main Content Section -->
          <div style="padding: 30px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); margin-bottom: 30px;">
              <p style="font-size: 16px; color: #333333; margin: 0 0 10px;">
                  We greatly appreciate the opportunity to serve your packaging needs. In the meantime, if you have any urgent inquiries, feel free to contact us using the information below.
              </p>
  
              <!-- Contact Info Section -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
                  <!-- Left Column -->
                  <div style="text-align: left; flex: 1;">
                      <p style="margin: 0; font-weight: bold;">Best regards,</p>
                      <p style="margin: 0;">Manager Sales<br><span style="color: #2a2e7b;">Umbrella Custom Packaging</span></p>
                  </div>
                  <!-- Right Column (Contact Details) -->
                  <div style="text-align: right; flex: 1;">
                      <p style="margin: 0;"><a href="https://umbrellapackaging.com/" style="text-decoration: none; color: #0076a8; font-weight: bold;">www.umbrellapackaging.com</a></p>
                      <p style="margin: 0;"><a href="tel:+17472470456" style="text-decoration: none; color: #0076a8; font-weight: bold;">+1-747-247-0456</a></p>
                  </div>
              </div>
          </div>
  
          <!-- Social Media Links Section -->
          <div style="text-align: center; margin-bottom: 20px;">
              <table style="display: inline-block;">
                  <tr>
                      <td style="padding: 0 10px;">
                          <a href="https://www.facebook.com/Umbrella-Custom-Packaging-102088152747218/" target="_blank">
                              <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/facebook@2x.png" alt="Facebook" style="width: 30px; height: 30px;">
                          </a>
                      </td>
                      <td style="padding: 0 10px;">
                          <a href="https://twitter.com/umbrellapack" target="_blank">
                              <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/twitter@2x.png" alt="Twitter" style="width: 30px; height: 30px;">
                          </a>
                      </td>
                      <td style="padding: 0 10px;">
                          <a href="https://www.linkedin.com/in/umbrella-custom-packaging-2a3b60257/" target="_blank">
                              <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/linkedin@2x.png" alt="LinkedIn" style="width: 30px; height: 30px;">
                          </a>
                      </td>
                      <td style="padding: 0 10px;">
                          <a href="https://www.instagram.com/umbrellacustompackaging/" target="_blank">
                              <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/instagram@2x.png" alt="Instagram" style="width: 30px; height: 30px;">
                          </a>
                      </td>
                      <td style="padding: 0 10px;">
                          <a href="https://www.pinterest.com/UmbrellaCustomPackaging/" target="_blank">
                              <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/pinterest@2x.png" alt="Pinterest" style="width: 30px; height: 30px;">
                          </a>
                      </td>
                  </tr>
              </table>
          </div>
  
          <!-- Footer Section -->
          <p style="text-align: center; font-size: 14px; color: #888888;">
              For further inquiries, please contact us at <a href="mailto:inquiry@umbrellapackaging.com" style="text-decoration: underline; color: #0076a8;">inquiry@umbrellapackaging.com</a>
          </p>
      </div>
  
      <!-- Responsive Design Media Queries -->
      <style>
          @media only screen and (max-width: 600px) {
              body {
                  padding: 10px;
              }
              div {
                  padding: 20px;
              }
              h1 {
                  font-size: 20px;
              }
              p {
                  font-size: 14px;
              }
              table {
                  display: block;
                  width: 100%;
              }
          }
      </style>
  </body>
  </html>
  `;

  
     

    console.log(data);
    
  const mailOptions = {
    from: 'gm6681328@gmail.com',
    to: data?.email,
    subject: 'Thank You for Your Quote Request - Umbrella Packaging',
    html: emailTemplate
  };
  try {
    await transporter.sendMail(mailOptions);
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






