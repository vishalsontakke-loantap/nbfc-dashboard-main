import React from "react";
import Toggle from "./Toggle";

interface ParameterRowProps {
  label: string;
  value: string | number;
  weightage: number;
  mandatory: boolean;
  onChange: (field: string, value: any) => void;
}

const ParameterRow: React.FC<ParameterRowProps> = ({
  label,
  value,
  weightage,
  mandatory,
  onChange,
}) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4 border-b py-3">
      <div className="text-gray-700 font-medium">{label}</div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange("value", e.target.value)}
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="number"
        value={weightage}
        onChange={(e) => onChange("weightage", Number(e.target.value))}
        className="border rounded px-2 py-1 w-full"
      />
      <Toggle
        checked={mandatory}
        onChange={(val) => onChange("mandatory", val)}
      />
    </div>
  );
};

export default ParameterRow;
