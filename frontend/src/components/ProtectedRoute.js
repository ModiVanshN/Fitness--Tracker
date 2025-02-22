import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem("accessToken"); // Check login status
  const location = useLocation();
  const [fade, setFade] = useState(1);
  const [showMessage, setShowMessage] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowMessage(true); // Show message first

      // Start fade-out effect after 1 second
      setTimeout(() => setFade(0), 1000);

      // Redirect after 2 seconds
      setTimeout(() => setRedirect(true), 2000);
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return <Outlet />;
  }

  if (redirect) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    showMessage && (
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          opacity: fade,
          transition: "opacity 1s ease-out",
        }}
      >
        <p style={{ fontSize: "20px", fontWeight: "bold", color: "red" }}>
          Please log in first. Redirecting to login...
        </p>
      </div>
    )
  );
};

export default ProtectedRoute;
