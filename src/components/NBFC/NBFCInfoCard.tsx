import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

const NBFCInfoCard: React.FC<NBFCInfoProps> = ({ nbfc }) => {
  return (
    <Card className="p-4 shadow-md rounded-2xl">
      {/* Top Row */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Logo */}
          {nbfc.logoUrl && (
            <img
              src={nbfc.logoUrl}
              alt="NBFC Logo"
              className="w-10 h-10 rounded-full"
            />
          )}

          <div>
            <h1 className="text-sm font-bold flex items-center gap-2">
              {nbfc.name}
              <Badge className="bg-green-500 text-white">Verified</Badge>
            </h1>
            <p className="text-xs text-gray-600">CIN: {nbfc.cin}</p>
          </div>
        </div>

        <div className="text-xs text-gray-700 text-right">
          <p className="text-gray-500 text-xs">Date of Registration</p>
          <p className="font-semibold">{nbfc.registrationDate}</p>
        </div>
      </div>

      {/* Second Row with 6 columns */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-4 text-sm">
        <div>
          <p className="text-gray-500 text-xs">NBFC Name</p>
          <p className="font-medium text-xs">{nbfc.name}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Date of Impairment</p>
          <p className="font-medium text-xs">{nbfc.impairmentDate}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">RBI License Number</p>
          <p className="font-medium text-xs">{nbfc.rbiLicenseNumber}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Open Issues</p>
          <p className="font-medium text-xs">{nbfc.openIssues}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">NBFC Code</p>
          <p className="font-medium text-xs">{nbfc.nbfcCode}</p>
        </div>

        {/* View More column */}
        <div className="flex items-center justify-end">
          <Button size="sm" variant="outline">
            View More ▾
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NBFCInfoCard;
