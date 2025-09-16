import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import "./App.css";
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

    } else if (baseUrl.split("/").length === 2 && baseUrl !== "/") {
      // Handle product route
      const slug = baseUrl.split("/")[1];
      const { data } = await axios.get(`${BaseUrl}/redis/product/get?slug=${slug}`);
      serverData = data?.data;

    } else if (baseUrl.startsWith("/blog/")) {
      // Handle blog route
      const slug = baseUrl.split("/")[2];
      const { data } = await axios.get(`${BaseUrl}/blog/get?slug=${slug}`);
      serverData = data?.data;
    }
  } catch (err) {
    // On error → noindex meta
    helmetContext.helmet = {
      meta: { toString: () => `<meta name="robots" content="index follow" />` },
    };
  }

  // Render app
  const appHtml = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <Provider store={store}>
          <StaticRouter location={normalizedUrl}>
            <App serverData={serverData} CategoryProducts={CategoryProducts} />
          </StaticRouter>
        </Provider>
      </HelmetProvider>
    </StrictMode>
  );

  const { helmet } = helmetContext;

  return {
    html: appHtml,
    helmet: {
      title: helmet?.title?.toString() || "",
      meta: helmet?.meta?.toString() || "",
      link: helmet?.link?.toString() || "",
      script: helmet?.script?.toString() || "",
    },
  };
}
