import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, initialized } = useSelector((state: any) => state.auth);
  // Don't redirect until we know if user is authenticated
console.log("Private Route Auth:", isAuthenticated, "Initialized:", initialized);

  if (!initialized) return null; // or a loader
console.log("Private Route Auth:", isAuthenticated, "Initialized:", initialized);

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoutes;
