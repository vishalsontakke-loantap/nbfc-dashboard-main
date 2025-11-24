import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import NBFCInfoCard from "../NBFC/NBFCInfoCard";
import LoanCard from "../NBFC/LoanCard";
import { NBFCInfoSkeleton, LoanCardSkeleton } from "@/components/ui/SkeletonLoader";
import { useNavigate } from "react-router-dom";

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

const dummyData: LoanData = {
  nbfc: {
    name: "Muthoot Finance Private Limited",
    cin: "L65910KL1997PLC011300",
    registrationDate: "04/10/2025",
    impairmentDate: "04/10/2025",
    rbiLicenseNumber: "MF/068/11/03",
    openIssues: "MF/068/11/03",
    nbfcCode: "MFL0008123",
  },
  products: [
    {
      id: 1,
      number: 1,
      code: "MFL00001",
      name: "Education Loan",
      type: "Unsecured Loan",
      roi: "10.01",
      purpose: "Master’s degree",
      tenure: "12 – 84",
      splitRatio: "70% : 30%",
      maxLoan: "₹25,00,000",
      processingFee: "05.50%",
      status: "Under Review",
    },
    {
      id: 2,
      number: 2,
      code: "MFL00002",
      name: "Home Loan",
      type: "Secured Loan",
      roi: "10.01",
      purpose: "House Renovation",
      tenure: "12 – 84",
      splitRatio: "70% : 30%",
      maxLoan: "₹25,00,000",
      processingFee: "05.50%",
      status: "Active",
    },
  ],
};

export default function LoanProducts() {
  const [data, setData] = useState<LoanData | null>(null);
  const navigate = useNavigate();

  const addNewLoanProduct =()=>{
    //functionality to add new loan product
    navigate("/loan-products");
  }


  useEffect(() => {
    setTimeout(() => {
      setData(dummyData);
    }, 1500); // Simulate loading delay
  }, []);

  if (!data) {
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

  return (
    <div className="p-6 space-y-6">
      {/* NBFC Info Component */}
      <NBFCInfoCard nbfc={data.nbfc} />

      {/* Loan Products */}
      <div className=" bg-white mb-6 p-6 shadow">

      <div className="grid md:grid-cols-2 gap-6">
        {data.products.map((product) => (
          <LoanCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
          <Button variant="blue" onClick={addNewLoanProduct}>Add New Loan Product</Button>
        </div>
    </div>
    </div>

  );
}
