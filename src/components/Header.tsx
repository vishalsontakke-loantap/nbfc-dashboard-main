import React, { useState, useRef, useEffect } from "react";
import { assetPath } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [logoutTrigger] = useLogoutMutation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logoutTrigger();
      navigate("/")

    }
    catch (err) {
      console.error("Logout failed", err);
    }
  }

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_0_rgba(0,0,0,0.05)]">
      <div className="w-full">
        <nav className="flex items-center justify-between py-3">
          {/* Left Navigation */}
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

          {/* RIGHT: Profile Menu */}
          <div className="relative mr-6" ref={menuRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <Menu className="w-6 h-6 text-gray-600 cursor-pointer" />
            </button>

            {/* Dropdown Menu */}
            {open && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 animate-fade-in">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
