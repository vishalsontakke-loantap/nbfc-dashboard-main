import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LoanProduct {
  number: number;
  code: string;
  status: string;
  name: string;
  type: string;
  roi: string;
  purpose: string;
  tenure: string;
  splitRatio: string;
  maxLoan: string;
  processingFee: string;
}

const LoanProductCard: React.FC<{ product: LoanProduct }> = ({ product }) => {
  return (
    <Card className="rounded-2xl shadow-md w-full max-w-lg py-0">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            {/* Circle Number */}
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              {product.number}
            </div>
            <span className="text-xs text-blue-600 font-semibold">
              Loan Product Code: {product.code}
            </span>
          </div>
          {/* Status Badge */}
          <Badge
            className={
              product.status === "Active"
                ? "bg-green-500 text-white"
                : "bg-yellow-400 text-black"
            }
          >
            {product.status}
          </Badge>
        </div>

        {/* Loan Info */}
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="text-xs text-gray-600">{product.type}</p>

        {/* ROI and Purpose */}
        <div className="mt-2 flex gap-4 text-xs">
          <p>
            <span className="font-semibold">ROI:</span> {product.roi}
          </p>
          <p>
            <span className="font-semibold">Purpose of Loan:</span>{" "}
            {product.purpose}
          </p>
        </div>

        {/* Overview Section */}
        <div className="mt-3 bg-gray-50 border rounded-xl p-3 text-xs grid grid-cols-2 gap-2">
          <div>
            <p className="text-gray-500">Tenure (Months):</p>
            <p className="font-medium">{product.tenure}</p>
          </div>
          <div>
            <p className="text-gray-500">Max Loan:</p>
            <p className="font-medium">{product.maxLoan}</p>
          </div>
          <div>
            <p className="text-gray-500">Split Ratio (Bank:NBFC):</p>
            <p className="font-medium">{product.splitRatio}</p>
          </div>
          <div>
            <p className="text-gray-500">Processing Fee:</p>
            <p className="font-medium">{product.processingFee}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-xs text-gray-500">🔗 BRE Linked</p>
          <div className="flex gap-2">
            <Button variant="outline" disabled>
              View
            </Button>
            <Button variant="blue">Update</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanProductCard;
