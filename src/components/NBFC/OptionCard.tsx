import React from "react";
import { Link } from "react-router-dom";

interface OptionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  selected?: boolean;
  onClick?: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({
  title,
  description,
  icon,
  buttonText,
  selected = false,
  onClick,
}) => {
  return (
    <div
      className={`w-72 h-80 p-6 border rounded-2xl flex flex-col justify-between shadow-sm cursor-pointer transition-all duration-300 
      ${
        selected
          ? "bg-blue-50 border-blue-400"
          : "bg-white border-gray-300 hover:border-blue-300"
      }`}
      onClick={onClick}
    >
      {/* Top Content */}
      <div className="flex flex-col items-center text-center">
        {/* Icon */}
        <div className="text-4xl mb-4">{icon}</div>

        {/* Title */}
        <h3 className="font-semibold text-lg mb-2">{title}</h3>

        {/* Description */}
        <p className="text-sm text-gray-600 break-words">{description}</p>
      </div>

      {/* Bottom Button */}
      <Link
        to="/nbfc/nbfc-form"
        className={`mt-4 py-2 rounded-full font-medium w-full text-center block cursor-pointer 
        ${
            selected
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default OptionCard;
