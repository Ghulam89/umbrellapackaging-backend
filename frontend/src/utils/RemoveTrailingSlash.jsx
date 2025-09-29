// components/RemoveTrailingSlash.jsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RemoveTrailingSlash = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname, search, hash } = location;

    // Ignore root path `/`
    if (pathname !== '/' && pathname.endsWith('/')) {
      const newPath = pathname.slice(0, -1);
      navigate(`${newPath}${search}${hash}`, { replace: true });
    }
  }, [location, navigate]);

  return null; // Doesn't render anything
};

export default RemoveTrailingSlash;
