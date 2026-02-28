import React, { StrictMode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { PassThrough } from "stream";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { BaseUrl } from "./utils/BaseUrl";
import { Provider } from "react-redux";
import { store } from "./store/store";

const isProduction = process.env.NODE_ENV === "production";

const ssrLog = (...args) => {
  if (!isProduction) {
    console.log(...args);
  }
};

const ssrError = (...args) => {
  if (!isProduction) {
    console.error(...args);
  }
};

const internalApiBaseUrl =
  process.env.INTERNAL_API_BASE_URL || BaseUrl;

// Dedicated axios client for SSR with sensible timeout
const ssrClient = axios.create({
  baseURL: internalApiBaseUrl,
  timeout: 8000, // 8s timeout to avoid hanging SSR
});

export async function render(url) {
  ssrLog("SSR render called with URL:", url);
  const normalizedUrl = url.startsWith("/") ? url : `/${url}`;
  const cleanUrl = normalizedUrl.endsWith("/")
    ? normalizedUrl.slice(0, -1)
    : normalizedUrl;

  // Remove query parameters
  const baseUrl = cleanUrl.split("?")[0];

  const isHomePage = baseUrl === "/";

  ssrLog("SSR URL processing:", {
    originalUrl: url,
    normalizedUrl,
    cleanUrl,
    baseUrl,
    isHomePage,
  });

  const helmetContext = {};
  let serverData = null;
  let CategoryProducts = null;
  let homePageData = null; // For home page: products, FAQ, banner

  try {
    // Handle different routes - check in order of specificity
    // Check for home page - baseUrl will be "" or "/" after cleaning
    ssrLog("SSR: Is home page?", isHomePage, {
      baseUrl,
      normalizedUrl,
      url,
    });

    if (isHomePage) {
      // Handle home page - fetch multiple data sources
      ssrLog("SSR: Fetching home page data...");
      try {
        const [productsRes, faqRes, bannerRes] = await Promise.allSettled([
          ssrClient.get("/products/getAll?page=1&perPage=8"),
          ssrClient.get("/faq/getAll"),
          ssrClient.get("/banner/getAll"),
        ]);

        ssrLog(
          "SSR: Products result:",
          productsRes.status,
          productsRes.status === "fulfilled"
            ? productsRes.value?.data?.status
            : productsRes.reason?.message
        );
        ssrLog(
          "SSR: FAQ result:",
          faqRes.status,
          faqRes.status === "fulfilled"
            ? faqRes.value?.data?.status
            : faqRes.reason?.message
        );
        ssrLog(
          "SSR: Banner result:",
          bannerRes.status,
          bannerRes.status === "fulfilled"
            ? bannerRes.value?.data?.data?.length
            : bannerRes.reason?.message
        );

        homePageData = {
          topProducts: productsRes.status === 'fulfilled' && productsRes.value?.data?.status === 'success'
            ? productsRes.value.data.data
            : [],
          faqs: faqRes.status === 'fulfilled' && faqRes.value?.data?.status === 'success'
            ? faqRes.value.data.data
            : [],
          banner: bannerRes.status === 'fulfilled' && bannerRes.value?.data?.data?.[0]
            ? bannerRes.value.data.data[0]
            : null,
          brands: []
        };

        ssrLog("SSR: Home page data prepared:", {
          topProducts: homePageData.topProducts?.length || 0,
          faqs: homePageData.faqs?.length || 0,
          banner: homePageData.banner ? "present" : "null",
        });
      } catch (homeErr) {
        ssrError(
          "SSR: Home page data fetch error:",
          homeErr.message,
          homeErr.stack
        );
      }

    } else if (baseUrl.startsWith("/blog/")) {
      // Handle blog route
      const slug = baseUrl.split("/")[2];
      try {
        const { data } = await ssrClient.get(`/blog/get?slug=${slug}`);
        serverData = data?.data;
      } catch (blogErr) {
        ssrError("SSR: Blog fetch error:", blogErr.message);
        // Continue without serverData
      }

    } else if (baseUrl.startsWith("/sub-category/")) {
      // Handle sub-category route
      const slug = baseUrl.split("/")[2];
      try {
        const { data } = await ssrClient.get(`/category/get?slug=${slug}`);
        serverData = data?.data;

        if (serverData?._id) {
          try {
            const { data: productData } = await ssrClient.get(
              `/products/categoryProducts/${serverData._id}?page=1&perPage=12`
            );
            CategoryProducts = productData?.data;
          } catch (productErr) {
            ssrError(
              "SSR: Category products fetch error:",
              productErr.message
            );
          }
        }
      } catch (categoryErr) {
        ssrError("SSR: Category fetch error:", categoryErr.message);
        // Continue without serverData
      }

    } else if (baseUrl.startsWith("/category/")) {
      // Handle category route
      const slug = baseUrl.split("/")[2];
      try {
        const { data } = await ssrClient.get(`/brands/get?slug=${slug}`);
        serverData = data?.data;
      } catch (brandErr) {
        ssrError("SSR: Brand fetch error:", brandErr.message);
        // Continue without serverData
      }


    } else if (
      baseUrl.startsWith("/") &&
      baseUrl.split("/").length === 2 &&
      !baseUrl.startsWith("/category/") &&
      !baseUrl.startsWith("/sub-category/") &&
      !baseUrl.startsWith("/blog/")
    ) {
      // Handle product route (e.g., /fashion-apparel-packaging-boxes)
      const slug = baseUrl.split("/")[1];

      try {
        const { data } = await ssrClient.get(`/products/get?slug=${slug}`);
        serverData = data?.data;
      } catch (productErr) {
        ssrError("SSR: Product fetch error:", productErr.message);
        // Continue without serverData
      }

    }
  } catch (err) {
    // On error → noindex meta
    ssrError("SSR data fetch error:", err.message);
    // Don't set helmet on outer catch - let individual routes handle errors
  }

  // Render app with Suspense support using renderToPipeableStream
  let appHtml = '';
  try {
    await new Promise((resolve, reject) => {
      const stream = new PassThrough();
      const chunks = [];
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on('end', () => {
        appHtml = Buffer.concat(chunks).toString('utf-8');
        resolve();
      });
      stream.on('error', (err) => {
        ssrError("SSR stream error:", err.message);
        reject(err);
      });

      const { pipe, abort } = renderToPipeableStream(
        <StrictMode>
          <HelmetProvider context={helmetContext}>
            <Provider store={store}>
              <StaticRouter location={normalizedUrl}>
                <App serverData={serverData} CategoryProducts={CategoryProducts} homePageData={homePageData} />
              </StaticRouter>
            </Provider>
          </HelmetProvider>
        </StrictMode>,
        {
          onAllReady() {
            pipe(stream);
          },
          onError(err) {
            ssrError("SSR render error:", err.message);
          },
        }
      );

      setTimeout(() => {
        abort();
        reject(new Error("SSR render timeout"));
      }, 8000);
    });
  } catch (renderError) {
    ssrError("SSR render error:", renderError.message);
    appHtml = '<div id="app"></div>';
    helmetContext.helmet = {
      meta: { toString: () => `<meta name="robots" content="noindex nofollow" />` },
    };
  }

  const { helmet } = helmetContext;

  // Ensure homePageData is set for home page even if fetch failed
  if (isHomePage && !homePageData) {
    homePageData = { topProducts: [], faqs: [], banner: null };
  }

  const result = {
    html: appHtml,
    helmet: {
      title: helmet?.title?.toString() || "",
      meta: helmet?.meta?.toString() || "",
      link: helmet?.link?.toString() || "",
      script: helmet?.script?.toString() || "",
    },
    serverData: serverData || null,
    CategoryProducts: CategoryProducts || null,
    homePageData: homePageData || null,
  };

  ssrLog("SSR: Returning result:", {
    hasHtml: !!result.html,
    hasServerData: !!result.serverData,
    hasCategoryProducts: !!result.CategoryProducts,
    hasHomePageData: !!result.homePageData,
    homePageDataKeys: result.homePageData ? Object.keys(result.homePageData) : [],
  });

  return result;
}
