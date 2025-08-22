import { Badge } from "@/components/ui/badge";



const SegmentsCard = ({
  imgSrc,
  imgAlt,
  heading,
  subtext,
  badge,
}: myCardComponents) => {
  return (
    <div className="cursor-pointer border w-full rounded-md overflow-hidden flex flex-col h-[280px]">
    <div className="h-1/2">
      <img
        src={imgSrc}
        alt={imgAlt}
        className="w-full h-full object-cover"
      />
    </div>
  
    <div className="flex flex-col p-3 flex-1">
      <span className="flex space-x-2 items-center">
        <h2 className="font-bold text-base">{heading}</h2>
        {badge && (
          <Badge variant="destructive" className="text-xs font-semibold">
            {badge}
          </Badge>
        )}
      </span>
      <p className="text-sm text-muted-foreground mt-2 break-words whitespace-normal line-clamp-3">
        {subtext}
      </p>
    </div>
  </div>
  
  );
};

export default SegmentsCard;
