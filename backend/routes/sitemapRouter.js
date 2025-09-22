import express from "express";
import { getAllProductsForSitemap } from "../controller/ProductController.js";
import { getAllBlogsForSitemap } from "../controller/BlogController.js";
import { getAllCategoriesForSitemap } from "../controller/BrandController.js";
import { getAllSubCategoriesForSitemap } from "../controller/MidCategory.js";
import { Products } from "../model/Product.js";

const sitemapRouter = express.Router();

// Generate dynamic sitemap
sitemapRouter.get("/sitemap.xml", async (req, res) => {
  try {
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>https://umbrellapackaging.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://umbrellapackaging.com/about-us</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://umbrellapackaging.com/contact-us</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://umbrellapackaging.com/blogs</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://umbrellapackaging.com/shop</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://umbrellapackaging.com/get-custom-quote</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://umbrellapackaging.com/target-price</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://umbrellapackaging.com/faqs</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://umbrellapackaging.com/portfolio</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://umbrellapackaging.com/reviews</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://umbrellapackaging.com/privacy-policy</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://umbrellapackaging.com/terms-and-conditions</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://umbrellapackaging.com/shipping-policy</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://umbrellapackaging.com/returns-refunds</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>`;

    // Add categories (direct routes)
    try {
      const categories = await getAllCategoriesForSitemap();
      if (categories && categories.length > 0) {
        categories.forEach(category => {
          if (category.slug) {
            sitemap += `
  <url>
    <loc>https://umbrellapackaging.com/category/${category.slug}</loc>
    <lastmod>${category.updatedAt ? new Date(category.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
          }
        });
      }
    } catch (error) {
      console.log("Error fetching categories for sitemap:", error);
    }

    // Add sub-categories (direct routes)
    try {
      const subCategories = await getAllSubCategoriesForSitemap();
      if (subCategories && subCategories.length > 0) {
        subCategories.forEach(subCategory => {
          if (subCategory.slug) {
            sitemap += `
  <url>
    <loc>https://umbrellapackaging.com/sub-category/${subCategory.slug}</loc>
    <lastmod>${subCategory.updatedAt ? new Date(subCategory.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
          }
        });
      }
    } catch (error) {
      console.log("Error fetching sub-categories for sitemap:", error);
    }

    // Add products (direct routes)
    try {
      const products = await getAllProductsForSitemap();
      if (products && products.length > 0) {
        products.forEach(product => {
          if (product.slug) {
            sitemap += `
  <url>
    <loc>https://umbrellapackaging.com/${product.slug}</loc>
    <lastmod>${product.updatedAt ? new Date(product.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
          }
        });
      }
    } catch (error) {
      console.log("Error fetching products for sitemap:", error);
    }

    // Add blogs (direct routes)
    try {
      const blogs = await getAllBlogsForSitemap();
      if (blogs && blogs.length > 0) {
        blogs.forEach(blog => {
          if (blog.slug) {
            sitemap += `
  <url>
    <loc>https://umbrellapackaging.com/blog/${blog.slug}</loc>
    <lastmod>${blog.updatedAt ? new Date(blog.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
          }
        });
      }
    } catch (error) {
      console.log("Error fetching blogs for sitemap:", error);
    }

    sitemap += `
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).send("Error generating sitemap");
  }
});


function xmlEscape(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

sitemapRouter.get("/feed.xml", async (req, res) => {
  try {
    const products = await Products.find({})
      .select("_id name slug description metaTitle metaDescription images bannerImage brandId actualPrice")
      .populate({ path: "brandId", select: "name" })
      .lean();

    const siteBase = process.env.BASEURL?.replace(/\/$/, "") || "https://umbrellapackaging.com";

    const stripHtml = (html) => String(html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const itemsXml = products.map((p) => {
      const id = String(p._id || "");
      const title = xmlEscape(p.metaTitle || p.name || "");
      const description = xmlEscape(p.metaDescription || stripHtml(p.description));
      const link = `${siteBase}/${p.slug}`;
      const imagePath = (p.images && p.images[0]?.url) ? p.images[0].url : p.bannerImage;
      const imageLink = imagePath
        ? `${siteBase}/${String(imagePath).replace(/^\//, "")}`
        : `${siteBase}/umbrella.svg`;
      const additionalImages = Array.isArray(p.images) && p.images.length > 1
        ? p.images.slice(1).map(img => `\n      <g:additional_image_link>${xmlEscape(`${siteBase}/${String(img.url).replace(/^\//, "")}`)}</g:additional_image_link>`).join("")
        : "";
      const numericPrice = parseFloat(String(p.actualPrice).replace(/[^0-9.]/g, ""));
      const price = isNaN(numericPrice) ? "0.00 USD" : `${numericPrice.toFixed(2)} USD`;

      return `    <item>
      <g:id>${id}</g:id>
      <g:title>${title}</g:title>
      <g:description>${description}</g:description>
      <g:link>${xmlEscape(link)}</g:link>
      <g:image_link>${xmlEscape(imageLink)}</g:image_link>
${additionalImages}
      <g:availability>in_stock</g:availability>
      <g:brand>Umbrella Packaging</g:brand>
      <g:condition>new</g:condition>
      <g:price>${price}</g:price>
    </item>`;
    }).join("\n");

    const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Umbrella Packaging - Product Feed</title>
    <link>${siteBase}/</link>
    <description>Google Merchant Center product feed</description>
${itemsXml}
  </channel>
</rss>`;

    res.setHeader('Content-Type', 'application/xml');
    res.send(feed);
  } catch (error) {
    console.error("Error generating merchant feed:", error);
    res.status(500).send("Error generating merchant feed");
  }
});

export default sitemapRouter; 