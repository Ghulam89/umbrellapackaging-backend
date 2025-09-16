import { useLocation, useParams } from "react-router-dom";
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
import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../utils/BaseUrl";
import Dielines from "../pages/Dielines";
import SuccessPage from "../pages/thankYouPage";

// Separate component for product details to avoid re-rendering issues
function ProductDetailsWrapper({ serverData }) {
  const { slug } = useParams();
  const [productData, setProductData] = useState(serverData);
  const [loading, setLoading] = useState(!serverData);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!serverData && slug) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${BaseUrl}/products/get?slug=${slug}`);
          setProductData(response?.data?.data);
          setError(false);
        } catch (err) {
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [slug, serverData]);

  if (loading) return <div className="" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}></div>;
  if (!loading && (error || !productData)) return <NotFound />;

  return <ProductDetails serverData={productData} />;
}

export default function useWebsiteRoutes(serverData, CategoryProducts) {
  const location = useLocation();

  return [
    { path: '/', element: <Home key="home" /> },
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
    {
      path: '/category/:slug',
      element: <Category
        key={`category-${location.pathname}`}
        serverData={serverData.serverData}
      />
    },
    {
      path: '/blog/:slug',
      element: <SingleBlog
        key={`blog-${location.pathname}`}
        serverData={serverData.serverData}
      />
    },
    {
      path: '/sub-category/:slug',
      element: <SubCategory
        key={`subcategory-${location.pathname}`}
        serverData={serverData.serverData}
        CategoryProducts={CategoryProducts}
      />
    },
    {
      path: '/:slug',
      element: (
        <ProductDetailsWrapper
          key={`product-${location.pathname}`}
          serverData={serverData.serverData}
        />
      )
    },
    { path: '*', element: <NotFound key="catch-all" /> }
  ];
}