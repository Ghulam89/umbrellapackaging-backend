import express from "express";
import { connectDB } from "./config/database.js";
const app = express();
import ErrorMiddleware from "./middleware/Error.js";
// import fileupload from "express-fileupload";
import cors from "cors";
import bannerRouter from "./routes/bannerRoute.js";
import ContactusRouter from "./routes/contactusrouter.js";
import blogRouter from "./routes/blogRouter.js";
import FaqRouter from "./routes/FaqRouter.js";
import adminRoute from "./routes/AdminRouter.js";
import subcategoryRouter from "./routes/SubCategory.js";
import productRouter from "./routes/ProductRouter.js";
import brandRouter from "./routes/BrandRouter.js";
import http from "http";
import checkoutRouter from "./routes/CheckoutRouter.js";
import userRoute from "./routes/userRoute.js";
import categoryRouter from "./routes/MidCategoryRouter.js";
import ratingRoute from "./routes/RatingRouter.js";
import subscribeRouter from "./routes/SubscribeRouter.js";
import requestQuoteRouter from "./routes/RequestQuote.js";
import instantQuoteRouter from "./routes/InstantQuote.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();
app.use(express.static("static"));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.use(
//   fileupload({
//     useTempFiles: true,
//   })
// ); 
// const stripeApp = express.Router();

// stripeApp.use(express.raw({ type: '*/*' }));

// app.use('/webhook', stripeApp);

// const endpointSecret = 'whsec_KGJdlt9dNEYmAZH0bUIPrlZWZycOBgi6';

// stripeApp.post('/', express.raw({ type: 'application/json' }), async (request, response) => {
//     const sig = request.headers['stripe-signature'];

//     try {
//         let event;

//         try {
//             event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//         } catch (err) {
//             console.log(err, 'page index line 66');
//             response.status(400).send(`Webhook Error: ${err.message}`);
//             return;
//         }

//         // Handle the event
//         switch (event.type) {
//             case 'payment_intent.succeeded':
//                 try {
//                     const paymentIntentSucceeded = event.data.object;
//                     console.log(paymentIntentSucceeded);

//                     // Update to use Checkout model instead of Order
//                     const checkout = await Checkout.findOneAndUpdate(
//                         { paymentIntentId: paymentIntentSucceeded.id },
//                         { $set: { 
//                             paymentStatus: 'Completed',
//                             status: 'approved' // Also update the status to approved
//                         }},
//                         { new: true }
//                     );

//                     if (!checkout) {
//                         console.log('Checkout not found for paymentIntentId:', paymentIntentSucceeded.id);
//                     }

//                 } catch (error) {
//                     console.error('Error handling payment_intent.succeeded event:', error);
//                 }
//                 break;
                
//             case 'charge.refunded':
//                 try {
//                     const paymentIntentSucceeded = event.data.object;
//                     console.log(paymentIntentSucceeded);

//                     const checkout = await Checkout.findOneAndUpdate(
//                         { paymentIntentId: paymentIntentSucceeded.id },
//                         { $set: { paymentStatus: 'Refunded' }},
//                         { new: true }
//                     );

//                     if (!checkout) {
//                         console.log('Checkout not found for paymentIntentId:', paymentIntentSucceeded.id);
//                     }

//                 } catch (error) {
//                     console.error('Error handling charge.refunded event:', error);
//                 }
//                 break;
                
//             case 'charge.refund.updated':
//                 try {
//                     const paymentIntentSucceeded = event.data.object;
//                     console.log(paymentIntentSucceeded);

//                     const checkout = await Checkout.findOneAndUpdate(
//                         { paymentIntentId: paymentIntentSucceeded.payment_intent },
//                         { $set: { paymentStatus: 'Refunded' }},
//                         { new: true }
//                     );

//                     if (!checkout) {
//                         console.log('Checkout not found for paymentIntentId:', paymentIntentSucceeded.payment_intent);
//                     }

//                 } catch (error) {
//                     console.error('Error handling charge.refund.updated event:', error);
//                 }
//                 break;

          
//             default:
//                 console.log(`Unhandled event type ${event.type}`);
//         }

       
//         response.send();
//     } catch (err) {
//         console.log(err, 'page index line 137');
//         response.status(400).send(`Error: ${err.message}`);
//         return;
//     }
// });



// const payPalApp = express.Router();

// payPalApp.use(express.raw({ type: '*/*' }))
// payPalApp.use(cors())

// app.use('/paypal/webhook', payPalApp)

 

// // Your webhook ID from PayPal Developer Dashboard
// const WEBHOOK_ID = '7YD26673TL2297534';
// // PayPal API base URL (use sandbox for testing)
// const PAYPAL_API_URL = 'https://api-m.paypal.com'; // Change to https://api-m.paypal.com for production

// // Function to verify webhook signature
// async function verifyWebhookSignature(headers, body, webhookId) {
//     try {
//         // Get authentication token
//         const auth = await getPayPalAccessToken();

//         // Parse the raw body into a JSON object
//         const webhookEvent = JSON.parse(body);

//         // Create verification payload
//         const verificationPayload = {
//             auth_algo: headers['paypal-auth-algo'],
//             cert_url: headers['paypal-cert-url'],
//             transmission_id: headers['paypal-transmission-id'],
//             transmission_sig: headers['paypal-transmission-sig'],
//             transmission_time: headers['paypal-transmission-time'],
//             webhook_id: webhookId,
//             webhook_event: webhookEvent // Pass the parsed JSON object, not the raw string
//         };

//         // Log the payload for debugging
//         console.log('Verification payload:', verificationPayload);

//         // Send verification request to PayPal using fetch
//         const response = await fetch(`${PAYPAL_API_URL}/v1/notifications/verify-webhook-signature`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${auth.access_token}`
//             },
//             body: JSON.stringify(verificationPayload)
//         });

//         // Parse response as JSON
//         const responseData = await response.json();

//         // Log the response for debugging
//         console.log('Verification response:', responseData);

//         // Return true if verification is successful
//         return responseData.verification_status === 'SUCCESS';
//     } catch (error) {
//         console.error('Webhook verification error:', error.message);
//         return false;
//     }
// }


// // Function to get PayPal access token
// async function getPayPalAccessToken() {
//     const clientId = 'AaiAjek2ug7UzUcX5mP4GKDsJKZaGSbmn0kHFehtED8KW4ANIc3MM_EwgV1upOlK8D7zPe8L_ypWfYmp';
// const clientSecret = 'EGX_HDNFE1U_gs0m54pS5F2sOrvRcjk734G20e-C6yZUwpjgVF5RBgRwNCmq9xdYTrxaV8sed60LBsX1';
//     try {
//         const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`)
//             },
//             body: 'grant_type=client_credentials'
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error('Error getting PayPal access token:', error.message);
//         throw error;
//     }
// }





// // Webhook endpoint for PayPal events
// payPalApp.post('/', async (req, res) => {
//     try {
//       console.log('Received headers:', req.headers);
//       const body = req.body.toString('utf8');
//       console.log('Received body:', body);
  
//       const isVerified = await verifyWebhookSignature(req.headers, body, WEBHOOK_ID);
//       console.log('Verification status:', isVerified);
  
//       if (!isVerified) {
//         console.error('Webhook signature verification failed');
//         return res.status(401).send('Webhook signature verification failed');
//       }
  
//       const event = JSON.parse(body);
//       const eventType = event.event_type;
      
//       console.log('Received verified PayPal webhook event:', eventType);
      
//       switch (eventType) {
//         case 'PAYMENT.CAPTURE.COMPLETED':
//           // Handle successful payment
//           const paymentId = event.resource.id;
//           const amount = event.resource.amount.value;
//           console.log(`Payment completed! ID: ${paymentId}, Amount: ${amount}`);
//           // Update your database, fulfill the order, etc.
 

//         //   const data = await Order.findOne({
//         //     where: { payPalId: paymentId  }
//         // })


//         // await Order.update({ paymentStatus:'Completed' }, {
//         //     where: { id: data.id }
//         // }
//         // )

 


//           break;
//         case 'CHECKOUT.ORDER.APPROVED':
//           // Handle successful payment
//           const paymenttId = event.resource.id;
//         //   const amountt = event.resource.amount.value;
//           console.log(`Payment completed! ID: ${paymenttId},`);
//           // Update your database, fulfill the order, etc.
 

//           const data = await Order.findOne({
//             where: { payPalId: paymenttId  }
//         })


//         await Order.update({ paymentStatus:'Completed' }, {
//             where: { id: data.id }
//         }
//         )

 


//           break;
          
//         case 'PAYMENT.REFUND.COMPLETED':
//           // Handle completed refund
//           const refundId = event.resource.id;
//           const refundAmount = event.resource.amount.value;
//           console.log(`Refund completed! ID: ${refundId}, Amount: ${refundAmount}`);
//           // Update your database, notify customer, etc.
//           break;
          
//         default:
//           console.log('Unhandled event type:', eventType);
//       }
      
//       // Return a 200 response to acknowledge receipt of the event
//       res.status(200).send('Webhook received and verified successfully');
//     } catch (error) {
//       console.error('Error processing webhook:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   });




const server = http.createServer(app);
app.use("/brands", brandRouter);
app.use("/user", userRoute);
app.use("/banner", bannerRouter);
app.use("/contactus", ContactusRouter);
app.use("/blog", blogRouter);
app.use("/faq", FaqRouter);
app.use("/admin", adminRoute);
app.use("/category", categoryRouter);
app.use("/subcategory", subcategoryRouter);
app.use("/products", productRouter);
app.use("/checkout", checkoutRouter);
app.use("/rating", ratingRoute);
app.use("/subscribe", subscribeRouter);
app.use("/requestQuote", requestQuoteRouter);
app.use("/instantQuote", instantQuoteRouter);


// app.get("/apis", async (req, res) => {
//   res.send("App Is Running");
// });


//  sdsdsds
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in dev  mode`);
});

app.use(ErrorMiddleware);
