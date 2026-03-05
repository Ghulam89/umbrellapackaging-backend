import express from "express";
import cluster from "cluster";
import os from "os";
import { connectDB } from "./config/database.js";
import ErrorMiddleware from "./middleware/Error.js";
import cors from "cors";
import NodeCache from "node-cache";
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
import { apiCacheMiddleware } from "./middleware/cacheMiddleware.js";
import compression from "compression";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from 'node:fs/promises';
import fsSync from 'fs';
import helmet from 'helmet';
import { strictCreateLimiter } from "./middleware/rateLimit.js";

const numCPUs = os.cpus().length;
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction && cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  console.log(`Forking server for ${numCPUs} CPUs`);

  // Fork workers based on CPU cores
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker exit and restart
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
    console.log('Starting a new worker');
    cluster.fork();
  });

  // Log worker online events
  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

} else {

   // Worker process - this is where your Express app runs
  console.log(`Worker ${process.pid} started`);


// Connect to database
connectDB();
const app = express();
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(express.static("static", { maxAge: isProduction ? '30d' : 0, etag: true }));
app.use('/images', express.static(path.join(__dirname, 'images'), { maxAge: isProduction ? '30d' : 0, etag: true }));

// Middleware
const allowedOrigins = new Set([
  'http://localhost:3000',
  'http://localhost:5174',
  'http://31.97.14.21:3000',
  'https://umbrellapackaging.com'
]);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true
}));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.use(apiCacheMiddleware);

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
app.use("/requestQuote", strictCreateLimiter, requestQuoteRouter);
app.use("/instantQuote", strictCreateLimiter, instantQuoteRouter);
app.use("/", sitemapRouter);

// Simple API test route
app.get("/apis", async (req, res) => {
  res.send("App Is Running backend!");
});



