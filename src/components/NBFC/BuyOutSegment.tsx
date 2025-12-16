import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import OptionCard from "./OptionCard";
import { FaHandshake, FaLayerGroup } from "react-icons/fa";
import ProgressBar from "../ProgressBar";

const BuyOutSegment: React.FC = () => {
  const [selected, setSelected] = useState<string>("DA");

  return (
    <div className="max-w-[300dvh] mx-auto">
      <Card className="scale-95 p-5">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">
            Choose the segment you want to onboard for
          </h1>
          <X className="text-muted-foreground cursor-pointer" size={16} />
        </div>

        <hr className="my-2" />

        {/* Subtitle */}
        <p className="font-semibold text-[#333333] text-sm mt-2">
          Seamlessly onboard for Pool Buyout or Pool Buyout and start your
          journey
        </p>

        {/* Options */}
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 place-items-center">
          <OptionCard
            title="Direct Assignment (DA)"
            description="NBFC directly sells loan pool to bank, transferring ownership and risk without intermediaries."
            icon={<FaHandshake className="text-blue-500 text-4xl" />}
            buttonText="Continue"
            selected={selected === "DA"}
            onClick={() => setSelected("DA")}
          />

          <OptionCard
            title="Pass-Through Certificates"
            description="NBFC pools loans into SPV, which issues securities to banks/investors with risk shared."
            icon={<FaLayerGroup className="text-blue-400 text-4xl" />}
            buttonText="Continue"
            selected={selected === "PTC"}
            onClick={() => setSelected("PTC")}
          />
        </CardContent>
      </Card>
      
      <div className="p-3">
        <ProgressBar totalSteps={4} currentStep={2} stepName="Segment" />
      </div>
    </div>
    
  );
};

export default BuyOutSegment;
