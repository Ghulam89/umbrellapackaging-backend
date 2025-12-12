
import { useLocation, useRoutes } from 'react-router-dom';
import WebsiteRoutes from './routes/WebsiteRoutes';
import { ToastContainer } from 'react-toastify';
import TopNav from './components/Header/TopNav';
import { Suspense, useEffect, useState, lazy } from 'react';
import Navbar from './components/Header/Navbar';
import WhatsAppFloat from './components/SocialMedia/WhatsAppModal';

// Lazy load Footer since it's at the bottom of the page
const Footer = lazy(() => import('./components/Footer/Footer'));
function App({ serverData, CategoryProducts }) {
  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState('');
 useEffect(() => {
  window.scrollTo({ top: 0, behavior: "instant" });
  setCurrentUrl(window.location.origin + location.pathname + location.search);
}, [location]);
  const routes = WebsiteRoutes({ serverData, CategoryProducts })
  const element = useRoutes(routes);
  return (
    <>
    {/* sd */}
      <ToastContainer />
          <WhatsAppFloat
            phone="+17472470456"
            message={`Hello, I am reaching out to inquire about ${currentUrl}`}
            tooltip="WhatsApp us"
            bottomClass="bottom-5"
            leftClass="left-8"
          />
          <TopNav />
          <Navbar />
           {/* sds */}
         <Suspense fallback={<div className="page-loader" />}>
           {element}
         </Suspense>
       <Suspense fallback={null}>
         <Footer />
       </Suspense>
    </>
  );
}


export default App;