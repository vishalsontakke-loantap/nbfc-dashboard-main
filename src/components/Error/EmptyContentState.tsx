import { assetPath } from "@/lib/utils";

interface EmptyContentStateProps {
  onExplore?: () => void;
  title?: string;
  message?: string;
}

export function EmptyContentState({ 
  onExplore,
  title = "Nothing Here Yet!",
  message = "Looks like there's nothing to show right now. Try adding some content or explore what's available."
}: EmptyContentStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <div className=" w-full p-12">
        <div className="flex flex-col items-center text-center">
          {/* Illustration */}
          <div className="mb-8">
            <img src={assetPath("/error/empty.png")} alt="Empty Content Illustration" />
          </div>

          {/* Content */}
          <h2 className="font-['Poppins:Bold',sans-serif] text-[24px] text-[#1d2d3e] mb-3">
            {title}
          </h2>
          <p className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#62748e] mb-8 leading-relaxed">
            {message}
          </p>

          {/* Action Button */}
          {onExplore && (
            <button
              onClick={onExplore}
              className="bg-[#00a8ff] hover:bg-[#0089cf] text-white font-['Poppins:SemiBold',sans-serif] text-[14px] px-8 py-3 rounded-lg transition-colors duration-200 shadow-md"
            >
              Explore
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
