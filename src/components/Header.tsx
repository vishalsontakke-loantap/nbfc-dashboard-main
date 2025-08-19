import React from "react";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_0_rgba(0,0,0,0.05)]">
      <div className="w-full">
        <nav className="flex items-center justify-between py-3">
          {/* Navigation Links (for large screens) */}
          <div>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#"
                  className="flex items-center px-24 py-2 bg-blue-100 text-blue-600 rounded-full font-bold"
                >
                  Admin
                </a>
              </li>
            </ul>
          </div>

          {/* Notification Icon */}
          <div className="mr-4">
            <a href="#" className="text-gray-700">
              <img
                src="/images/icons/bell-icon.png"
                alt="Notification icon"
                className="w-11"
              />
              {/* Optionally, add a badge here */}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
