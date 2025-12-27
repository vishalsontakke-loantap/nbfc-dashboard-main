import { useNavigate } from "react-router-dom";
import { assetPath } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  buttonText?: string;
}

export function ErrorState({ 
  title = "Something Went Wrong",
  message = "We encountered an error while loading this page. Please try refreshing or return to the home page.",
  onRetry,
  buttonText = "Back to Home"
}: ErrorStateProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onRetry) {
      navigate("/");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <div className=" max-w-[450px] w-full p-12">
        <div className="flex flex-col items-center text-center">
          {/* Illustration */}
          <div className="mb-8">
           <img src={assetPath("/error/fail_to_load.png")} alt="Error Illustration" />
          </div>

          {/* Content */}
          <h2 className="font-['Poppins:Bold',sans-serif] text-[24px] text-[#1d2d3e] mb-3">
            {title}
          </h2>
          <p className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#62748e] mb-8 leading-relaxed">
            {message}
          </p>

          {/* Action Button */}
          <button
            onClick={handleClick}
            className="bg-[#00a8ff] hover:bg-[#0089cf] text-white font-['Poppins:SemiBold',sans-serif] text-[14px] px-8 py-3 rounded-lg transition-colors duration-200 shadow-md"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
