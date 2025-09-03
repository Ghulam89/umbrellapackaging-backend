import express from "express";
import { connectDB } from "./config/database.js";
import ErrorMiddleware from "./middleware/Error.js";
import cors from "cors";
import bannerRouter from "./routes/bannerRoute.js";
import ContactusRouter from "./routes/contactusrouter.js";
import blogRouter from "./routes/blogRouter.js";
import FaqRouter from "./routes/FaqRouter.js";
import adminRoute from "./routes/AdminRouter.js";
import subcategoryRouter from "./routes/SubCategory.js";
import productRouter from "./routes/ProductRouter.js";
import brandRouter from "./routes/BrandRouter.js";
import checkoutRouter from "./routes/CheckoutRouter.js";
import userRoute from "./routes/userRoute.js";
import categoryRouter from "./routes/MidCategoryRouter.js";
import ratingRoute from "./routes/RatingRouter.js";
import subscribeRouter from "./routes/SubscribeRouter.js";
import requestQuoteRouter from "./routes/RequestQuote.js";
import instantQuoteRouter from "./routes/InstantQuote.js";
import sitemapRouter from "./routes/sitemapRouter.js";
import path from 'path';
import REDIS  from  './redis_APIS/redis.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SSR/Frontend imports
import fs from 'node:fs/promises';

// Connect to database
connectDB();
const app = express();
app.use(express.static("static"));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Backend API routes
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
app.use("/", sitemapRouter);

// Simple API test route
app.get("/apis", async (req, res) => {
  res.send("App Is Running backend!");
});



// ================= URL Redirects =================
// Category redirects
app.get('/box-by-industry/', (req, res) => res.redirect(301, '/category/box-by-industry'));
app.get('/shapes-styles/', (req, res) => res.redirect(301, '/category/shapes-styles'));
app.get('/boxes-by-material/', (req, res) => res.redirect(301, '/category/boxes-by-material'));
app.get('/custom-labels-and-stickers/', (req, res) => res.redirect(301, '/category/custom-labels-and-stickers'));

