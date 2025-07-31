
import Customers from '../admin/Customer';
import Dashboard from '../admin/dashboard/Dashboard';
import InstantQuote from '../admin/InstantQuote';
import AdminLogin from '../admin/Login';
import RequestQuote from '../admin/RequestQuote';
import Reviews from '../admin/Reviews';
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
        { path: 'dashboard', element: <Dashboard/> },
        { path: 'customers', element: <Customers/> },
        {path:"request-quote", element:<RequestQuote />},
         {path:"instant-quote", element:<InstantQuote/>},
          { path:"reviews", element:<Reviews />}
        
      ]
    },
    { path: '/admin/*', element: <NotFound/> }
  ];
}