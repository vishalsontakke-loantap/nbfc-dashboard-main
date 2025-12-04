import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import NBFCInfoCard from "../NBFC/NBFCInfoCard";
import LoanCard from "../NBFC/LoanCard";
import { NBFCInfoSkeleton, LoanCardSkeleton } from "@/components/ui/SkeletonLoader";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductsByPartnerIdQuery } from "@/redux/features/products/productApi";

interface NBFCData {
  name: string;
  cin: string;
  registrationDate: string;
  impairmentDate: string;
  rbiLicenseNumber: string;
  openIssues: string;
  nbfcCode: string;
}

interface LoanProduct {
  id: number;
  number: number;
  code: string;
  name: string;
  type: string;
  roi: string;
  purpose: string;
  tenure: string;
  splitRatio: string;
  maxLoan: string;
  processingFee: string;
  status: string;
}

interface LoanData {
  nbfc: NBFCData;
  products: LoanProduct[];
}

export default function LoanProducts() {
  // const [data, setData] = useState<LoanData | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: productsData, isLoading, error } = useGetProductsByPartnerIdQuery(id);
  console.log("NBFC ID from params:", id, productsData);

  const addNewLoanProduct =()=>{
    navigate(`/nbfc/${id}/product`);
  }


  // useEffect(() => {
  //   setTimeout(() => {
  //     setData(dummyData);
  //   }, 1500); // Simulate loading delay
  // }, []);

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        {/* NBFC Info Skeleton */}
        <NBFCInfoSkeleton />

        {/* Loan Products Skeleton */}
        <div className="grid md:grid-cols-2 gap-6 bg-white mb-6 p-6 shadow">
          <LoanCardSkeleton />
          <LoanCardSkeleton />
          <div className="flex justify-center">
            <div className="h-10 w-48 rounded-md bg-gray-200 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }
  console.log("Fetched Products Data:", productsData);
  return (
    <div className="p-6 space-y-6">
      {/* NBFC Info Component */}
      <NBFCInfoCard  />

      {/* Loan Products */}
      <div className="bg-white mb-6 p-6 shadow">
        <div className="grid md:grid-cols-2 gap-6">
          {productsData?.data.products.map((product:any) => (
            <div key={product.id} className="h-full">
              <LoanCard product={product} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <Button variant="blue" onClick={addNewLoanProduct}>
            Add New Loan Product
          </Button>
        </div>
      </div>

    </div>

  );
}
