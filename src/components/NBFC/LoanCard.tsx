import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface LoanProduct {
  id: number;
  is_active: number;
  status: string;
  product_name: string;
  product_type: string;
  roi: string;
  loan_category: string;
  min_tenure: string;
  max_tenure: string;
  bank_share: string;
  nbfc_share: string;
  processing_fee: string;
  partner_id: number;
}

const LoanProductCard: React.FC<{ product: LoanProduct }> = ({ product }) => {

  const navigate = useNavigate();
  const breNav = () => {
    navigate(`/nbfc/product-bre/${product.number}`);
  } 
  return (
    <Card className="rounded-2xl shadow-md w-full max-w-lg py-0">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            {/* Circle Number */}
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              {product.id}
            </div>
            <span className="text-xs text-blue-600 font-semibold">
              Loan Product Code: {product.id}
            </span>
          </div>
          {/* Status Badge */}
          <Badge
            className={
              product.is_active ? "bg-green-500 text-white"
                : "bg-yellow-400 text-black"
            }
          >
            {product.status}
          </Badge>
        </div>

        {/* Loan Info */}
        <h2 className="text-lg font-bold">{product.product_name}</h2>
        <p className="text-xs text-gray-600">{product.product_type
}</p>

        {/* ROI and Purpose */}
        <div className="mt-2 flex gap-4 text-xs">
          <p>
            <span className="font-semibold">ROI:</span> {product.roi}
          </p>
          <p>
            <span className="font-semibold">Product category:</span>{" "}
            {product.loan_category}
          </p>
        </div>

        {/* Overview Section */}
        <div className="mt-3 bg-gray-50 border rounded-xl p-3 text-xs grid grid-cols-2 gap-2">
          <div>
            <p className="text-gray-500">Min Tenure:</p>
            <p className="font-medium">{product.min_tenure}</p>
          </div>
          <div>
            <p className="text-gray-500">Max Tenure:</p>
            <p className="font-medium">{product.max_tenure}</p>
          </div>
          <div>
            <p className="text-gray-500">Split Ratio (Bank:NBFC):</p>
            <p className="font-medium">{Number(product.bank_share)}:{Number(product.nbfc_share)}</p>
          </div>
          <div>
            <p className="text-gray-500">Processing Fee:</p>
            <p className="font-medium">{product.processing_fee
}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4">
           <Button variant="blue"  onClick={breNav}>
              BRE
            </Button>
          <div className="flex gap-2">
            <Button variant="outline" disabled>
              View
            </Button>
            <Button variant="blue" onClick={()=>navigate(`/nbfc/${product.partner_id}/product/${product.id}`)}>Update</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanProductCard;
