import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { poolBuyoutConfirmModal } from "@/lib/constants";
import { CircleX, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { assetPath } from "@/lib/utils";

export function CollectionConfirmation({data}) {
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    setShowSuccess(true);
  };

  const handleDone = () => {
    setShowSuccess(false);
    navigate("/collection");
  };

  return (
    <>
      {/* === Confirmation Dialog === */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="flex justify-between min-w-[11rem] items-center bg-[#0089CF] hover:bg-[#0089CF]/75">
            <p>Transfer Amount</p>
            <img src={assetPath("/images/icons/upload-2-fill.svg")} alt="" />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="scale-105">
          <AlertDialogHeader>
            <AlertDialogTitle>
              <span className="flex justify-between items-center">
                <h4 className="font-bold">Confirm Transaction</h4>
                <AlertDialogCancel className="border-none shadow-none scale-120 hover:bg-white">
                  <CircleX />
                </AlertDialogCancel>
              </span>
            </AlertDialogTitle>
            <AlertDialogDescription className="max-w-7/8 text-xs">
              You are about to initiate payment for the following 
              batch. Please review the details carefully before confirming.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Details */}
          <section className="grid grid-cols-2 gap-y-2 bg-[#C3EEFF] min-h-[40px] w-full rounded-2xl p-4 text-xs">
            {poolBuyoutConfirmModal.map((item, index) => (
              <React.Fragment key={index}>
                <p className="text-[#1D2D3E]">{item.label}</p>
                <p className="font-bold">{item.value}</p>
              </React.Fragment>
            ))}
          </section>

          {/* Warning Section */}
          <section className="min-h-[40px] w-full flex items-center justify-around">
            <img
              src={assetPath("/images/icons/alert-fill.svg")}
              alt="alert"
              className="scale-130"
            />
            <p className="text-sm text-[#B91C1C] max-w-[25rem]">
              Once confirmed, the payment instruction will be sent to the bank and
              cannot be reversed.
            </p>
          </section>

          {/* Footer */}
          <AlertDialogFooter className="gap-18">
            <AlertDialogCancel className="text-[#0089CF] border-[#0089CF]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#0089CF] hover:bg-[#0089CF]/75"
              onClick={handleConfirm}
            >
              Confirm & Send
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* === Success Dialog === */}
      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent className="scale-105 text-center">
          <AlertDialogHeader>
            <div className="flex flex-col items-center justify-center">
              <CheckCircle2 className="text-green-600 w-12 h-12 mb-2" />
              <AlertDialogTitle className="text-lg font-bold text-green-700">
                Payment Instruction Sent Successfully!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 text-sm mt-2">
                Your Pool Buyout payment has been initiated with Bank.
                <br />
                You will receive a confirmation notification once it’s processed.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogAction
              onClick={handleDone}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Done
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
