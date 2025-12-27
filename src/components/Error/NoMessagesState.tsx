import { assetPath } from "@/lib/utils";

interface NoMessagesStateProps {
  onSendMessage?: () => void;
}

export function NoMessagesState({ onSendMessage }: NoMessagesStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <div className="bg-white rounded-[24px] shadow-lg max-w-[400px] w-full p-12">
        <div className="flex flex-col items-center text-center">
          {/* Illustration */}
          <div className="mb-8">
            <img src={assetPath("/error/no_massage.png")} alt="No Messages Illustration" />
          </div>

          {/* Content */}
          <h2 className="font-['Poppins:Bold',sans-serif] text-[24px] text-[#1d2d3e] mb-3">
            No Messages Yet!
          </h2>
          <p className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#62748e] mb-8 leading-relaxed">
            Looks like it's a bit quiet in here. Start a conversation by sending a message or check back later for updates.
          </p>

          {/* Action Button */}
          {onSendMessage && (
            <button
              onClick={onSendMessage}
              className="bg-[#00a8ff] hover:bg-[#0089cf] text-white font-['Poppins:SemiBold',sans-serif] text-[14px] px-8 py-3 rounded-lg transition-colors duration-200 shadow-md"
            >
              Send a Message
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
