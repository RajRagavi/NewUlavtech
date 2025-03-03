import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userRole = localStorage.getItem("role"); // Retrieve user role (store this on login)

  if (userRole !== "admin") {
    return <Navigate to="/signin" replace />; 
  }

  return children;
};

export default ProtectedRoute;
