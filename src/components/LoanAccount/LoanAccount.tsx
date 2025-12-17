import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import CardHeader from "../CardHeader";
import { SkeletonTableShimmer } from "../ui/skeleton-table";

import ActiveAccount from "./ActiveAccounts";
// import ClosedAccount from "./ClosedAccount"; // use later if needed

const LoanAccount = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col space-y-4 p-5">
      <CardHeader title="Loan Accounts" />

      {loading ? (
        <Card className="mt-40">
          <CardContent>
            <SkeletonTableShimmer rows={4} columns={3} />
          </CardContent>
        </Card>
      ) : (
        <ActiveAccount />
      )}
    </div>
  );
};

export default LoanAccount;