// Sub-category redirects
app.get('/fashion-apparel-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/fashion-apparel-packaging-boxes'));
app.get('/custom-auto-lock-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-auto-lock-boxes'));
app.get('/automotive-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/automotive-packaging-boxes'));
app.get('/bakery-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/bakery-packaging-boxes'));
app.get('/beverage-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/beverage-packaging-boxes'));
app.get('/custom-bookend-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-bookend-boxes'));
app.get('/custom-burger-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-burger-boxes'));
app.get('/custom-bux-board-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-bux-board-boxes'));
app.get('/custom-cake-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-cake-boxes'));
app.get('/candle-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/candle-packaging-boxes'));
app.get('/candy-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/candy-packaging-boxes'));
app.get('/custom-cardboard-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-cardboard-boxes'));
app.get('/cbd-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/cbd-packaging-boxes'));
app.get('/cereal-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/cereal-packaging-boxes'));
app.get('/custom-child-resistant-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-child-resistant-boxes'));
app.get('/chocolate-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/chocolate-packaging-boxes'));
app.get('/custom-cigarette-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-cigarette-boxes'));
app.get('/custom-coated-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-coated-boxes'));
app.get('/coffee-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/coffee-packaging-boxes'));
app.get('/custom-corrugated-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-corrugated-boxes'));
app.get('/cosmetics-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/cosmetics-packaging-boxes'));
app.get('/custom-blister-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-blister-boxes'));
app.get('/custom-bottle-neckers/', (req, res) => res.redirect(301, '/sub-category/custom-bottle-neckers'));
app.get('/custom-packaging-brochures/', (req, res) => res.redirect(301, '/sub-category/custom-packaging-brochures'));
app.get('/custom-display-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-display-packaging-boxes'));
app.get('/custom-envelopes/', (req, res) => res.redirect(301, '/sub-category/custom-envelopes'));
app.get('/custom-foil-packaging/', (req, res) => res.redirect(301, '/sub-category/custom-foil-packaging'));
app.get('/custom-hang-tags/', (req, res) => res.redirect(301, '/sub-category/custom-hang-tags'));
app.get('/custom-insert-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-insert-boxes'));
app.get('/custom-note-pads/', (req, res) => res.redirect(301, '/sub-category/custom-note-pads'));
app.get('/custom-paper-cups/', (req, res) => res.redirect(301, '/sub-category/custom-paper-cups'));
app.get('/custom-round-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-round-boxes'));
app.get('/custom-table-tents/', (req, res) => res.redirect(301, '/sub-category/custom-table-tents'));
app.get('/custom-trays-packaging/', (req, res) => res.redirect(301, '/sub-category/custom-trays-packaging'));
app.get('/custom-dispenser-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-dispenser-boxes'));
app.get('/display-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/display-packaging-boxes'));
app.get('/custom-drawer-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-drawer-boxes'));
app.get('/e-commerce-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/e-commerce-packaging-boxes'));
app.get('/electronics-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/electronics-packaging-boxes'));
app.get('/custom-face-mask-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-face-mask-boxes'));
app.get('/food-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/food-packaging-boxes'));
app.get('/fragrance-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/fragrance-packaging-boxes'));
app.get('/custom-fries-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-fries-boxes'));
app.get('/custom-gable-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-gable-boxes'));
app.get('/game-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/game-packaging-boxes'));
app.get('/gift-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/gift-packaging-boxes'));
app.get('/custom-gloves-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-gloves-boxes'));
app.get('/custom-hang-tab-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-hang-tab-boxes'));
app.get('/health-care-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/health-care-packaging-boxes'));
app.get('/custom-heart-shaped-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-heart-shaped-boxes'));
app.get('/custom-hexagonal-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-hexagonal-boxes'));
app.get('/holiday-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/holiday-packaging-boxes'));
app.get('/jewelry-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/jewelry-packaging-boxes'));
app.get('/kraft-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/kraft-packaging-boxes'));
app.get('/custom-laminated-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-laminated-boxes'));
app.get('/custom-linen-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-linen-boxes'));
app.get('/liquor-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/liquor-packaging-boxes'));
app.get('/custom-magnetic-closure-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-magnetic-closure-boxes'));
app.get('/custom-mailer-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-mailer-packaging-boxes'));
app.get('/match-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/match-packaging-boxes'));
app.get('/mylar-bags-packaging/', (req, res) => res.redirect(301, '/sub-category/mylar-bags-packaging'));
app.get('/custom-paper-bags/', (req, res) => res.redirect(301, '/sub-category/custom-paper-bags'));
app.get('/pet-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/pet-packaging-boxes'));
app.get('/custom-pillow-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-pillow-boxes'));
app.get('/pizza-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/pizza-packaging-boxes'));
app.get('/custom-popcorn-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-popcorn-boxes'));
app.get('/pre-roll-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/pre-roll-packaging-boxes'));
app.get('/presentation-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/presentation-packaging-boxes'));
app.get('/custom-pyramid-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-pyramid-boxes'));
app.get('/retail-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/retail-packaging-boxes'));
app.get('/custom-rigid-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-rigid-boxes'));
app.get('/shipping-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/shipping-packaging-boxes'));
app.get('/custom-shoe-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-shoe-boxes'));
app.get('/custom-sleeve-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-sleeve-boxes'));
app.get('/soap-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/soap-packaging-boxes'));
app.get('/stationery-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/stationery-packaging-boxes'));
app.get('/sticker-labels-others/', (req, res) => res.redirect(301, '/sub-category/sticker-labels-others'));
app.get('/subscription-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/subscription-packaging-boxes'));
app.get('/custom-suitcase-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-suitcase-boxes'));
app.get('/custom-takeout-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-takeout-boxes'));
app.get('/tea-packaging-boxes/', (req, res) => res.redirect(301, '/sub-category/tea-packaging-boxes'));
app.get('/custom-textured-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-textured-boxes'));
app.get('/custom-triangular-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-triangular-boxes'));
app.get('/custom-tuck-end-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-tuck-end-boxes'));
app.get('/custom-two-piece-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-two-piece-boxes'));
app.get('/custom-window-boxes/', (req, res) => res.redirect(301, '/sub-category/custom-window-boxes'));

