import React, { useState } from "react";
import ParameterRow from "./ParameterRow";

interface Parameter {
  label: string;
  value: string | number;
  weightage: number;
  mandatory: boolean;
}

interface ConfigFormProps {
  title: string;
  initialParams: Parameter[];
}

const ConfigForm: React.FC<ConfigFormProps> = ({ title, initialParams }) => {
  const [params, setParams] = useState(initialParams);
  const [weightage, setWeightage] = useState(25);

  const handleChange = (index: number, field: string, value: any) => {
    const updated = [...params];
    (updated[index] as any)[field] = value;
    setParams(updated);
  };

  return (
    <div className="bg-blue-100 rounded-lg shadow-md p-3 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm">Weightage</span>
          <input
            type="number"
            value={weightage}
            onChange={(e) => setWeightage(Number(e.target.value))}
            className="border rounded px-2 py-1 w-20"
          />
          <span>%</span>
        </div>
      </div>

      <div className="grid grid-cols-4 font-semibold text-gray-600 border-b pb-2 mb-2">
        <div>Parameters</div>
        <div>Value</div>
        <div>Weightage</div>
        <div>Mandatory</div>
      </div>

      {params.map((param, idx) => (
        <ParameterRow
          key={idx}
          label={param.label}
          value={param.value}
          weightage={param.weightage}
          mandatory={param.mandatory}
          onChange={(field, value) => handleChange(idx, field, value)}
        />
      ))}
    </div>
  );
};

export default ConfigForm;
