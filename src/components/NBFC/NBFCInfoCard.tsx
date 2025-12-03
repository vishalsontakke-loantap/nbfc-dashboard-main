import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetNbfcDetailsQuery } from "@/redux/features/nbfc/nbfcApi";
import { useNavigate, useParams } from "react-router-dom";

interface NBFCInfoProps {
  nbfc: {
    logoUrl?: string;
    name: string;
    cin: string;
    registrationDate: string;
    impairmentDate: string;
    rbiLicenseNumber: string;
    openIssues: string;
    nbfcCode: string;
  };
}

const NBFCInfoCard: React.FC = () => {
   const { id } = useParams();
   const navigate = useNavigate();
  const {data: nbfcData, isLoading, error} = useGetNbfcDetailsQuery(id);
  return (
    <Card className="p-4 shadow-md rounded-2xl">
      {/* Top Row */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Logo */}
          {/* {nbfc.logoUrl && (
            <img
              src={nbfc.logoUrl}
              alt="NBFC Logo"
              className="w-10 h-10 rounded-full"
            />
          )} */}

          <div>
            <h1 className="text-sm font-bold flex items-center gap-2">
              {nbfcData?.data.nbfc_name}
              <Badge className="bg-green-500 text-white">Verified</Badge>
            </h1>
            <p className="text-xs text-gray-600">Registration Number: {nbfcData?.data.registration_number}</p>
          </div>
        </div>

        <div className="text-xs text-gray-700 text-right">
          <p className="text-gray-500 text-xs">Date of Incorporation</p>
          <p className="font-semibold">{nbfcData?.data.date_of_incorporation}</p>
        </div>
      </div>

      {/* Second Row with 6 columns */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-4 text-sm">
        <div>
          <p className="text-gray-500 text-xs">Business Limit</p>
          <p className="font-medium text-xs">{nbfcData?.data.business_limit}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Date of Impairment</p>
          <p className="font-medium text-xs">{nbfcData?.data.impairmentDate}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Contact Person</p>
          <p className="font-medium text-xs">{nbfcData?.data.contact_person}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Contact Email</p>
          <p className="font-medium text-xs">{nbfcData?.data.contact_email}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Phone Number</p>
          <p className="font-medium text-xs">{nbfcData?.data.phone_number}</p>
        </div>

        {/* View More column */}
        <div className="flex items-center justify-end">
          <Button size="sm" variant="outline" onClick={() => {navigate(`/onboarding/nbfc-form/${id}`)}}>
            View More ▾
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NBFCInfoCard;