// Blog redirects
app.get('/varnish-coating-in-packaging-printing/', (req, res) => res.redirect(301, '/blog/varnish-coating-in-packaging-printing'));
app.get('/what-is-corrugated-packaging/', (req, res) => res.redirect(301, '/blog/what-is-corrugated-packaging'));
app.get('/what-is-spot-uv-printing/', (req, res) => res.redirect(301, '/blog/what-is-spot-uv-printing'));
app.get('/soft-touch-coating-vs-soft-touch-lamination/', (req, res) => res.redirect(301, '/blog/soft-touch-coating-vs-soft-touch-lamination'));
app.get('/how-to-measure-box-dimensions/', (req, res) => res.redirect(301, '/blog/how-to-measure-box-dimensions'));
app.get('/digital-vs-offset-printing-for-packaging/', (req, res) => res.redirect(301, '/blog/digital-vs-offset-printing-for-packaging'));
app.get('/how-to-seal-mylar-bags/', (req, res) => res.redirect(301, '/blog/how-to-seal-mylar-bags'));
app.get('/what-is-cosmetic-packaging/', (req, res) => res.redirect(301, '/blog/what-is-cosmetic-packaging'));
app.get('/what-is-foil-stamping/', (req, res) => res.redirect(301, '/blog/what-is-foil-stamping'));
app.get('/how-to-make-candle-boxes/', (req, res) => res.redirect(301, '/blog/how-to-make-candle-boxes'));
app.get('/what-is-hemp-packaging/', (req, res) => res.redirect(301, '/blog/what-is-hemp-packaging'));
app.get('/what-is-kraft-paper-made-of/', (req, res) => res.redirect(301, '/blog/what-is-kraft-paper-made-of'));
app.get('/box-templates/', (req, res) => res.redirect(301, '/blog/box-templates'));
app.get('/process-of-making-soap-packaging-boxes/', (req, res) => res.redirect(301, '/blog/process-of-making-soap-packaging-boxes'));
app.get('/what-is-uv-coating-in-printing/', (req, res) => res.redirect(301, '/blog/what-is-uv-coating-in-printing'));
app.get('/manufacturers-cardboard-boxes/', (req, res) => res.redirect(301, '/blog/manufacturers-cardboard-boxes'));
app.get('/everything-about-cereal-box-packaging/', (req, res) => res.redirect(301, '/blog/everything-about-cereal-box-packaging'));
app.get('/understanding-carton-packaging/', (req, res) => res.redirect(301, '/blog/understanding-carton-packaging'));
app.get('/die-cutting-in-printing/', (req, res) => res.redirect(301, '/blog/die-cutting-in-printing'));
app.get('/christmas-eve-box/', (req, res) => res.redirect(301, '/blog/christmas-eve-box'));
app.get('/what-is-cmyk-in-printing/', (req, res) => res.redirect(301, '/blog/what-is-cmyk-in-printing'));
app.get('/difference-between-embossed-and-debossed/', (req, res) => res.redirect(301, '/blog/difference-between-embossed-and-debossed'));
app.get('/what-is-pr-packaging/', (req, res) => res.redirect(301, '/blog/what-is-pr-packaging'));
app.get('/how-much-is-a-quarter-of-weed/', (req, res) => res.redirect(301, '/blog/how-much-is-a-quarter-of-weed'));
app.get('/frustration-free-packaging/', (req, res) => res.redirect(301, '/blog/frustration-free-packaging'));
app.get('/choosing-the-right-packaging-material/', (req, res) => res.redirect(301, '/blog/choosing-the-right-packaging-material'));
app.get('/what-is-aqueous-coating-in-packaging-printing/', (req, res) => res.redirect(301, '/blog/what-is-aqueous-coating-in-packaging-printing'));
app.get('/what-are-packaging-inserts/', (req, res) => res.redirect(301, '/blog/what-are-packaging-inserts'));
app.get('/discreet-packaging/', (req, res) => res.redirect(301, '/blog/discreet-packaging'));
app.get('/standard-mylar-bag-thicknesses/', (req, res) => res.redirect(301, '/blog/standard-mylar-bag-thicknesses'));
app.get('/gloss-vs-matte-lamination/', (req, res) => res.redirect(301, '/blog/gloss-vs-matte-lamination'));
app.get('/how-many-cigarettes-in-a-pack/', (req, res) => res.redirect(301, '/blog/how-many-cigarettes-in-a-pack'));

