import { assetPath } from "@/lib/utils";

interface NoSearchResultStateProps {
  onSearchAgain?: () => void;
  searchQuery?: string;
}

export function NoSearchResultState({ onSearchAgain, searchQuery }: NoSearchResultStateProps) {
  const handleSearchAgain = () => {
    if (onSearchAgain) {
      onSearchAgain();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <div className="bg-white rounded-[24px] shadow-lg max-w-[400px] w-full p-12">
        <div className="flex flex-col items-center text-center">
          {/* Illustration */}
          <div className="mb-8">
            <img src={assetPath("/error/no_result_found.png")} alt="No Results Illustration" />
          </div>

          {/* Content */}
          <h2 className="font-['Poppins:Bold',sans-serif] text-[24px] text-[#1d2d3e] mb-3">
            Hmm... Nothing Here!
          </h2>
          <p className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#62748e] mb-8 leading-relaxed">
            We couldn't find anything that matches your search. Try adjusting your filters or try a new search.
          </p>

          {/* Action Button */}
          {onSearchAgain && (
            <button
              onClick={handleSearchAgain}
              className="bg-[#00a8ff] hover:bg-[#0089cf] text-white font-['Poppins:SemiBold',sans-serif] text-[14px] px-8 py-3 rounded-lg transition-colors duration-200 shadow-md"
            >
              Search Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
