import { Card, CardContent } from "@/components/ui/card";
import SegmentsCard from "../SegmentsCard";
import CardHeadline from "../CardHeadline";
import { assetPath } from "@/lib/utils";

const Help = () => {
  return (
    <div className="grid place-items-center min-h-[89.5dvh] p-5">
      <Card className="scale-95 w-full h-full flex items-center p-10">
        <CardHeadline title="Help" />
        <CardContent>
          <SegmentsCard
            imgSrc={assetPath("/images/pool_buyout_segment.svg")}
            imgAlt="Pool Buyout Segment"
            badge="Help"
            heading="Help"
            subtext="Help goes here"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
