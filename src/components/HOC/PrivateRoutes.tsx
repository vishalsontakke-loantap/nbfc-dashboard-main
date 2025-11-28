import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, initialized } = useSelector((state: any) => state.auth);

  // Don't redirect until we know if user is authenticated
  if (!initialized) return null; // or a loader

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoutes;
