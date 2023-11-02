import { useAuth } from "../AuthContext";
import { Navigate, Route } from "react-router-dom";

export const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/home" replace />;
};
