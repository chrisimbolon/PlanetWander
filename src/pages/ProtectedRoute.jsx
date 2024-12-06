/* eslint-disable react/prop-types */

// import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
// import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  // const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Render the protected component if authenticated
  return children;
  // useEffect(
  //   function () {
  //     if (!isAuthenticated) navigate("/");
  //   },
  //   [isAuthenticated, navigate]
  // );
  // return isAuthenticated ? children : null;
}

export default ProtectedRoute;
