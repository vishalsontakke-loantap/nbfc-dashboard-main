import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { SkeletonTableShimmer } from "../ui/skeleton-table";

import PendingApplication from "../Application/PendingApplications";
// import RejectedApplication from "../Application/RejectedApplications";
// import ApprovedApplication from "../Application/ApprovedApplications";

const Application = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col space-y-4 p-3">
      {loading ? (
        <Card className="mt-40">
          <CardContent>
            <SkeletonTableShimmer rows={4} columns={3} />
          </CardContent>
        </Card>
      ) : (
        <PendingApplication />
      )}
    </div>
  );
};

export default Application;
