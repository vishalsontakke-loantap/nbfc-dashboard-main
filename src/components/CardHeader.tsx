import { forwardRef, useImperativeHandle, useRef } from "react";
import { clampPercentage, cn, assetPath } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const CardHeader = forwardRef<CardHeaderHandle, CardHeaderProps>(
  ({ title, subtitle, pclassName, weightage = false }, ref) => {
    // Internal ref to the real <input> DOM node
    const inputRef = useRef<HTMLInputElement>(null);

    // Expose just the API you want via the parent ref
    useImperativeHandle(
      ref,
      () => ({
        getValue: () => inputRef.current?.value ?? "",
      }),
      []
    );

    return (
      <span className="flex items-center justify-start min-w-[100dvh]">
        <span>
          <h2 className="font-bold text-lg">{title}</h2>
          <p className={cn("text-sm text-muted-foreground", pclassName)}>
            {subtitle}
          </p>
        </span>
        {weightage && (
          <span className="ml-60 flex items-center justify-center text-sm font-semibold text-gray-500 space-x-2">
            Weightage
            <Input
              // Attach internal ref
              ref={inputRef}
              type="number"
              className="w-[70px] ml-2 text-sm text-center border-gray-300 bg-white rounded-md focus:ring-0 focus:border-gray-300"
              min={0}
              max={100}
              step={0.1}
              placeholder={`${(
                Math.random() * 9 +
                1
              ).toFixed(1)}`}
              onChange={(e) => {
                const num = parseFloat(e.target.value);
                if (inputRef.current) {
                  inputRef.current.value = clampPercentage(num).toString();
                }
              }}
            />
            <img src={assetPath("/images/icons/weightage_icon.svg")} alt="edit" />
          </span>
        )}
      </span>
    );
  }
);

export default CardHeader;