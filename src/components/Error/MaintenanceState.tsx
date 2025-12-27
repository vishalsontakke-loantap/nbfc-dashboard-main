import { assetPath } from "@/lib/utils";

interface MaintenanceStateProps {
  onRefresh?: () => void;
}

export function MaintenanceState({ onRefresh }: MaintenanceStateProps) {
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <div className="bg-white rounded-[24px] shadow-lg max-w-[400px] w-full p-12">
        <div className="flex flex-col items-center text-center">
          {/* Illustration */}
          <div className="mb-8">
            <img src={assetPath("/error/fail_to_load.png")} alt="Maintenance Illustration" />
          </div>

          {/* Content */}
          <h2 className="font-['Poppins:Bold',sans-serif] text-[24px] text-[#1d2d3e] mb-3">
            We'll Be Right Back!
          </h2>
          <p className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#62748e] mb-8 leading-relaxed">
            We're making some updates to give you a better experience. Check back shortly—we'll be done in no time!
          </p>

          {/* Action Button */}
          <button
            onClick={handleRefresh}
            className="bg-[#00a8ff] hover:bg-[#0089cf] text-white font-['Poppins:SemiBold',sans-serif] text-[14px] px-8 py-3 rounded-lg transition-colors duration-200 shadow-md"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
