import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import FAQ from "../components/FAQ/FAQ";
import NotFound from "../pages/404";
import { About } from "../pages/about/About";
import Blogs from "../pages/blogs/Blogs";
import SingleBlog from "../pages/blogs/SingleBlog";
import Cart from "../pages/cart/Cart";
import Category from "../pages/category/Category";
import Checkout from "../pages/checkout/Checkout";
import ContactUs from "../pages/contactUs/ContactUs";
import GetCustomQoutePage from "../pages/getCustomQuote/GetCustomQoutePage";
import { Home } from "../pages/home/Home";
import Portfolio from "../pages/Portfolio/Portfolio";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import ProductDetails from "../pages/productDetails";
import ReturnRefunds from "../pages/ReturnRefunds/ReturnRefunds";
import Reviews from "../pages/reviews";
import ShippingPolicy from "../pages/shippingPolicy/ShippingPolicy";
import Shop from "../pages/shop";
import SubCategory from "../pages/subCategory/SubCategory";
import TargetPrice from "../pages/targetPrice";
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";
import axiosInstance from "../utils/axiosInstance";
import { BaseUrl } from "../utils/BaseUrl";
import Dielines from "../pages/Dielines";
import SuccessPage from "../pages/thankYouPage";
import { getCachedProduct } from "../utils/prefetchUtils";

function ProductDetailsWrapper({ initialProduct }) {
  const { slug } = useParams();
  // Check cache first before setting initial state
  const cachedProduct = slug ? getCachedProduct(slug) : null;
  const [productData, setProductData] = useState(initialProduct || cachedProduct || null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(!initialProduct && !cachedProduct && !!slug);

  useEffect(() => {
    if (!initialProduct && slug) {
      // Check cache first
      const cached = getCachedProduct(slug);
      if (cached) {
        setProductData(cached);
        setLoading(false);
        return;
      }

      let cancelled = false;
      setLoading(true);
      
      (async () => {
        try {
          const response = await axiosInstance.get('/products/get', {
            params: { slug }
          });
          if (!cancelled) {
            setProductData(response?.data?.data || null);
            setError(false);
          }
        } catch {
          if (!cancelled) setError(true);
        } finally {
          if (!cancelled) setLoading(false);
        }
      })();
      
      return () => {
        cancelled = true;
      };
    }
  }, [slug, initialProduct]);

  // if (loading) return <div>Loading...</div>;
  // if (error || !productData) return <NotFound />;
  return <ProductDetails serverData={productData} />;
}

const MemoProductDetailsWrapper = React.memo(ProductDetailsWrapper);

export default function useWebsiteRoutes(serverData, CategoryProducts, bannerData) {
  const sharedServer = serverData?.serverData ?? serverData ?? null;
  const initialProduct = sharedServer ?? null;

  const routes = useMemo(() => [
    { path: '/', element: <Home key="home" bannerData={bannerData} /> },
    { path: '/about-us', element: <About key="about" /> },
    { path: '/contact-us', element: <ContactUs key="contact" /> },
    { path: '/blogs', element: <Blogs key="blogs" /> },
    { path: '/thank-you-page', element: <SuccessPage key="success" /> },
    { path: '/shop', element: <Shop key="shop" /> },
    { path: '/cart', element: <Cart key="cart" /> },
    { path: '/checkout', element: <Checkout key="checkout" /> },
    { path: '/privacy-policy', element: <PrivacyPolicy key="privacy-policy" /> },
    { path: '/terms-and-conditions', element: <TermsAndConditions key="terms-and-conditions" /> },
    { path: '/shipping-policy', element: <ShippingPolicy key="shipping-policy" /> },
    { path: '/returns-refunds', element: <ReturnRefunds key="returns-refunds" /> },
    { path: '/reviews', element: <Reviews key="reviews" /> },
    { path: '/dielines', element: <Dielines key="dielines" /> },
    { path: '/get-custom-quote', element: <GetCustomQoutePage key="get-custom-quote" /> },
    { path: '/target-price', element: <TargetPrice key="target-price" /> },
    { path: '/faqs', element: <FAQ key="faqs" /> },
    { path: '/portfolio', element: <Portfolio key="portfolio" /> },
    { path: '/404', element: <NotFound key="not-found" /> },
    { path: '/category/:slug', element: <Category key="category" serverData={sharedServer} /> },
    { path: '/blog/:slug', element: <SingleBlog key="blog" serverData={sharedServer} /> },
    { path: '/sub-category/:slug', element: <SubCategory key="subcategory" serverData={sharedServer} CategoryProducts={CategoryProducts} /> },
    { path: '/:slug', element: <MemoProductDetailsWrapper key="product" initialProduct={initialProduct} /> },
    { path: '*', element: <NotFound key="catch-all" /> }
  ], [sharedServer, CategoryProducts, initialProduct]);

  return routes;
}
