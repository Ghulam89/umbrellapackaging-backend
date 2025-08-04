
import Announcement from '../admin/Announcement/Announcement';
import Categories from '../admin/Categories';
import ContactUs from '../admin/contactUs';
import Customers from '../admin/Customer';
// import UpdateCustomers from '../admin/Customer/UpdateCustomer';
import Dashboard from '../admin/dashboard/Dashboard';
import Faqs from '../admin/faqs';
// import FeaturedRequest from '../admin/featuresCreate';
import HomeBanner from '../admin/homeBanner';
import InstantQuote from '../admin/InstantQuote';
import AdminLogin from '../admin/Login';
import News from '../admin/news';
import Orders from '../admin/orders';
import OrderDetails from '../admin/orders/OrderDetails';
// import Products from '../admin/Products';
// import AddProduct from '../admin/Products/AddProduct';
// import EditProduct from '../admin/Products/EditProduct';
import PromoCode from '../admin/PromoCode/PromoCode';
import RequestQuote from '../admin/RequestQuote';
import Reviews from '../admin/Reviews';
// import Rewards from '../admin/Rewards';
// import Sliders from '../admin/Sliders';
// import SubCategory from '../admin/subCategory';
import Subscribe from '../admin/Subscribe/Subscribe';
// import SubSubCategories from '../admin/SubSubCategories';
import Wrapper from '../admin/Wrapper';
import NotFound from '../pages/404';
import PublicRoute from './PublicRoute';

export default function AdminRoutes() {
  return [
    { 
      path: '/admin/login', 
      element:<PublicRoute><AdminLogin /></PublicRoute>  
    },
    { 
      path: '/admin/*', 
      element: <Wrapper/>,
     children: [
  { path: 'dashboard', element: <Dashboard /> },
  { path: 'customers', element: <Customers /> },
  { path: 'request-quote', element: <RequestQuote /> },
  { path: 'instant-quote', element: <InstantQuote /> },
  { path: 'reviews', element: <Reviews /> },
  { path: 'announcement', element: <Announcement/> },
  { path: 'promo-code', element: <PromoCode/> },
  // { path: 'customer/:id', element: <UpdateCustomers /> },
  // { path: 'products', element: <Products /> },
  { path: 'orders', element: <Orders /> },
  { path: 'order-details/:id', element: <OrderDetails /> },
  // { path: 'rewards', element: <Rewards/> },
  // { path: 'add-product', element: <AddProduct /> },
  // { path: 'edit-product/:id', element: <EditProduct /> },
  { path: 'category', element: <Categories /> },
  // { path: 'sub-categories', element: <SubCategory /> },
  // { path: 'sub-sub-categories', element: <SubSubCategories /> },
  { path: 'home_banner', element: <HomeBanner /> },
  // { path: 'sliders', element: <Sliders /> },
  { path: 'blogs', element: <News /> },
  { path: 'subscribe', element: <Subscribe/> },
  { path: 'faqs', element: <Faqs /> },
  { path: 'contact-us', element: <ContactUs /> },
  // { path: 'featured_request', element: <FeaturedRequest /> }
]
    },
    { path: '/admin/*', element: <NotFound/> }
  ];
}