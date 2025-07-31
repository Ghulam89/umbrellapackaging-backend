import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("shopzone_admin");
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default PrivateRoute;