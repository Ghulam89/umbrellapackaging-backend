import { Route, Routes, useLocation, useRoutes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/home/Home'
import TopNav from './components/Header/TopNav'
import Navbar from './components/Header/Navbar'
import Category from './pages/category/Category'
import { About } from './pages/about/About'
import SubCategory from './pages/subCategory/SubCategory'
import ProductDetails from './pages/productDetails'
import ContactUs from './pages/contactUs/ContactUs'
import Footer from './components/Footer/Footer'
import Blogs from './pages/blogs/Blogs'
import SingleBlog from './pages/blogs/SingleBlog'
import Shop from './pages/shop'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions/TermsAndConditions'
import ShippingPolicy from './pages/shippingPolicy/ShippingPolicy'
import ReturnRefunds from './pages/ReturnRefunds/ReturnRefunds'
import Reviews from './pages/reviews'
import GetCustomQoutePage from './pages/getCustomQuote/GetCustomQoutePage'
import TargetPrice from './pages/targetPrice'
import FAQ from './components/FAQ/FAQ'
import Portfolio from './pages/Portfolio/Portfolio'
import NotFound from './pages/404'
import { useEffect } from 'react'
import Cart from './pages/cart/Cart'
import Checkout from './pages/checkout/Checkout'
import { ToastContainer } from 'react-toastify'

function App({ serverData,CategoryProducts}) {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const routes = [
    { path: '/', element: <Home key="home" /> },
    { path: '/about-us', element: <About key="about" /> },
    { path: '/contact-us', element: <ContactUs key="contact" /> },
    { path: '/blogs', element: <Blogs key="blogs" /> },
    { path: '/shop', element: <Shop key="shop" /> },
    { path: '/cart', element: <Cart key="cart" /> },
    { path: '/checkout', element: <Checkout key="checkout" /> },
    { path: '/privacy-policy', element: <PrivacyPolicy key="privacy-policy" /> },
    { path: '/terms-and-conditions', element: <TermsAndConditions key="terms-and-conditions" /> },
    { path: '/shipping-policy', element: <ShippingPolicy key="shipping-policy" /> },
    { path: '/returns-refunds', element: <ReturnRefunds key="returns-refunds" /> },
    { path: '/reviews', element: <Reviews key="reviews" /> },
    { path: '/get-custom-quote', element: <GetCustomQoutePage key="get-custom-quote" /> },
    { path: '/target-price', element: <TargetPrice key="target-price" /> },
    { path: '/faqs', element: <FAQ key="faq" /> },
    { path: '/portfolio', element: <Portfolio key="portfolio" /> },
    { path: '/404', element: <NotFound key="not-found" /> },
    {
      path: '/category/:slug',
      element: <Category
        key={location.pathname}
        serverData={serverData}
      />
    },
    {
      path: '/blog/:slug',
      element: <SingleBlog
        key={location.pathname}
        serverData={serverData}
      />
    },
    {
      path: '/sub-category/:slug',
      element: <SubCategory
        key={location.pathname}
        serverData={serverData}
        CategoryProducts={CategoryProducts}
      />
    },
    {
      path: '/:slug',
      element: <ProductDetails
        key={location.pathname}
        serverData={serverData}
       
      />
    },
    { path: '*', element: <NotFound /> }
  ];

  const element = useRoutes(routes, location);

  return (
    <>
    <ToastContainer/>
      <TopNav />
      <Navbar />
      {element}
      <Footer />
    </>
  )
}

export default App