// Old URL redirects
app.get('/boxes-by-style/other-styles/fries-boxes/french-fry-boxes/', (req, res) => res.redirect(301, '/french-fries-boxes/'));
app.get('/boxes-by-style/major-styles/magnetic-closure-boxes/magnetic-closure-boxes-with-inserts/', (req, res) => res.redirect(301, '/magnetic-closure-boxes-with-inserts/'));
app.get('/boxes-by-industry/cbd/cigar-boxes/', (req, res) => res.redirect(301, '/cigar-boxes/'));
app.get('/boxes-by-style/major-styles/cigarette-boxes/', (req, res) => res.redirect(301, '/cigarette-boxes/'));
app.get('/boxes-by-industry/food-boxes/chocolate-boxes/', (req, res) => res.redirect(301, '/chocolate-boxes/'));
app.get('/boxes-by-industry/cosmetic-boxes/lipstick-boxes/', (req, res) => res.redirect(301, '/lipstick-boxes/'));
app.get('/boxes-by-industry/cosmetic-boxes/shampoo-boxes/', (req, res) => res.redirect(301, '/shampoo-boxes/'));
app.get('/boxes-by-industry/cbd/vape-pen-boxes/', (req, res) => res.redirect(301, '/vape-pen-boxes/'));
app.get('/boxes-by-industry/cbd/cannabis-seed-boxes/', (req, res) => res.redirect(301, '/cannabis-seed-boxes/'));
app.get('/boxes-by-style/other-styles/fries-boxes/', (req, res) => res.redirect(301, '/fries-boxes/'));
app.get('/boxes-by-industry/cosmetic-boxes/eyelash-boxes/', (req, res) => res.redirect(301, '/eyelash-boxes/'));
app.get('/boxes-by-material/laminated-boxes/matte-laminated-boxes/', (req, res) => res.redirect(301, '/matte-laminated-boxes/'));
app.get('/boxes-by-style/major-styles/magnetic-closure-boxes/', (req, res) => res.redirect(301, '/magnetic-closure-boxes/'));
app.get('/boxes-by-industry/cake-boxes/window-cake-boxes/', (req, res) => res.redirect(301, '/window-cake-boxes/'));
app.get('/boxes-by-material/custom-foil-boxes/gold-foil-boxes/', (req, res) => res.redirect(301, '/gold-foil-boxes/'));
app.get('/boxes-by-material/laminated-boxes/soft-touch-laminated-boxes/', (req, res) => res.redirect(301, '/soft-touch-laminated-boxes/'));
app.get('/boxes-by-style/two-piece-boxes/cardboard-two-piece-boxes/', (req, res) => res.redirect(301, '/cardboard-two-piece-boxes/'));
app.get('/boxes-by-style/other-styles/paper-bags/kraft-paper-bags/', (req, res) => res.redirect(301, '/kraft-paper-bags/'));
app.get('/boxes-by-style/other-styles/gloves-boxes/surgical-gloves-boxes/', (req, res) => res.redirect(301, '/surgical-gloves-boxes/'));
app.get('/boxes-by-material/custom-cardboard-boxes/offset-printed-cardboard-boxes/', (req, res) => res.redirect(301, '/offset-printed-cardboard-boxes/'));
app.get('/boxes-by-industry/cosmetic-boxes/perfume-boxes/luxury-perfume-boxes/', (req, res) => res.redirect(301, '/luxury-perfume-boxes/'));
app.get('/boxes-by-industry/cosmetic-boxes/soap-boxes/pillow-soap-boxes/', (req, res) => res.redirect(301, '/pillow-soap-boxes/'));
app.get('/boxes-by-style/other-styles/shoe-boxes/window-shoe-boxes/', (req, res) => res.redirect(301, '/window-shoe-boxes/'));
app.get('/boxes-by-industry/cosmetic-boxes/soap-boxes/holster-soap-boxes/', (req, res) => res.redirect(301, '/holster-soap-boxes/'));
app.get('/boxes-by-style/major-styles/display-boxes/counter-display-boxes/', (req, res) => res.redirect(301, '/counter-display-boxes/'));
app.get('/boxes-by-style/major-styles/tuck-end-boxes/reverse-tuck-boxes/', (req, res) => res.redirect(301, '/reverse-tuck-boxes/'));
app.get('/boxes-by-style/other-styles/child-resistant-boxes/rigid-child-resistant-boxes/', (req, res) => res.redirect(301, '/rigid-child-resistant-boxes/'));
app.get('/boxes-by-material/custom-cardboard-boxes/', (req, res) => res.redirect(301, '/custom-cardboard-boxes/'));
app.get('/boxes-by-industry/other/pillow-boxes/', (req, res) => res.redirect(301, '/custom-pillow-boxes/'));
app.get('/boxes-by-style/other-styles/triangular-boxes/', (req, res) => res.redirect(301, '/custom-triangular-boxes/'));
app.get('/boxes-by-style/major-styles/mailer-boxes/', (req, res) => res.redirect(301, '/custom-mailer-packaging-boxes/'));
app.get('/boxes-by-style/other-styles/window-boxes/', (req, res) => res.redirect(301, '/custom-window-boxes/'));
app.get('/boxes-by-industry/food-boxes/bakery-box/', (req, res) => res.redirect(301, '/bakery-packaging-boxes/'));
app.get('/boxes-by-style/other-styles/gable-boxes/', (req, res) => res.redirect(301, '/custom-gable-boxes/'));
app.get('/boxes-by-style/major-styles/tuck-end-boxes/', (req, res) => res.redirect(301, '/custom-tuck-end-boxes/'));
app.get('/boxes-by-material/linen-boxes/black-linen-box/', (req, res) => res.redirect(301, '/black-linen-boxes/'));
app.get('/boxes-by-style/major-styles/hang-tab-boxes/', (req, res) => res.redirect(301, '/custom-hang-tab-boxes/'));
app.get('/boxes-by-industry/cosmetic-boxes/custom-subscription-boxes/', (req, res) => res.redirect(301, '/subscription-packaging-boxes/'));
app.get('/boxes-by-style/other-styles/auto-lock-boxes/', (req, res) => res.redirect(301, '/custom-auto-lock-boxes/'));
app.get('/boxes-by-style/other-styles/heart-shaped-boxes/', (req, res) => res.redirect(301, '/custom-heart-shaped-boxes/'));
app.get('/boxes-by-style/other-styles/child-resistant-boxes/', (req, res) => res.redirect(301, '/custom-child-resistant-boxes/'));
app.get('/boxes-by-material/kraft-boxes/kraft-box-with-window/', (req, res) => res.redirect(301, '/window-kraft-boxes/'));
app.get('/boxes-by-material/corrugated-boxes/b-flute-corrugated-boxes/', (req, res) => res.redirect(301, '/b-flute-corrugated-boxes/'));
app.get('/boxes-by-material/rigid-boxes/drawer-rigid-boxes/', (req, res) => res.redirect(301, '/drawer-rigid-boxes/'));
app.get('/boxes-by-industry/cosmetic-boxes/mascara-boxes/', (req, res) => res.redirect(301, '/mascara-boxes/'));
app.get('/boxes-by-style/custom-cake-boxes/window-cake-boxes/', (req, res) => res.redirect(301, '/window-cake-boxes/'));
app.get('/boxes-by-style/other-styles/bookend-boxes/custom-bookend-boxes/', (req, res) => res.redirect(301, '/custom-bookend-boxes/'));
app.get('/boxes-by-style/other-styles/suitcase-boxes/custom-suitcase-boxes/', (req, res) => res.redirect(301, '/custom-suitcase-boxes/'));
app.get('/boxes-by-industry/cbd/tincture-oil-boxes/custom-tincture-oil-boxes/', (req, res) => res.redirect(301, '/tincture-oil-boxes/'));
app.get('/boxes-by-style/other-styles/gloves-boxes/latex-gloves-boxes/', (req, res) => res.redirect(301, '/latex-gloves-boxes/'));
app.get('/boxes-by-style/other-styles/burger-boxes/custom-burger-boxes/', (req, res) => res.redirect(301, '/custom-burger-boxes/'));
app.get('/boxes-by-style/other-styles/shoe-boxes/custom-shoe-boxes/', (req, res) => res.redirect(301, '/custom-shoe-boxes/'));
app.get('/boxes-by-style/major-styles/display-boxes/pre-roll-display-boxes/', (req, res) => res.redirect(301, '/pre-roll-display-boxes/'));
app.get('/boxes-by-industry/cbd/vape-cartridge-boxes/', (req, res) => res.redirect(301, '/vape-cartridge-boxes/'));
app.get('/boxes-by-material/corrugated-boxes/e-flute-corrugated-boxes/', (req, res) => res.redirect(301, '/e-flute-corrugated-boxes/'));
app.get('/boxes-by-material/bux-board-boxes/', (req, res) => res.redirect(301, '/bux-board-boxes/'));
app.get('/boxes-by-material/uv-coated-boxes/spot-uv-boxes/', (req, res) => res.redirect(301, '/spot-uv-boxes/'));
app.get('/magnetic-closure-boxes/foldable-magnetic-closure-boxes/', (req, res) => res.redirect(301, '/foldable-magnetic-closure-boxes/'));
app.get('/custom-mailer-packaging-boxes/custom-mailer-boxes/', (req, res) => res.redirect(301, '/custom-mailer-boxes/'));
app.get('/boxes-by-industry/cbd/cigarette-boxes/', (req, res) => res.redirect(301, '/cigarette-boxes/'));
app.get('/boxes-by-style/other-styles/popcorn-boxes/', (req, res) => res.redirect(301, '/popcorn-boxes/'));
app.get('/boxes-by-style/two-piece-boxes/custom-cake-boxes/window-bakery-boxes/', (req, res) => res.redirect(301, '/window-bakery-boxes/'));
app.get('/boxes-by-industry/cosmetic-boxes/serum-boxes/', (req, res) => res.redirect(301, '/serum-boxes/'));
app.get('/boxes-by-material/rigid-boxes/magnetic-closure-boxes/', (req, res) => res.redirect(301, '/magnetic-closure-boxes/'));
app.get('/boxes-by-style/other-styles/burger-boxes/window-burger-boxes/', (req, res) => res.redirect(301, '/window-burger-boxes/'));
app.get('/boxes-by-style/other-styles/burger-boxes/', (req, res) => res.redirect(301, '/burger-boxes/'));
app.get('/boxes-by-industry/cosmetic-boxes/cream-boxes/', (req, res) => res.redirect(301, '/cream-boxes/'));
app.get('/cream-boxes/lotion-boxes/', (req, res) => res.redirect(301, '/lotion-boxes/'));
app.get('/boxes-by-industry/cbd/cbd-oil-boxes/', (req, res) => res.redirect(301, '/cbd-oil-boxes/'));
app.get('/custom-tuck-end-boxes/seal-end-boxes/', (req, res) => res.redirect(301, '/seal-end-boxes/'));
app.get('/boxes-by-industry/cbd/Vape-Cartridge-Boxes/', (req, res) => res.redirect(301, '/Vape-Cartridge-Boxes/'));
app.get('/boxes-by-style/other-styles/shoe-boxes/', (req, res) => res.redirect(301, '/shoe-boxes/'));
app.get('/boxes-by-industry/food-boxes/burger-boxes/', (req, res) => res.redirect(301, '/burger-boxes/'));
app.get('/soap-packaging/', (req, res) => res.redirect(301, '/process-of-making-soap-packaging-boxes/'));

