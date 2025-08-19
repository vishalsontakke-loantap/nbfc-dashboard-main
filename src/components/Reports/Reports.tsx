import { Card, CardContent } from "@/components/ui/card";
import SegmentsCard from "../SegmentsCard";
import CardHeadline from "../CardHeadline";

const Reports = () => {
  return (
    <div className="grid place-items-center min-h-[89.5dvh] p-5">
      <Card className="scale-95 w-full h-full flex items-center p-10">
        <CardHeadline title="Reports" />
        <CardContent>
          <SegmentsCard
            imgSrc="/images/pool_buyout_segment.svg"
            imgAlt="Pool Buyout Segment"
            badge="Reports"
            heading="Reports"
            subtext="Reports goes here"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
