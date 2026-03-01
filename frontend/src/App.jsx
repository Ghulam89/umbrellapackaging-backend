import { useLocation, useRoutes } from 'react-router-dom';
import WebsiteRoutes from './routes/WebsiteRoutes';
import { ToastContainer } from 'react-toastify';
import TopNav from './components/Header/TopNav';
import { useEffect, useState } from 'react';
import Navbar from './components/Header/Navbar';
import WhatsAppFloat from './components/SocialMedia/WhatsAppModal';
import Footer from './components/Footer/Footer';

function App({ serverData, CategoryProducts, bannerData }) {
  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState('');
  const getTransitionClass = (p) => {
    if (p.startsWith('/sub-category/') || p.startsWith('/category/')) return 'route-transition route-slide';
    if (p.startsWith('/blog/') || p === '/') return 'route-transition route-fade';
    return 'route-transition route-fade';
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setCurrentUrl(window.location.origin + location.pathname + location.search);
  }, [location]);

  const routes = WebsiteRoutes(serverData, CategoryProducts, bannerData);
  const element = useRoutes(routes);

  return (
    <>
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
      <div key={location.pathname} className={getTransitionClass(location.pathname)}>
        {element}
      </div>
      <Footer />
    </>
  );
}

export default App;
