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
import { CircleX } from "lucide-react";

export function PoolBuyoutConfirmation() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [prn, setPrn] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const generated = `PRN-${Date.now().toString().slice(-8)}`;
      setPrn(generated);
      setIsProcessing(false);
      setIsSuccess(true);
    }, 800);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="flex justify-between min-w-[11rem] items-center bg-[#0089CF] hover:bg-[#0089CF]/75">
          <p>Disbursed Total POS Amount</p>
          <img src="/images/icons/upload-2-fill.svg" alt="" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="scale-105">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <span className="flex justify-between items-center">
              <h4 className="font-bold">Confirm Pool Buyout Payment</h4>
              <AlertDialogCancel className="border-none shadow-none scale-120 hover:bg-white">
                <CircleX />
              </AlertDialogCancel>
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription className="max-w-7/8 text-xs">
            You are about to initiate payment for the following Pool Buyout
            batch. Please review the details carefully before confirming.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {!isSuccess ? (
          <>
            <section className="grid grid-cols-2 gap-y-2 bg-[#C3EEFF] min-h-[40px] w-full rounded-2xl p-4 text-xs">
              {poolBuyoutConfirmModal.map((item, index) => (
                <React.Fragment key={index}>
                  <p className="text-[#1D2D3E]">{item.label}</p>
                  <p className="font-bold">{item.value}</p>
                </React.Fragment>
              ))}
            </section>
            <section className="min-h-[40px] w-full flex items-center justify-around">
              <img
                src="/images/icons/alert-fill.svg"
                alt="alert"
                className="scale-130"
              />
              <p className="text-sm text-[#B91C1C] max-w-[25rem]">
                Once confirmed, the payment instruction will be sent to the bank and
                cannot be reversed.
              </p>
            </section>
          </>
        ) : (
          <section className="w-full space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#D1FAE5] flex items-center justify-center text-[#065F46] font-bold">
                ✓
              </div>
              <div>
                <h4 className="font-bold">Payment Sent Successfully</h4>
                <p className="text-xs text-slate-600">Payment instruction sent to bank</p>
              </div>
            </div>

            <div className="bg-[#F3F4F6] p-3 rounded-md text-xs">
              <p className="text-[#1D2D3E]">Payment Reference (PRN)</p>
              <p className="font-bold">{prn}</p>
            </div>

            <section className="grid grid-cols-2 gap-y-2 bg-[#C3EEFF] min-h-[40px] w-full rounded-2xl p-4 text-xs">
              {poolBuyoutConfirmModal.map((item, index) => (
                <React.Fragment key={index}>
                  <p className="text-[#1D2D3E]">{item.label}</p>
                  <p className="font-bold">{item.value}</p>
                </React.Fragment>
              ))}
            </section>
          </section>
        )}
        <AlertDialogFooter className="gap-18">
          <AlertDialogCancel className="text-[#0089CF] border-[#0089CF]">
            {isSuccess ? "Close" : "Cancel"}
          </AlertDialogCancel>
          {!isSuccess ? (
            <Button
              onClick={handleConfirm}
              disabled={isProcessing}
              className="bg-[#0089CF] hover:bg-[#0089CF]/75 text-white"
            >
              {isProcessing ? "Sending..." : "Confirm & Send"}
            </Button>
          ) : (
            <AlertDialogAction className="bg-[#0089CF] hover:bg-[#0089CF]/75">
              Done
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
