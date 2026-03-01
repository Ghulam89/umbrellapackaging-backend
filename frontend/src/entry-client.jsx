import { hydrateRoot, createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import "./index.css";
import axios from "axios";
import { BaseUrl } from "./utils/BaseUrl";
const serverData = window.__SERVER_DATA__ || null;
const categoryProducts = window.__CATEGORY_PRODUCTS__ || null;
const bannerData = serverData?.bannerData || null;

const HOME_CACHE_KEY = "HOME_CACHE_V1";
const HOME_CACHE_TTL_MS = 10 * 60 * 1000;

const isHome = typeof window !== "undefined" && window.location && window.location.pathname === "/";

const readHomeCache = () => {
  try {
    const raw = localStorage.getItem(HOME_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.timestamp) return null;
    const isFresh = Date.now() - parsed.timestamp < HOME_CACHE_TTL_MS;
    return isFresh ? parsed.data : null;
  } catch {
    return null;
  }
};

const writeHomeCache = (data) => {
  try {
    localStorage.setItem(
      HOME_CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), data })
    );
    window.__HOME_CACHE__ = data;
  } catch {}
};

const homeCacheData = isHome ? readHomeCache() : null;
window.__HOME_CACHE__ = homeCacheData || null;

const homePageData = window.__HOME_PAGE_DATA__ || homeCacheData || null;

const rootElement = document.getElementById("root");
// Guard: if current route is home but SSR provided non-home data, clear SSR HTML to avoid flicker
try {
  if (rootElement && isHome && serverData) {
    rootElement.innerHTML = "";
  }
  // Canonical mismatch guard: if SSR canonical doesn't match current URL, clear SSR HTML
  const canonicalEl = document.querySelector('link[rel="canonical"]');
  const currentCanonical = `${window.location.origin}${window.location.pathname}`;
  if (rootElement && canonicalEl && canonicalEl.href && canonicalEl.href !== currentCanonical) {
    rootElement.innerHTML = "";
  }
  // Route-type mismatch guard via SSR flag
  const expectedRouteType = (p) => {
    if (p === '/') return 'home';
    if (p.startsWith('/category/')) return 'category';
    if (p.startsWith('/sub-category/')) return 'subcategory';
    if (p.startsWith('/blog/')) return 'blog';
    return 'product';
  };
  const ssrRoute = rootElement?.getAttribute('data-ssr-route') || null;
  const currentRoute = expectedRouteType(window.location.pathname || '/');
  if (rootElement && ssrRoute && ssrRoute !== currentRoute) {
    rootElement.innerHTML = "";
  }
  // Dynamic route must have serverData; if missing, clear SSR to avoid wrong initial paint
  const p = window.location.pathname || '/';
  const needsServerData = (p.startsWith('/category/') || p.startsWith('/sub-category/') || p.startsWith('/blog/') || (!p.startsWith('/category/') && !p.startsWith('/sub-category/') && !p.startsWith('/blog/') && p !== '/'));
  if (rootElement && needsServerData && !serverData) {
    rootElement.innerHTML = "";
  }
} catch {}
const initialServerData = isHome ? null : serverData;
const app = (
  <HelmetProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App serverData={initialServerData} CategoryProducts={categoryProducts} bannerData={bannerData} homePageData={homePageData} />
      </BrowserRouter>
    </Provider>
  </HelmetProvider>
);

if (rootElement && rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else if (rootElement) {
  createRoot(rootElement).render(app);
}

if (isHome) {
  const prefetchHome = async () => {
    try {
      const [productsRes, faqRes, bannerRes, blogRes, ratingRes] = await Promise.allSettled([
        axios.get(`${BaseUrl}/products/getAll?page=1&perPage=8`),
        axios.get(`${BaseUrl}/faq/getAll`),
        axios.get(`${BaseUrl}/banner/getAll`),
        axios.get(`${BaseUrl}/blog/getAll`),
        axios.get(`${BaseUrl}/rating/getAll`)
      ]);
      const data = {
        topProducts: productsRes.status === "fulfilled" && productsRes.value?.data?.status === "success" ? productsRes.value.data.data : [],
        faqs: faqRes.status === "fulfilled" && faqRes.value?.data?.status === "success" ? faqRes.value.data.data : [],
        banner: bannerRes.status === "fulfilled" && bannerRes.value?.data?.data?.[0] ? bannerRes.value.data.data[0] : null,
        blogs: blogRes.status === "fulfilled" ? blogRes.value?.data?.data || [] : [],
        ratings: ratingRes.status === "fulfilled" ? ratingRes.value?.data?.data || [] : []
      };
      writeHomeCache(data);
    } catch {}
  };
  if (window.requestIdleCallback) {
    window.requestIdleCallback(prefetchHome, { timeout: 2000 });
  } else {
    setTimeout(prefetchHome, 100);
  }
}

// Prefetch brands list and store in home cache
if (isHome) {
  const prefetchBrands = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/brands/getAll?all=true`);
      const brands = res?.data?.data || [];
      const existing = typeof window !== "undefined" ? window.__HOME_CACHE__ || {} : {};
      const updated = { ...existing, brands };
      writeHomeCache(updated);
    } catch {}
  };
  if (window.requestIdleCallback) {
    window.requestIdleCallback(prefetchBrands, { timeout: 2000 });
  } else {
    setTimeout(prefetchBrands, 200);
  }
}
