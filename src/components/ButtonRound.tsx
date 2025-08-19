import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ButtonRound: React.FC<ButtonRoundProps> = ({
  src,
  alt,
  id,
  className,
  progress = 0
}) => {
  return (
    <div className="relative inline-block">
      {progress < 100 && (
        <div className="absolute -translate-1 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-[#0089CF] border-t-transparent border-r-transparent border-b-transparent animate-spin" />
        </div>
      )}

      <Button
        variant="outline"
        className={cn(
          `relative z-10 rounded-full w-10 h-10 p-1 bg-white ${
            progress === 100 ? "border-2 border-[#0089CF]" : "border-none"
          }`,
          className
        )}
      >
        <img
          src={`/images/icons/${src}.svg`}
          alt={alt}
          id={id}
          className={progress !== 100 ? "filter-gray" : ""}
        />
      </Button>
    </div>
  );
};

export default ButtonRound;
