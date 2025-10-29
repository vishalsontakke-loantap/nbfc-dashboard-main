import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import SegmentsCard from "../SegmentsCard";
import BuyoutCardInfo from "./BuyoutCardInfo";
import { useState } from "react";
import ProgressBar from "../ProgressBar";

const SegmentSelection = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(
    "Pool Buyout"
  );

  const handleCardClick = (heading: string) => {
    setSelectedCard(heading);
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div className="max-w-[300dvh] mx-auto">
      <div>
        <Card className="scale-95 p-5">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">
              Choose the segment you want to onboard for
            </h1>
            <X className="text-muted-foreground cursor-pointer" size={16} />
          </div>
          <hr />
          <p className="font-semibold text-[#333333] text-sm mt-2">
            Seamlessly onboard for Co-Lending or Pool Buyout and start your
            journey
          </p>

          <CardContent className="grid grid-cols-4 gap-4 mt-4">
            {/* Pool Buyout */}
            <div
              onClick={() => handleCardClick("Pool Buyout")}
              className={`cursor-pointer rounded-xl p-1 transition ${
                selectedCard === "Pool Buyout"
                  ? "bg-blue-100 ring-2 ring-blue-400"
                  : "bg-transparent"
              }`}
            >
              <SegmentsCard
                imgSrc="/images/Pool.svg"
                imgAlt="Pool Buyout Segment"
                badge="Beta"
                heading="Pool Buyout"
                subtext="Acquire high-quality loan pools with ease and efficiency."
              />
            </div>

            {/* Co-Lending */}
            <div
              onClick={() => handleCardClick("Co-Lending Segment")}
              className={`cursor-pointer rounded-xl p-1 transition ${
                selectedCard === "Co-Lending Segment"
                  ? "bg-blue-100 ring-2 ring-blue-400"
                  : "bg-transparent"
              }`}
            >
              <SegmentsCard
                imgSrc="/images/co-landing.svg"
                imgAlt="Co-Lending Segment"
                heading="Co-Lending"
                subtext="Partner seamlessly to co-lend and scale your lending business."
              />
            </div>

            {/* Loan Product Management */}
            <div
              onClick={() => handleCardClick("Loan Product Management")}
              className={`cursor-pointer rounded-xl p-1 transition ${
                selectedCard === "Loan Product Management"
                  ? "bg-blue-100 ring-2 ring-blue-400"
                  : "bg-transparent"
              }`}
            >
              <SegmentsCard
                imgSrc="/images/loan_product.svg"
                imgAlt="Loan Product Management"
                heading="Loan Product Management"
                subtext="Centralized platform to create, configure & manage loan offerings."
              />
            </div>

            {/* Loan Marketplace */}
            <div
              onClick={() => handleCardClick("Loan Marketplace")}
              className={`cursor-pointer rounded-xl p-1 transition ${
                selectedCard === "Loan Marketplace"
                  ? "bg-blue-100 ring-2 ring-blue-400"
                  : "bg-transparent"
              }`}
            >
              <SegmentsCard
                imgSrc="/images/loan_market_place.svg"
                imgAlt="Loan Marketplace"
                badge="Beta"
                heading="Loan Marketplace"
                subtext="Digital marketplace to source, distribute, and track loan leads."
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Card Below */}
      {selectedCard && (
        <BuyoutCardInfo
          title={selectedCard}
          subtitle="Streamlined disbursal with transparent bank-NBFC splits, automated settlement, and live compliance checks."
          capabilities={[
            { text: "Partner onboarding & product setup" },
            { text: "Automated BRE integration" },
            { text: "Secure compliance tracking" },
          ]}
          functionalities={[
            {
              text: "Real-time disbursement",
              img: "/images/functionlity1.svg",
            },
            {
              text: "Automated reconciliation",
              img: "/images/functionlity2.svg",
            },
            {
              text: "MIS, reporting & audit logs",
              img: "/images/functionlity3.svg",
            },
          ]}
          onContinue={() => alert("Onboarding started!")}
          continueHref="/nbfc/nbfc-segment"
          policyHref=""
        />
      )}

      <div className="p-6">
        <ProgressBar totalSteps={4} currentStep={1} stepName="Product Setup" />
      </div>
    </div>
  );
};

export default SegmentSelection;
