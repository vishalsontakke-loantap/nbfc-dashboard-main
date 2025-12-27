import { useNavigate } from "react-router-dom";
import { assetPath } from "@/lib/utils";

interface PageNotFoundStateProps {
  onGoBack?: () => void;
}

export function PageNotFoundState({ onGoBack }: PageNotFoundStateProps) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <div className="bg-white rounded-[24px] shadow-lg max-w-[400px] w-full p-12">
        <div className="flex flex-col items-center text-center">
          {/* Illustration */}
          <div className="mb-8">
            <img src={assetPath("/error/page_not_found.png")} alt="Page Not Found Illustration" />
          </div>

          {/* Content */}
          <h2 className="font-['Poppins:Bold',sans-serif] text-[24px] text-[#1d2d3e] mb-3">
            Oops! This Page Is Missing
          </h2>
          <p className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#62748e] mb-8 leading-relaxed">
            Looks like the page you're looking for isn't here. It might have moved or doesn't exist anymore.
          </p>

          {/* Action Button */}
          <button
            onClick={handleGoBack}
            className="bg-[#00a8ff] hover:bg-[#0089cf] text-white font-['Poppins:SemiBold',sans-serif] text-[14px] px-8 py-3 rounded-lg transition-colors duration-200 shadow-md"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