// Error middleware for APIs
app.use(ErrorMiddleware);

// ================= SSR/Frontend optimization =================
const isProduction = process.env.NODE_ENV === 'production';
const base = process.env.BASE || '/';

// Cache for production template and render function
let productionTemplate = '';
let productionRender = null;
let vite = null;

// Preload production assets in production mode
if (isProduction) {
  try {
    const templatePath = path.join(__dirname, '../frontend/dist/client/index.html');
    const serverEntryPath = path.join(__dirname, '../frontend/dist/server/entry-server.js');
    
    // Load assets in parallel
    const [template, serverModule] = await Promise.all([
      fs.readFile(templatePath, 'utf-8'),
      import(serverEntryPath)
    ]);
    
    productionTemplate = template;
    productionRender = serverModule.render;
    
    console.log('Production assets preloaded successfully');
  } catch (error) {
    console.error('Failed to preload production assets:', error);
    // Don't crash the server, but log the error
  }
} else {
  // Development mode - use Vite
  try {
    const { createServer } = await import('vite');
    vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base,
      root: path.join(__dirname, '../frontend'),
    });
    app.use(vite.middlewares);
  } catch (error) {
    console.error('Failed to start Vite:', error);
  }
}

// In production, serve static files with caching headers
if (isProduction) {
  try {
    const compression = (await import('compression')).default;
    const sirv = (await import('sirv')).default;
    app.use(compression());
    app.use(base, sirv(path.join(__dirname, '../frontend/dist/client'), {
      extensions: [],
      maxAge: 31536000, // 1 year
      immutable: true
    }));
  } catch (error) {
    console.error('Failed to set up static file serving:', error);
  }
}

