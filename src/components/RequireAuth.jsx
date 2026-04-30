// RequireAuth.jsx
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("authToken");

  return token ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;
