import { Badge } from "@/components/ui/badge";



const SegmentsCard = ({
  imgSrc,
  imgAlt,
  heading,
  subtext,
  badge,
}: myCardComponents) => {
  return (
    <div className="border h-[53dvh] w-full rounded-md">
      <div>
        <img src={imgSrc} alt={imgAlt} className={"w-full"} />
        <span className="flex flex-col p-3">
          <span className="flex space-x-2 items-center">
          <h3 className="font-bold text-sm">{heading}</h3>
            {badge && (
              <Badge variant={'destructive'} className="text-xs font-semibold">{badge}</Badge>
            )}
          </span>
          <p className="text-xs text-muted-foreground mt-2 break-words whitespace-normal">
        {subtext}
      </p>
        </span>
      </div>
    </div>
  );
};

export default SegmentsCard;
