import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as jwtDecode from "jwt-decode";
import { ACCESS_TOKEN } from "../constants";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    try {
      const decoded = jwtDecode(token); // works with named import
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        setIsAuthorized(false); // token expired
      } else {
        setIsAuthorized(true);
      }
    } catch (err) {
      console.error("Token decode error:", err);
      setIsAuthorized(false);
    }
  }, []);

  if (isAuthorized === null) return <div>Loading...</div>;

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
