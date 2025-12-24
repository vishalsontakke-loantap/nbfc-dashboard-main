interface OfflineStateProps {
  onRetry?: () => void;
}

export function OfflineState({ onRetry }: OfflineStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <div className="bg-white rounded-[24px] shadow-lg max-w-[400px] w-full p-12">
        <div className="flex flex-col items-center text-center">
          {/* Illustration */}
          <div className="mb-8">
            <svg width="200" height="140" viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Phone */}
              <rect x="40" y="20" width="60" height="100" rx="8" stroke="#1d2d3e" strokeWidth="2" fill="white"/>
              <circle cx="70" cy="60" r="20" fill="#E3F2FD"/>
              {/* WiFi Icon */}
              <path d="M70 65 L70 68 M70 55 C72 55 74 56 75 57 M70 55 C68 55 66 56 65 57 M70 50 C74 50 78 52 80 54 M70 50 C66 50 62 52 60 54" 
                    stroke="#0089cf" strokeWidth="2" strokeLinecap="round"/>
              {/* Person */}
              <circle cx="140" cy="50" r="12" fill="#0089cf"/>
              <path d="M125 95 L140 70 L155 95" fill="#0089cf"/>
              {/* Grid/Window */}
              <rect x="120" y="20" width="60" height="50" rx="4" fill="#B3D9FF"/>
              <line x1="150" y1="20" x2="150" y2="70" stroke="white" strokeWidth="2"/>
              <line x1="120" y1="40" x2="180" y2="40" stroke="white" strokeWidth="2"/>
              <line x1="120" y1="55" x2="180" y2="55" stroke="white" strokeWidth="2"/>
            </svg>
          </div>

          {/* Content */}
          <h2 className="font-['Poppins:Bold',sans-serif] text-[24px] text-[#1d2d3e] mb-3">
            Oops! You're Offline
          </h2>
          <p className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#62748e] mb-8 leading-relaxed">
            It looks like you're not connected to the internet. Check your Wi-Fi or mobile data and try again once you're back online.
          </p>

          {/* Retry Button */}
          <button
            onClick={onRetry}
            className="bg-[#00a8ff] hover:bg-[#0089cf] text-white font-['Poppins:SemiBold',sans-serif] text-[14px] px-8 py-3 rounded-lg transition-colors duration-200 shadow-md"
          >
            Retry Connection
          </button>
        </div>
      </div>
    </div>
  );
}
