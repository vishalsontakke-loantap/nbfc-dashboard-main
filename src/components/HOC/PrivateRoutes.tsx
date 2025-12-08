import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { SkeletonTableShimmer } from "../ui/skeleton-table";

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, initialized } = useSelector((state: any) => state.auth);
  // Don't redirect until we know if user is authenticated
  if (!initialized) return <SkeletonTableShimmer rows={4} columns={3} /> // or a loader

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoutes;
