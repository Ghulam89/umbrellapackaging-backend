
import { useLocation, useRoutes } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';
import WebsiteRoutes from './routes/WebsiteRoutes';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer/Footer';
import TopNav from './components/Header/TopNav';
import { useEffect } from 'react';
import Navbar from './components/Header/Navbar';

function App({ serverData, CategoryProducts }) {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const routes = isAdminRoute ? AdminRoutes({ serverData, CategoryProducts }) : WebsiteRoutes({ serverData, CategoryProducts });

  const element = useRoutes(routes);

  return (
    <>
      <ToastContainer />
      {!isAdminRoute && (
        <>
          <TopNav/>
          <Navbar/>
        </>
      )}
      {element}
      {!isAdminRoute && <Footer/>}
    </>
  );
}


export  default App;