// ================= URL Redirects =================
const redirects = [
  ['/box-by-industry/', '/category/box-by-industry'],
  ['/shapes-styles/', '/category/shapes-styles'],
  ['/boxes-by-material/', '/category/boxes-by-material'],
  ['/custom-labels-and-stickers/', '/category/custom-labels-and-stickers'],
  ['/fashion-apparel-packaging-boxes/', '/sub-category/fashion-apparel-packaging-boxes'],
  ['/custom-auto-lock-boxes/', '/sub-category/custom-auto-lock-boxes'],
  ['/automotive-packaging-boxes/', '/sub-category/automotive-packaging-boxes'],
  ['/bakery-packaging-boxes/', '/sub-category/bakery-packaging-boxes'],
  ['/beverage-packaging-boxes/', '/sub-category/beverage-packaging-boxes'],
  ['/custom-bookend-boxes/', '/sub-category/custom-bookend-boxes'],
  ['/custom-burger-boxes/', '/sub-category/custom-burger-boxes'],
  ['/custom-bux-board-boxes/', '/sub-category/custom-bux-board-boxes'],
  ['/custom-cake-boxes/', '/sub-category/custom-cake-boxes'],
  ['/candle-packaging-boxes/', '/sub-category/candle-packaging-boxes'],
  ['/candy-packaging-boxes/', '/sub-category/candy-packaging-boxes'],
  ['/custom-cardboard-boxes/', '/sub-category/custom-cardboard-boxes'],
  ['/cbd-packaging-boxes/', '/sub-category/cbd-packaging-boxes'],
  ['/cereal-packaging-boxes/', '/sub-category/cereal-packaging-boxes'],
  ['/custom-child-resistant-boxes/', '/sub-category/custom-child-resistant-boxes'],
  ['/chocolate-packaging-boxes/', '/sub-category/chocolate-packaging-boxes'],
  ['/custom-cigarette-boxes/', '/sub-category/custom-cigarette-boxes'],
  ['/custom-coated-boxes/', '/sub-category/custom-coated-boxes'],
  ['/coffee-packaging-boxes/', '/sub-category/coffee-packaging-boxes'],
  ['/custom-corrugated-boxes/', '/sub-category/custom-corrugated-boxes'],
  ['/cosmetics-packaging-boxes/', '/sub-category/cosmetics-packaging-boxes'],
  ['/custom-blister-boxes/', '/sub-category/custom-blister-boxes'],
  ['/custom-bottle-neckers/', '/sub-category/custom-bottle-neckers'],
  ['/custom-packaging-brochures/', '/sub-category/custom-packaging-brochures'],
  ['/custom-display-packaging-boxes/', '/sub-category/custom-display-packaging-boxes'],
  ['/custom-envelopes/', '/sub-category/custom-envelopes'],
  ['/custom-foil-packaging/', '/sub-category/custom-foil-packaging'],
  ['/custom-hang-tags/', '/sub-category/custom-hang-tags'],
  ['/custom-insert-boxes/', '/sub-category/custom-insert-boxes'],
  ['/custom-note-pads/', '/sub-category/custom-note-pads'],
  ['/custom-paper-cups/', '/sub-category/custom-paper-cups'],
  ['/custom-round-boxes/', '/sub-category/custom-round-boxes'],
  ['/custom-table-tents/', '/sub-category/custom-table-tents'],
  ['/custom-trays-packaging/', '/sub-category/custom-trays-packaging'],
  ['/custom-dispenser-boxes/', '/sub-category/custom-dispenser-boxes'],
  ['/display-packaging-boxes/', '/sub-category/display-packaging-boxes'],
  ['/custom-drawer-boxes/', '/sub-category/custom-drawer-boxes'],
  ['/e-commerce-packaging-boxes/', '/sub-category/e-commerce-packaging-boxes'],
  ['/electronics-packaging-boxes/', '/sub-category/electronics-packaging-boxes'],
  ['/custom-face-mask-boxes/', '/sub-category/custom-face-mask-boxes'],
  ['/food-packaging-boxes/', '/sub-category/food-packaging-boxes'],
  ['/fragrance-packaging-boxes/', '/sub-category/fragrance-packaging-boxes'],
  ['/custom-fries-boxes/', '/sub-category/custom-fries-boxes'],
  ['/custom-gable-boxes/', '/sub-category/custom-gable-boxes'],
  ['/game-packaging-boxes/', '/sub-category/game-packaging-boxes'],
  ['/gift-packaging-boxes/', '/sub-category/gift-packaging-boxes'],
  ['/custom-gloves-boxes/', '/sub-category/custom-gloves-boxes'],
  ['/custom-hang-tab-boxes/', '/sub-category/custom-hang-tab-boxes'],
  ['/health-care-packaging-boxes/', '/sub-category/health-care-packaging-boxes'],
  ['/custom-heart-shaped-boxes/', '/sub-category/custom-heart-shaped-boxes'],
  ['/custom-hexagonal-boxes/', '/sub-category/custom-hexagonal-boxes'],
  ['/holiday-packaging-boxes/', '/sub-category/holiday-packaging-boxes'],
  ['/jewelry-packaging-boxes/', '/sub-category/jewelry-packaging-boxes'],
  ['/kraft-packaging-boxes/', '/sub-category/kraft-packaging-boxes'],
  ['/custom-laminated-boxes/', '/sub-category/custom-laminated-boxes'],
  ['/custom-linen-boxes/', '/sub-category/custom-linen-boxes'],
  ['/liquor-packaging-boxes/', '/sub-category/liquor-packaging-boxes'],
  ['/custom-magnetic-closure-boxes/', '/sub-category/custom-magnetic-closure-boxes'],
  ['/custom-mailer-packaging-boxes/', '/sub-category/custom-mailer-packaging-boxes'],
  ['/match-packaging-boxes/', '/sub-category/match-packaging-boxes'],
  ['/mylar-bags-packaging/', '/sub-category/mylar-bags-packaging'],
  ['/custom-paper-bags/', '/sub-category/custom-paper-bags'],
  ['/pet-packaging-boxes/', '/sub-category/pet-packaging-boxes'],
  ['/custom-pillow-boxes/', '/sub-category/custom-pillow-boxes'],
  ['/pizza-packaging-boxes/', '/sub-category/pizza-packaging-boxes'],
  ['/custom-popcorn-boxes/', '/sub-category/custom-popcorn-boxes'],
  ['/pre-roll-packaging-boxes/', '/sub-category/pre-roll-packaging-boxes'],
  ['/presentation-packaging-boxes/', '/sub-category/presentation-packaging-boxes'],
  ['/custom-pyramid-boxes/', '/sub-category/custom-pyramid-boxes'],
  ['/retail-packaging-boxes/', '/sub-category/retail-packaging-boxes'],
  ['/custom-rigid-boxes/', '/sub-category/custom-rigid-boxes'],
  ['/shipping-packaging-boxes/', '/sub-category/shipping-packaging-boxes'],
  ['/custom-shoe-boxes/', '/sub-category/custom-shoe-boxes'],
  ['/custom-sleeve-boxes/', '/sub-category/custom-sleeve-boxes'],
  ['/soap-packaging-boxes/', '/sub-category/soap-packaging-boxes'],
  ['/stationery-packaging-boxes/', '/sub-category/stationery-packaging-boxes'],
  ['/sticker-labels-others/', '/sub-category/sticker-labels-others'],
  ['/subscription-packaging-boxes/', '/sub-category/subscription-packaging-boxes'],
  ['/custom-suitcase-boxes/', '/sub-category/custom-suitcase-boxes'],
  ['/custom-takeout-boxes/', '/sub-category/custom-takeout-boxes'],
  ['/tea-packaging-boxes/', '/sub-category/tea-packaging-boxes'],
  ['/custom-textured-boxes/', '/sub-category/custom-textured-boxes'],
  ['/custom-triangular-boxes/', '/sub-category/custom-triangular-boxes'],
  ['/custom-tuck-end-boxes/', '/sub-category/custom-tuck-end-boxes'],
  ['/custom-two-piece-boxes/', '/sub-category/custom-two-piece-boxes'],
  ['/custom-window-boxes/', '/sub-category/custom-window-boxes'],
  ['/varnish-coating-in-packaging-printing/', '/blog/varnish-coating-in-packaging-printing'],
  ['/what-is-corrugated-packaging/', '/blog/what-is-corrugated-packaging'],
  ['/what-is-spot-uv-printing/', '/blog/what-is-spot-uv-printing'],
  ['/soft-touch-coating-vs-soft-touch-lamination/', '/blog/soft-touch-coating-vs-soft-touch-lamination'],
  ['/how-to-measure-box-dimensions/', '/blog/how-to-measure-box-dimensions'],
  ['/digital-vs-offset-printing-for-packaging/', '/blog/digital-vs-offset-printing-for-packaging'],
  ['/how-to-seal-mylar-bags/', '/blog/how-to-seal-mylar-bags'],
  ['/what-is-cosmetic-packaging/', '/blog/what-is-cosmetic-packaging'],
  ['/what-is-foil-stamping/', '/blog/what-is-foil-stamping'],
  ['/how-to-make-candle-boxes/', '/blog/how-to-make-candle-boxes'],
  ['/what-is-hemp-packaging/', '/blog/what-is-hemp-packaging'],
  ['/what-is-kraft-paper-made-of/', '/blog/what-is-kraft-paper-made-of'],
  ['/box-templates/', '/blog/box-templates'],
  ['/process-of-making-soap-packaging-boxes/', '/blog/process-of-making-soap-packaging-boxes'],
  ['/what-is-uv-coating-in-printing/', '/blog/what-is-uv-coating-in-printing'],
  ['/manufacturers-cardboard-boxes/', '/blog/manufacturers-cardboard-boxes'],
  ['/everything-about-cereal-box-packaging/', '/blog/everything-about-cereal-box-packaging'],
  ['/understanding-carton-packaging/', '/blog/understanding-carton-packaging'],
  ['/die-cutting-in-printing/', '/blog/die-cutting-in-printing'],
  ['/christmas-eve-box/', '/blog/christmas-eve-box'],
  ['/what-is-cmyk-in-printing/', '/blog/what-is-cmyk-in-printing'],
  ['/difference-between-embossed-and-debossed/', '/blog/difference-between-embossed-and-debossed'],
  ['/what-is-pr-packaging/', '/blog/what-is-pr-packaging'],
  ['/how-much-is-a-quarter-of-weed/', '/blog/how-much-is-a-quarter-of-weed'],
  ['/frustration-free-packaging/', '/blog/frustration-free-packaging'],
  ['/choosing-the-right-packaging-material/', '/blog/choosing-the-right-packaging-material'],
  ['/what-is-aqueous-coating-in-packaging-printing/', '/blog/what-is-aqueous-coating-in-packaging-printing'],
  ['/what-are-packaging-inserts/', '/blog/what-are-packaging-inserts'],
  ['/discreet-packaging/', '/blog/discreet-packaging'],
  ['/standard-mylar-bag-thicknesses/', '/blog/standard-mylar-bag-thicknesses'],
  ['/gloss-vs-matte-lamination/', '/blog/gloss-vs-matte-lamination'],
  ['/how-many-cigarettes-in-a-pack/', '/blog/how-many-cigarettes-in-a-pack'],
  ['/boxes-by-style/other-styles/fries-boxes/french-fry-boxes/', '/french-fries-boxes'],
  ['/boxes-by-style/major-styles/magnetic-closure-boxes/magnetic-closure-boxes-with-inserts', '/magnetic-closure-boxes-with-inserts/'],
  ['/boxes-by-industry/cbd/cigar-boxes/', '/cigar-boxes/'],
  ['/boxes-by-style/major-styles/cigarette-boxes/', '/cigarette-boxes'],
  ['/boxes-by-industry/food-boxes/chocolate-boxes/', '/chocolate-boxes'],
  ['/boxes-by-industry/cosmetic-boxes/lipstick-boxes/', '/lipstick-boxes'],
  ['/boxes-by-industry/cosmetic-boxes/shampoo-boxes/', '/shampoo-boxes'],
  ['/boxes-by-industry/cbd/vape-pen-boxes/', '/vape-pen-boxes'],
  ['/boxes-by-industry/cbd/cannabis-seed-boxes/', '/cannabis-seed-boxes'],
  ['/boxes-by-style/other-styles/fries-boxes/', '/fries-boxes'],
  ['/boxes-by-industry/cosmetic-boxes/eyelash-boxes/', '/eyelash-boxes'],
  ['/boxes-by-material/laminated-boxes/matte-laminated-boxes/', '/matte-laminated-boxes'],
  ['/boxes-by-style/major-styles/magnetic-closure-boxes/', '/magnetic-closure-boxes'],
  ['/boxes-by-industry/cake-boxes/window-cake-boxes/', '/window-cake-boxes'],
  ['/boxes-by-material/custom-foil-boxes/gold-foil-boxes/', '/gold-foil-boxes'],
  ['/boxes-by-material/laminated-boxes/soft-touch-laminated-boxes/', '/soft-touch-laminated-boxes'],
  ['/boxes-by-style/two-piece-boxes/cardboard-two-piece-boxes/', '/cardboard-two-piece-boxes'],
  ['/boxes-by-style/other-styles/paper-bags/kraft-paper-bags/', '/kraft-paper-bags'],
  ['/boxes-by-style/other-styles/gloves-boxes/surgical-gloves-boxes/', '/surgical-gloves-boxes'],
  ['/boxes-by-material/custom-cardboard-boxes/offset-printed-cardboard-boxes/', '/offset-printed-cardboard-boxes'],
  ['/boxes-by-industry/cosmetic-boxes/perfume-boxes/luxury-perfume-boxes/', '/luxury-perfume-boxes'],
  ['/boxes-by-industry/cosmetic-boxes/soap-boxes/pillow-soap-boxes/', '/pillow-soap-boxes'],
  ['/boxes-by-style/other-styles/shoe-boxes/window-shoe-boxes/', '/window-shoe-boxes'],
  ['/boxes-by-industry/cosmetic-boxes/soap-boxes/holster-soap-boxes/', '/holster-soap-boxes'],
  ['/boxes-by-style/major-styles/display-boxes/counter-display-boxes/', '/counter-display-boxes'],
  ['/boxes-by-style/major-styles/tuck-end-boxes/reverse-tuck-boxes/', '/reverse-tuck-boxes']
];
redirects.forEach(([from, to]) => {
  app.get(from, (req, res) => res.redirect(301, to));
});
app.get('/boxes-by-style/other-styles/child-resistant-boxes/rigid-child-resistant-boxes/', (req, res) => res.redirect(301, '/rigid-child-resistant-boxes'));
app.get('/boxes-by-material/custom-cardboard-boxes/', (req, res) => res.redirect(301, '/custom-cardboard-boxes'));
app.get('/boxes-by-industry/other/pillow-boxes/', (req, res) => res.redirect(301, '/custom-pillow-boxes'));
app.get('/boxes-by-style/other-styles/triangular-boxes/', (req, res) => res.redirect(301, '/custom-triangular-boxes'));
app.get('/boxes-by-style/major-styles/mailer-boxes/', (req, res) => res.redirect(301, '/custom-mailer-packaging-boxes'));
app.get('/boxes-by-style/other-styles/window-boxes/', (req, res) => res.redirect(301, '/custom-window-boxes'));
app.get('/boxes-by-industry/food-boxes/bakery-box/', (req, res) => res.redirect(301, '/bakery-packaging-boxes'));
app.get('/boxes-by-style/other-styles/gable-boxes/', (req, res) => res.redirect(301, '/custom-gable-boxes'));
app.get('/boxes-by-style/major-styles/tuck-end-boxes/', (req, res) => res.redirect(301, '/custom-tuck-end-boxes'));
app.get('/boxes-by-material/linen-boxes/black-linen-box/', (req, res) => res.redirect(301, '/black-linen-boxes'));
app.get('/boxes-by-style/major-styles/hang-tab-boxes/', (req, res) => res.redirect(301, '/custom-hang-tab-boxes'));
app.get('/boxes-by-industry/cosmetic-boxes/custom-subscription-boxes/', (req, res) => res.redirect(301, '/subscription-packaging-boxes'));
app.get('/boxes-by-style/other-styles/auto-lock-boxes/', (req, res) => res.redirect(301, '/custom-auto-lock-boxes'));
app.get('/boxes-by-style/other-styles/heart-shaped-boxes/', (req, res) => res.redirect(301, '/custom-heart-shaped-boxes'));
app.get('/boxes-by-style/other-styles/child-resistant-boxes/', (req, res) => res.redirect(301, '/custom-child-resistant-boxes'));
app.get('/boxes-by-material/kraft-boxes/kraft-box-with-window/', (req, res) => res.redirect(301, '/window-kraft-boxes'));
app.get('/boxes-by-material/corrugated-boxes/b-flute-corrugated-boxes/', (req, res) => res.redirect(301, '/b-flute-corrugated-boxes'));
app.get('/boxes-by-material/rigid-boxes/drawer-rigid-boxes/', (req, res) => res.redirect(301, '/drawer-rigid-boxes'));
app.get('/boxes-by-industry/cosmetic-boxes/mascara-boxes/', (req, res) => res.redirect(301, '/mascara-boxes'));
app.get('/boxes-by-style/custom-cake-boxes/window-cake-boxes/', (req, res) => res.redirect(301, '/window-cake-boxes'));
app.get('/boxes-by-style/other-styles/bookend-boxes/custom-bookend-boxes/', (req, res) => res.redirect(301, '/custom-bookend-boxes'));
app.get('/boxes-by-style/other-styles/suitcase-boxes/custom-suitcase-boxes/', (req, res) => res.redirect(301, '/custom-suitcase-boxes'));
app.get('/boxes-by-industry/cbd/tincture-oil-boxes/custom-tincture-oil-boxes/', (req, res) => res.redirect(301, '/tincture-oil-boxes'));
app.get('/boxes-by-style/other-styles/gloves-boxes/latex-gloves-boxes/', (req, res) => res.redirect(301, '/latex-gloves-boxes'));
app.get('/boxes-by-style/other-styles/burger-boxes/custom-burger-boxes/', (req, res) => res.redirect(301, '/custom-burger-boxes'));
app.get('/boxes-by-style/other-styles/shoe-boxes/custom-shoe-boxes/', (req, res) => res.redirect(301, '/custom-shoe-boxes'));
app.get('/boxes-by-style/major-styles/display-boxes/pre-roll-display-boxes/', (req, res) => res.redirect(301, '/pre-roll-display-boxes'));
app.get('/boxes-by-industry/cbd/vape-cartridge-boxes/', (req, res) => res.redirect(301, '/vape-cartridge-boxes'));
app.get('/boxes-by-material/corrugated-boxes/e-flute-corrugated-boxes/', (req, res) => res.redirect(301, '/e-flute-corrugated-boxes'));
app.get('/boxes-by-material/bux-board-boxes/', (req, res) => res.redirect(301, '/bux-board-boxes'));
app.get('/boxes-by-material/uv-coated-boxes/spot-uv-boxes/', (req, res) => res.redirect(301, '/spot-uv-boxes'));
app.get('/magnetic-closure-boxes/foldable-magnetic-closure-boxes/', (req, res) => res.redirect(301, '/foldable-magnetic-closure-boxes'));
app.get('/custom-mailer-packaging-boxes/custom-mailer-boxes/', (req, res) => res.redirect(301, '/custom-mailer-boxes'));
app.get('/boxes-by-industry/cbd/cigarette-boxes/', (req, res) => res.redirect(301, '/cigarette-boxes'));
app.get('/boxes-by-style/other-styles/popcorn-boxes/', (req, res) => res.redirect(301, '/popcorn-boxes'));
app.get('/boxes-by-style/two-piece-boxes/custom-cake-boxes/window-bakery-boxes/', (req, res) => res.redirect(301, '/window-bakery-boxes'));
app.get('/boxes-by-industry/cosmetic-boxes/serum-boxes/', (req, res) => res.redirect(301, '/serum-boxes'));
app.get('/boxes-by-material/rigid-boxes/magnetic-closure-boxes/', (req, res) => res.redirect(301, '/magnetic-closure-boxes'));
app.get('/boxes-by-style/other-styles/burger-boxes/window-burger-boxes/', (req, res) => res.redirect(301, '/window-burger-boxes'));
app.get('/boxes-by-style/other-styles/burger-boxes/', (req, res) => res.redirect(301, '/burger-boxes'));
app.get('/boxes-by-industry/cosmetic-boxes/cream-boxes/', (req, res) => res.redirect(301, '/cream-boxes'));
app.get('/cream-boxes/lotion-boxes/', (req, res) => res.redirect(301, '/lotion-boxes'));
app.get('/boxes-by-industry/cbd/cbd-oil-boxes/', (req, res) => res.redirect(301, '/cbd-oil-boxes'));
app.get('/custom-tuck-end-boxes/seal-end-boxes/', (req, res) => res.redirect(301, '/seal-end-boxes'));
app.get('/boxes-by-industry/cbd/Vape-Cartridge-Boxes/', (req, res) => res.redirect(301, '/Vape-Cartridge-Boxes'));
app.get('/boxes-by-style/other-styles/shoe-boxes/', (req, res) => res.redirect(301, '/shoe-boxes'));
app.get('/boxes-by-industry/food-boxes/burger-boxes/', (req, res) => res.redirect(301, '/burger-boxes'));
app.get('/soap-packaging/', (req, res) => res.redirect(301, '/process-of-making-soap-packaging-boxes'));

