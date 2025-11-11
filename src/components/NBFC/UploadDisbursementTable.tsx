import React, { useState } from "react";

type Field = {
  label: string;
  suggestions: string[];
  required: boolean;
};

const fields: Field[] = [
  { label: "Customer Name", suggestions: ["Customer_name", "cs_name"], required: true },
  { label: "Loan Account Number", suggestions: ["Loan_ID", "Loan_Account_Number"], required: true },
  { label: "Sanctioned Amount", suggestions: ["Sanctioned_Amount", "Loan_Amount"], required: true },
  { label: "Disbursed Amount", suggestions: ["Disbursed_Amount"], required: false },
  { label: "Disbursement Date", suggestions: ["Disbursement_Date"], required: false },
  { label: "Tenure (in months)", suggestions: ["Tenure", "Loan_Term"], required: true },
  { label: "Interest Rate (%)", suggestions: ["Interest_Rate", "ROI"], required: true },
];

const UploadDisbursementTable: React.FC = () => {
  const [fieldStates, setFieldStates] = useState(
    fields.map((f) => ({ ...f }))
  );

  const toggleRequired = (index: number) => {
    const updated = [...fieldStates];
    updated[index].required = !updated[index].required;
    setFieldStates(updated);
  };

  return (
    <div className="bg-sky-50 p-4 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-3">
        <h2 className="font-semibold">Upload Disbursement File</h2>
        <button className="border px-3 py-1 text-sm rounded-md bg-white shadow hover:bg-gray-50">
          Export Sample File ⌄
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-2 border">Platform Field</th>
              <th className="p-2 border">Expected Column Name (from NBFC file)</th>
              <th className="p-2 border">Required</th>
            </tr>
          </thead>
          <tbody>
            {fieldStates.map((field, index) => (
              <tr key={field.label} className="hover:bg-gray-50">
                <td className="p-2 border">{field.label}</td>
                <td className="p-2 border">
                  <div className="flex flex-wrap gap-2 items-center border rounded px-2 py-1">
                    <input
                      type="text"
                      placeholder="Text Input"
                      className="border rounded px-2 py-1 text-sm"
                    />
                    {field.suggestions.map((s) => (
                      <span
                        key={s}
                        className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => toggleRequired(index)}
                    className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${
                      field.required ? "bg-red-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        field.required ? "translate-x-4" : ""
                      }`}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UploadDisbursementTable;
