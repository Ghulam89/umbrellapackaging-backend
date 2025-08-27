
import { useLocation, useRoutes } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';
import WebsiteRoutes from './routes/WebsiteRoutes';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer/Footer';
import TopNav from './components/Header/TopNav';
import { useEffect, useState } from 'react';
import Navbar from './components/Header/Navbar';
import WhatsAppFloat from './components/SocialMedia/WhatsAppModal';

function App({ serverData, CategoryProducts }) {
  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentUrl(window.location.href);
  }, [location.pathname]);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const routes = isAdminRoute ? AdminRoutes({ serverData, CategoryProducts }) : WebsiteRoutes({ serverData, CategoryProducts });

  const element = useRoutes(routes);


  return (
    <>
      <ToastContainer />
      {!isAdminRoute && (
        <>
          <WhatsAppFloat
            phone="+17472470456"
            message={`Hello, I am reaching out to inquire about ${currentUrl}`}
            tooltip="WhatsApp us"
            bottomClass="bottom-6"
            leftClass="left-8"
          />
          <TopNav />
          <Navbar />
        </>
      )}
      {element}
      {!isAdminRoute && <Footer />}
    </>
  );
}


export default App;