// Error middleware for APIs
app.use(ErrorMiddleware);

// ================= SSR/Frontend optimization =================
const base = process.env.BASE || '/';

// Cache for production template and render function
let productionTemplate = '';
let productionRender = null;
let vite = null;
const projectRoot = fsSync.existsSync(path.join(__dirname, '../frontend')) ? path.join(__dirname, '..') : path.join(__dirname, '..', '..');

// Preload production assets in production mode
if (isProduction) {
  try {
    const templatePath = path.join(projectRoot, 'frontend/dist/client/index.html');
    const serverEntryPath = path.join(projectRoot, 'frontend/dist/server/entry-server.js');
    
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
  // Development mode - use Vite with no-cache headers
  try {
    const { createServer } = await import('vite');
    vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base,
      root: path.join(projectRoot, 'frontend'),
    });
    
    // Add no-cache headers for development mode to prevent browser caching
    app.use((req, res, next) => {
      if (!isProduction) {
        // Prevent caching of all resources in development
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.setHeader('Surrogate-Control', 'no-store');
      }
      next();
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
    app.use(base, sirv(path.join(projectRoot, 'frontend/dist/client'), {
      extensions: [],
      maxAge: 31536000, // 1 year
      immutable: true
    }));
  } catch (error) {
    console.error('Failed to set up static file serving:', error);
  }
}

// SSR cache using node-cache with stale-while-revalidate strategy
const SSR_FRESH_TTL = parseInt(process.env.SSR_FRESH_TTL || '120', 10);
const SSR_STALE_TTL = parseInt(process.env.SSR_STALE_TTL || '600', 10);
const ssrCache = new NodeCache({
  stdTTL: SSR_STALE_TTL,
  useClones: false,
  checkperiod: Math.max(60, Math.floor(SSR_STALE_TTL / 2)),
});

// Function to generate cache key from request
function getCacheKey(req) {
  const u = req.originalUrl || req.url || '/';
  return u.split('?')[0];
}

function getSsrTTL(req) {
  const p = req.path || req.originalUrl || '';
  if (p === '/' || p === '') {
    return parseInt(process.env.SSR_HOME_TTL || '60', 10);
  }
  if (p.startsWith('/sub-category/')) {
    return parseInt(process.env.SSR_SUBCATEGORY_TTL || '300', 10);
  }
  if (p.startsWith('/category/')) {
    return parseInt(process.env.SSR_CATEGORY_TTL || '300', 10);
  }
  if (p.startsWith('/blog/')) {
    return parseInt(process.env.SSR_BLOG_TTL || '180', 10);
  }
  return parseInt(process.env.SSR_CACHE_TTL || '120', 10);
}

app.use('*', async (req, res, next) => {
  const startTime = Date.now();
  const url = req.originalUrl;
  if (url === '/undefined') {
    return res.redirect(302, '/404');
  }
  const ssrTtl = getSsrTTL(req);
  const segs = url.split('/').filter(Boolean);
  const isProductLike = (segs.length === 1 && url !== '/');
  const fastRoute = (url === '/' || url.startsWith('/sub-category/') || url.startsWith('/category/') || url.startsWith('/blog/') || isProductLike);
  
  if (url.startsWith('/api/') || 
      url.startsWith('/_vite') || 
      url.includes('.')) {
    return next();
  }

  if (url.length > 1 && url.endsWith('/')) {
    const newUrl = url.slice(0, -1);
    return res.redirect(301, newUrl);
  }
  // Check cache first (serve stale while revalidating)
  const cacheKey = getCacheKey(req);
  const cached = ssrCache.get(cacheKey);
  
  if (cached) {
    const isFresh = (Date.now() - (cached.cachedAt || 0)) <= (SSR_FRESH_TTL * 1000);
    const headers = {
      'Content-Type': 'text/html',
      'Cache-Control': `public, max-age=${SSR_FRESH_TTL}, stale-while-revalidate=${Math.max(SSR_STALE_TTL - SSR_FRESH_TTL, 0)}`
    };
    res.set(headers);
    res.set('X-SSR-Route', (url === '/' ? 'home' : (url.startsWith('/category/') ? 'category' : (url.startsWith('/sub-category/') ? 'subcategory' : (url.startsWith('/blog/') ? 'blog' : 'product')))));
    res.set('X-SSR-Cache', isFresh ? 'HIT' : 'STALE');
    res.set('X-SSR-Cache-TTL', String(ssrTtl));
    res.status(200).send(cached.html);
    console.log(`SSR Cache ${isFresh ? 'hit' : 'stale'} for ${url}: ${Date.now() - startTime}ms`);
    return;
  }
  
  let template, render;
  let rendered = { html: '', helmet: {}, serverData: {} };
  let renderPromise;
  
  try {
    if (!isProduction && vite) {
      // Development mode
      try {
        template = await fs.readFile(
          path.join(__dirname, '../frontend/index.html'), 
          'utf-8'
        );
        
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('../frontend/src/entry-server.jsx')).render;
      } catch (error) {
        console.error('Vite development error:', error);
        
      }
    } else if (isProduction && productionTemplate && productionRender) {
      // Production mode
      template = productionTemplate;
      render = productionRender;
    } else {
     
    }
    
    renderPromise = render(url);
    const timeoutMs = 8000;
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('SSR timeout')), timeoutMs)
    );
    
    // Race between render and timeout
    rendered = await Promise.race([renderPromise, timeoutPromise]);
    
    const origin = `${req.protocol}://${req.get('host')}`;
    const segs2 = (url || '').split('/').filter(Boolean);
    const slugGuess = segs2[segs2.length - 1] || '';
    const humanize = (s) => s.replace(/-/g, ' ').replace(/\s+/g, ' ').trim().replace(/\b\w/g, c => c.toUpperCase());
    const defaultTitle =
      url === '/' ? 'Umbrella Custom Packaging' :
      url.startsWith('/category/') ? `${humanize(slugGuess)} | Umbrella Custom Packaging` :
      url.startsWith('/sub-category/') ? `${humanize(slugGuess)} | Umbrella Custom Packaging` :
      url.startsWith('/blog/') ? `${humanize(slugGuess)} | Umbrella Custom Packaging` :
      `${humanize(slugGuess)} | Umbrella Custom Packaging`;
    const defaultCanonical = `${origin}${url}`;
    const defaultHead = [
      `<title>${defaultTitle}</title>`,
      `<meta name="description" content="">`,
      `<meta name="robots" content="index,follow">`,
      `<link rel="canonical" href="${defaultCanonical}">`,
      `<meta property="og:type" content="website">`,
      `<meta property="og:url" content="${defaultCanonical}">`,
      `<meta property="og:title" content="${defaultTitle}">`,
      `<meta property="og:site_name" content="Umbrella Custom Packaging">`,
      `<meta property="og:locale" content="en_US">`,
      `<meta name="twitter:card" content="summary_large_image">`,
      `<meta name="twitter:title" content="${defaultTitle}">`
    ].join('\n');
    const helmetHead = `\n${rendered.helmet?.title || ''}\n${rendered.helmet?.meta || ''}\n${rendered.helmet?.link || ''}\n${rendered.helmet?.script || ''}\n`;
    const finalHead = helmetHead.trim().length > 0 ? helmetHead : defaultHead;
    const routeType = url === '/' ? 'home' :
      url.startsWith('/category/') ? 'category' :
      url.startsWith('/sub-category/') ? 'subcategory' :
      url.startsWith('/blog/') ? 'blog' : 'product';
    const html = template
      .replace('<!--app-head-->', finalHead)
      .replace('<!--app-html-->', rendered.html || '')
      .replace(
        '<!--server-data-->', 
        `<style>#root.hydration-pending{pointer-events:none}</style><script>window.__SERVER_DATA__ = ${JSON.stringify(rendered.serverData || null)};window.__CATEGORY_PRODUCTS__ = ${JSON.stringify(rendered.CategoryProducts || null)};window.__HOME_PAGE_DATA__ = ${JSON.stringify(rendered.homePageData || null)};window.__SSR_COMPLETE__=true;(function(){try{var r=document.getElementById('root');if(r){r.classList.add('hydration-pending');}var s=r?r.getAttribute('data-ssr-route'):null;var p=window.location.pathname||'/';var c=(p==='/'?'home':(p.indexOf('/category/')===0?'category':(p.indexOf('/sub-category/')===0?'subcategory':(p.indexOf('/blog/')===0?'blog':'product'))));if(r&&s&&s!==c){r.setAttribute('data-ssr-route', c);} }catch(e){}})();</script>`
      )
      .replace('id="root"', `id="root" data-ssr-route="${routeType}"`);
    
    if (res.statusCode === 200) {
      const headers = { 
        'Content-Type': 'text/html',
        'Cache-Control': `public, max-age=${SSR_FRESH_TTL}, stale-while-revalidate=${Math.max(SSR_STALE_TTL - SSR_FRESH_TTL, 0)}`
      };
      ssrCache.set(cacheKey, { html, cachedAt: Date.now() }, SSR_STALE_TTL);
      res.set(headers);
      res.set('X-SSR-Route', routeType);
      res.set('X-SSR-Cache', 'MISS');
      res.set('X-SSR-Cache-TTL', String(ssrTtl));
    }
    
    res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    console.log(`SSR completed for ${url}: ${Date.now() - startTime}ms`);
    
  } catch (e) {
    if (e.message === 'SSR timeout') {
      console.error(`SSR timeout for ${url}: ${Date.now() - startTime}ms`);
      
      if (renderPromise && template) {
        renderPromise
          .then((bgRendered) => {
            const htmlBg = template
              .replace('<!--app-head-->', `\n${bgRendered.helmet?.title || ''}\n${bgRendered.helmet?.meta || ''}\n${bgRendered.helmet?.link || ''}\n${bgRendered.helmet?.script || ''}\n`)
              .replace('<!--app-html-->', bgRendered.html || '')
              .replace('<!--server-data-->', `<script>window.__SERVER_DATA__ = ${JSON.stringify(bgRendered.serverData || null)};window.__CATEGORY_PRODUCTS__ = ${JSON.stringify(bgRendered.CategoryProducts || null)};window.__HOME_PAGE_DATA__ = ${JSON.stringify(bgRendered.homePageData || null)}</script>`);
            const headersBg = {
              'Content-Type': 'text/html',
              'Cache-Control': `public, max-age=${ssrTtl}`
            };
            ssrCache.set(cacheKey, { html: htmlBg, headers: headersBg }, ssrTtl);
          })
          .catch(() => {});
      }
      
      if (template) {
        const originFb = `${req.protocol}://${req.get('host')}`;
        const segsFb = (url || '').split('/').filter(Boolean);
        const slugFb = segsFb[segsFb.length - 1] || '';
        const humanizeFb = (s) => s.replace(/-/g, ' ').replace(/\s+/g, ' ').trim().replace(/\b\w/g, c => c.toUpperCase());
        const defaultTitleFb =
          url === '/' ? 'Umbrella Custom Packaging' :
          url.startsWith('/category/') ? `${humanizeFb(slugFb)} | Umbrella Custom Packaging` :
          url.startsWith('/sub-category/') ? `${humanizeFb(slugFb)} | Umbrella Custom Packaging` :
          url.startsWith('/blog/') ? `${humanizeFb(slugFb)} | Umbrella Custom Packaging` :
          `${humanizeFb(slugFb)} | Umbrella Custom Packaging`;
        const defaultCanonicalFb = `${originFb}${url}`;
        const defaultHeadFb = [
          `<title>${defaultTitleFb}</title>`,
          `<meta name="description" content="">`,
          `<meta name="robots" content="index,follow">`,
          `<link rel="canonical" href="${defaultCanonicalFb}">`,
          `<meta property="og:type" content="website">`,
          `<meta property="og:url" content="${defaultCanonicalFb}">`,
          `<meta property="og:title" content="${defaultTitleFb}">`,
          `<meta property="og:site_name" content="Umbrella Custom Packaging">`,
          `<meta property="og:locale" content="en_US">`,
          `<meta name="twitter:card" content="summary_large_image">`,
          `<meta name="twitter:title" content="${defaultTitleFb}">`
        ].join('\n');
        const fallbackHtml = template
          .replace('<!--app-head-->', defaultHeadFb)
          .replace('<!--app-html-->', '')
          .replace('<!--server-data-->', '<style>#root.hydration-pending{pointer-events:none}</style><script>window.__SERVER_DATA__ = null;window.__CATEGORY_PRODUCTS__ = null;window.__HOME_PAGE_DATA__ = null;window.__SSR_COMPLETE__=false;(function(){try{var r=document.getElementById(\'root\');if(r){r.classList.add(\'hydration-pending\');}var s=r?r.getAttribute(\'data-ssr-route\'):null;var p=window.location.pathname||\'/\';var c=(p===\'/\'?\'home\':(p.indexOf(\'/category/\')===0?\'category\':(p.indexOf(\'/sub-category/\')===0?\'subcategory\':(p.indexOf(\'/blog/\')===0?\'blog\':\'product\'))));if(r&&s&&s!==c){r.setAttribute(\'data-ssr-route\', c);} }catch(e){}})();</script>')
          .replace('id="root"', `id="root" data-ssr-route="${url === '/' ? 'home' : url.startsWith('/category/') ? 'category' : url.startsWith('/sub-category/') ? 'subcategory' : url.startsWith('/blog/') ? 'blog' : 'product'}"`);
        
        res.status(200).set({ 'Content-Type': 'text/html' }).send(fallbackHtml);
      } else {
        
      }
    } else {
      console.error('SSR Error:', e.stack);
     
    }
  }
});

// Start server
const PORT = process.env.PORT || 8000;
 app.listen(PORT, '0.0.0.0', () => {
    console.log(`Worker ${process.pid} is running on port ${PORT} in ${isProduction ? 'production' : 'development'} mode`);
 });
}
