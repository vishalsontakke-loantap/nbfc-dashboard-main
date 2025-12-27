import { assetPath } from "@/lib/utils";

interface TooManyRequestsStateProps {
  onRetry?: () => void;
}

export function TooManyRequestsState({ onRetry }: TooManyRequestsStateProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <div className="bg-white rounded-[24px] shadow-lg max-w-[400px] w-full p-12 border-4 border-dashed border-[#00a8ff]">
        <div className="flex flex-col items-center text-center">
          {/* Illustration */}
          <div className="mb-8">
            <img src={assetPath("/error/too_many_req.png")} alt="Too Many Requests Illustration" />
          </div>

          {/* Content */}
          <h2 className="font-['Poppins:Bold',sans-serif] text-[24px] text-[#1d2d3e] mb-3">
            Hang Tight! We're A Bit Busy
          </h2>
          <p className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#62748e] mb-8 leading-relaxed">
            Hold on! Our servers are experiencing high traffic right now. Please take a quick break and try again shortly.
          </p>

          {/* Action Button */}
          <button
            onClick={handleRetry}
            className="bg-[#00a8ff] hover:bg-[#0089cf] text-white font-['Poppins:SemiBold',sans-serif] text-[14px] px-8 py-3 rounded-lg transition-colors duration-200 shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
