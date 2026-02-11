import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { BaseUrl } from "./utils/BaseUrl";
import { Provider } from "react-redux";
import { store } from "./store/store";

export async function render(url) {
  const normalizedUrl = url.startsWith("/") ? url : `/${url}`;
  const cleanUrl = normalizedUrl.endsWith("/")
    ? normalizedUrl.slice(0, -1)
    : normalizedUrl;

  // Remove query parameters
  const baseUrl = cleanUrl.split("?")[0];
  const helmetContext = {};
  let serverData = null;
  let CategoryProducts = null;
  let bannerData = null;

  // List of static routes that should not be treated as product slugs
  const staticRoutes = [
    '/thank-you-page',
    '/about-us',
    '/contact-us',
    '/blogs',
    '/shop',
    '/cart',
    '/checkout',
    '/privacy-policy',
    '/terms-and-conditions',
    '/shipping-policy',
    '/returns-refunds',
    '/reviews',
    '/dielines',
    '/get-custom-quote',
    '/target-price',
    '/faqs',
    '/portfolio',
    '/404'
  ];

  try {
    if (baseUrl.startsWith("/category/")) {
      // Handle category route
      const slug = baseUrl.split("/")[2];
      const { data } = await axios.get(`${BaseUrl}/brands/get?slug=${slug}`);
      serverData = data?.data;

    } else if (baseUrl.startsWith("/sub-category/")) {
      // Handle sub-category route
      const slug = baseUrl.split("/")[2];
      const { data } = await axios.get(`${BaseUrl}/redis/category/get?slug=${slug}`);
      serverData = data?.data;

      if (serverData?._id) {
        const { data: productData } = await axios.get(
          `${BaseUrl}/products/categoryProducts/${serverData._id}`
        );
        CategoryProducts = productData?.data;
      }

    } else if (baseUrl.split("/").length === 2 && baseUrl !== "/" && !staticRoutes.includes(baseUrl)) {
      // Handle product route - only if it's not a static route
      const slug = baseUrl.split("/")[1];
      const { data } = await axios.get(`${BaseUrl}/products/get?slug=${slug}`);
      serverData = data?.data;

    } else if (baseUrl.startsWith("/blog/")) {
      // Handle blog route
      const slug = baseUrl.split("/")[2];
      const { data } = await axios.get(`${BaseUrl}/blog/get?slug=${slug}`);
      serverData = data?.data;
    }

    // Fetch banner data for home page (for SEO and view-source visibility)
    if (baseUrl === "/" || baseUrl === "") {
      try {
        const { data: bannerResponse } = await axios.get(`${BaseUrl}/banner/getAll`, {
          timeout: 3000
        });
        bannerData = bannerResponse?.data?.[0] || null;
      } catch (bannerErr) {
        // Silently fail - banner is not critical for SSR
        console.error('Banner fetch error:', bannerErr.message);
      }
    }
  } catch (err) {
    // On error → noindex meta
    helmetContext.helmet = {
      meta: { toString: () => `<meta name="robots" content="index follow" />` },
    };
  }

  // Render app with renderToString
  // Note: renderToString will render Suspense fallbacks on server, 
  // which is fine - client will hydrate and show actual content
  const reactApp = (
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <Provider store={store}>
          <StaticRouter location={normalizedUrl}>
            <App serverData={serverData} CategoryProducts={CategoryProducts} bannerData={bannerData} />
          </StaticRouter>
        </Provider>
      </HelmetProvider>
    </StrictMode>
  );

  try {
    // Use renderToString - it will render Suspense fallbacks on server
    // This is the recommended approach when streaming isn't available
    const appHtml = renderToString(reactApp);

    const { helmet } = helmetContext;

    return {
      html: appHtml,
      helmet: {
        title: helmet?.title?.toString() || "",
        meta: helmet?.meta?.toString() || "",
        link: helmet?.link?.toString() || "",
        script: helmet?.script?.toString() || "",
      },
      serverData: {
        ...(serverData || {}),
        bannerData: bannerData || null
      },
    };
  } catch (error) {
    // If rendering fails, return minimal HTML and let client handle it
    console.error('SSR Error:', error);
    
    const { helmet } = helmetContext;

    return {
      html: '<div id="app"></div>',
      helmet: {
        title: helmet?.title?.toString() || "",
        meta: helmet?.meta?.toString() || "",
        link: helmet?.link?.toString() || "",
        script: helmet?.script?.toString() || "",
      },
      serverData: {
        ...(serverData || {}),
        bannerData: bannerData || null
      },
    };
  }
}
