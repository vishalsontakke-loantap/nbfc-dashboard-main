import React from "react";

interface ProgressBarProps {
  totalSteps: number;
  currentStep: number;
  stepName: string;
  helpEmail?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  totalSteps,
  currentStep,
  stepName,
  helpEmail = "support@ltflow.com",
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full flex items-center justify-between border border-[#3FA9F5] rounded-full px-3 py-1 bg-white">
      {/* Progress Bar */}
      <div className="w-1/3 h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#3FA9F5] rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Text Info */}
      <div className="flex-1 flex justify-between items-center ml-4 text-sm">
        <span>
          Step {currentStep} of {totalSteps} — {stepName}
        </span>
        <span>Need help? {helpEmail}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
