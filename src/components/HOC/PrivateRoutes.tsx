import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { SkeletonTableShimmer } from "../ui/skeleton-table";
import { Card, CardContent } from "../ui/card";

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, initialized } = useSelector((state: any) => state.auth);
  // Don't redirect until we know if user is authenticated
  if (!initialized) return <div className="flex flex-col space-y-4 p-3">
    <Card className=" mt-40">
      <CardContent>
        <SkeletonTableShimmer rows={4} columns={3} />
      </CardContent>
    </Card>
  </div> // or a loader
//  return children;
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoutes;
