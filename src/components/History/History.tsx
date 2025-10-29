import { Card, CardContent } from "@/components/ui/card";
import SegmentsCard from "../SegmentsCard";
import CardHeadline from "../CardHeadline";
import { assetPath } from "@/lib/utils";

const History = () => {
  return (
    <div className="grid place-items-center min-h-[89.5dvh] p-5">
      <Card className="scale-95 w-full h-full flex items-center p-10">
        <CardHeadline title="History" />
        <CardContent>
          <SegmentsCard
            imgSrc={assetPath("/images/pool_buyout_segment.svg")}
            imgAlt="Pool Buyout Segment"
            badge="History"
            heading="History"
            subtext="History goes here"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