// Cache for rendered pages with LRU strategy
const ssrCache = new Map();
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes cache
const MAX_CACHE_SIZE = 100; // Limit cache size to prevent memory issues

// Function to generate cache key from request
function getCacheKey(req) {
  return req.originalUrl;
}

// Function to clean up cache periodically
function cleanCache() {
  const now = Date.now();
  for (const [key, value] of ssrCache.entries()) {
    if (value.expiry < now) {
      ssrCache.delete(key);
    }
  }
  
  // Enforce size limit
  if (ssrCache.size > MAX_CACHE_SIZE) {
    const entries = Array.from(ssrCache.entries());
    // Remove oldest entries (first in the array)
    for (let i = 0; i < entries.length - MAX_CACHE_SIZE; i++) {
      ssrCache.delete(entries[i][0]);
    }
  }
}

// Run cleanup every minute
setInterval(cleanCache, 60000);

// SSR middleware with caching and timeout (must be last)
app.use('*', async (req, res, next) => {
  const startTime = Date.now();
  const url = req.originalUrl.replace(base, '') || '/';
  
  // Skip SSR for API routes and static files
  if (url.startsWith('/api/') || 
      url.startsWith('/_vite') || 
      url.includes('.') && !url.endsWith('/')) {
    return next();
  }
  
  // Check cache first
  const cacheKey = getCacheKey(req);
  const cached = ssrCache.get(cacheKey);
  
  if (cached && cached.expiry > Date.now()) {
    res.set(cached.headers).status(200).send(cached.html);
    console.log(`SSR Cache hit for ${url}: ${Date.now() - startTime}ms`);
    return;
  }
  
  let template, render;
  let rendered = { html: '', helmet: {}, serverData: {} };
  
  try {
    if (!isProduction && vite) {
      // Development mode
      try {
        template = await fs.readFile(
          path.join(__dirname, '../frontend/index.html'), 
          'utf-8'
        );
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
      } catch (error) {
        console.error('Vite development error:', error);
        return sendErrorResponse(res, 'Development server error');
      }
    } else if (isProduction && productionTemplate && productionRender) {
      // Production mode
      template = productionTemplate;
      render = productionRender;
    } else {
      // Server not ready
      return sendErrorResponse(res, 'Server not ready yet');
    }
    
    // Set timeout for SSR rendering (max 4 seconds)
    const renderPromise = render(url);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('SSR timeout')), 4000)
    );
    
    // Race between render and timeout
    rendered = await Promise.race([renderPromise, timeoutPromise]);
    
    const html = template
      .replace(
        '<!--app-head-->',
        `\n${rendered.helmet?.title || ''}\n${rendered.helmet?.meta || ''}\n${rendered.helmet?.link || ''}\n${rendered.helmet?.script || ''}\n`
      )
      .replace('<!--app-html-->', rendered.html || '')
      .replace(
        '<!--server-data-->', 
        `<script>window.__SERVER_DATA__ = ${JSON.stringify(rendered.serverData || {})}</script>`
      );
    
    // Cache successful responses
    if (isProduction && res.statusCode === 200) {
      ssrCache.set(cacheKey, {
        html,
        headers: { 'Content-Type': 'text/html' },
        expiry: Date.now() + CACHE_TTL
      });
    }
    
    res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    console.log(`SSR completed for ${url}: ${Date.now() - startTime}ms`);
    
  } catch (e) {
    if (e.message === 'SSR timeout') {
      console.error(`SSR timeout for ${url}: ${Date.now() - startTime}ms`);
      
      if (template) {
        const fallbackHtml = template
          .replace('<!--app-head-->', '')
          .replace('<!--app-html-->', '<div id="app"></div>')
          .replace('<!--server-data-->', '<script>window.__SERVER_DATA__ = {}</script>');
        
        res.status(200).set({ 'Content-Type': 'text/html' }).send(fallbackHtml);
      } else {
        sendErrorResponse(res, 'SSR timeout and no template available');
      }
    } else {
      console.error('SSR Error:', e.stack);
      sendErrorResponse(res, 'Server rendering error');
    }
  }
});

function sendErrorResponse(res, message) {
  res.status(500).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Error</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          h1 { color: #d32f2f; }
        </style>
      </head>
      <body>
        <h1>Something went wrong</h1>
        <p>${message}</p>
        <p>Please try again later.</p>
      </body>
    </html>
  `);
}


app.use("/redis", REDIS.REDIS);


// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT} in ${isProduction ? 'production' : 'development'} mode`);
});