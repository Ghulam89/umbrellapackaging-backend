import React from "react";
import { Navigate } from "react-router-dom";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);

  React.useEffect(() => {
    const token = localStorage.getItem("shopzone_admin");
    setIsAuthenticated(!!token);
  }, []);

  return isAuthenticated;
};

const PublicRoute = ({ children }) => {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <Navigate to="/admin/dashboard" /> : children;
};

export default PublicRoute;