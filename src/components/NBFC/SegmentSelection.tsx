import { Card, CardContent } from "@/components/ui/card";

import { X } from "lucide-react";
import SegmentsCard from "../SegmentsCard";
import { Link } from "react-router-dom";

const SegmentSelection = () => {
  return (
    <div className="max-w-[300dvh] mx-auto">
      <div className="px-30 py-5">
        <Card className="scale-95 p-5">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">
              Choose the segment you want to onboard for
            </h1>
            <X className="text-muted-foreground cursor-pointer" size={16} />
          </div>
          <hr />
          <p className="font-semibold text-[#333333] text-sm">
            Seamlessly onboard for Co-Lending or Pool Buyout and start your
            journey
          </p>
          <CardContent className="grid grid-cols-2 gap-4 mt-4">
            <Link to={"/nbfc/nbfc-form"}>
              <SegmentsCard
                imgSrc="/images/co-lending_segment.svg"
                imgAlt="Co-Lending Segment"
                heading="Co-Lending"
                subtext="Partner seamlessly to co-lend and scale your lending business."
              />
            </Link>

            <Link to={"/nbfc/nbfc-form"}>
              <SegmentsCard
                imgSrc="/images/pool_buyout_segment.svg"
                imgAlt="Pool Buyout Segment"
                badge="Beta"
                heading="Pool Buyout"
                subtext="Acquire high-quality loan pools with ease and efficiency."
              />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SegmentSelection;
