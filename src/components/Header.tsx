import React, { useState, useRef } from "react";
import { assetPath } from "@/lib/utils";
import { ProfileModal } from "@/components/ProfileModal"; // <-- adjust path if needed

const Header: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(true);
  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });

  const profileRef = useRef<HTMLButtonElement>(null);

  // Sample User Data (replace with real authentication data)
  const userData = {
    name: "John Doe",
    role: "Administrator",
    employeeId: "EMP1234",
    mobileNo: "+91 98765 43210",
    lastLogin: "2025-02-01 10:24 AM",
    profileImage: assetPath("/images/avatar/default-avatar.png"),
  };

  const handleProfileClick = () => {
    if (profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();

      setModalPosition({
        top: rect.bottom + 10, // space below icon
        right: window.innerWidth - rect.right,
      });
    }

    setModalOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_0_rgba(0,0,0,0.05)]">
      <div className="w-full">
        <nav className="flex items-center justify-end py-3">
          {/* Profile Section */}
          <button
            ref={profileRef}
            onClick={handleProfileClick}
            className="flex items-center space-x-3 focus:outline-none mr-6"
          >
            {/* Avatar */}
            <img
              src={userData.profileImage}
              alt="User avatar"
              className="w-10 h-10 rounded-full"
            />

            {/* Name */}
            {/* <span className="font-semibold text-gray-700">{userData.name}</span> */}

            {/* Dropdown Icon (optional visual only) */}
            {/* <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /> */}
            {/* </svg> */}
          </button>

          {/* Profile Modal */}
          <ProfileModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            position={modalPosition}
            userData={userData}
            onResetPassword={() => alert("Reset Password")}
            onLogout={() => alert("Logged Out")}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
