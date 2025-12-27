import React, { useState, useRef, useEffect } from "react";
import { Menu, UserIcon } from "lucide-react";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { useGetAllNbfcQuery } from "@/redux/features/nbfc/nbfcApi";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedNbfc } from "@/redux/features/nbfc/nbfcSlice";
import { ProfileModal } from "./ProfileModal";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileModalPosition, setProfileModalPosition] = useState({ top: 0, right: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutTrigger] = useLogoutMutation();

  /** Get user data from Redux */
  const user = useSelector((state: any) => state.auth.user);

  console.log("Header User:", user);

  /** ========== Redux selected NBFC from Cookie ========== */
  const selectedNbfcFromStore = useSelector(
    (state: any) => state.nbfc.selectedNbfc
  );

  /** Local state for dropdown */
  const [selectedNbfc, setSelectedNbfcLocal] = useState(
    selectedNbfcFromStore
      ? String(selectedNbfcFromStore.partner_id)
      : "all"
  );

  /** Fetch NBFC list */
  const { data: nbfcData } = useGetAllNbfcQuery(undefined);

  /** Normalize NBFC array safely */
  const nbfcArray =
    Array.isArray(nbfcData?.data?.items)
      ? nbfcData.data.items
      : Array.isArray(nbfcData?.data)
      ? nbfcData.data
      : Array.isArray(nbfcData)
      ? nbfcData
      : [];

  /** ========== Auto-select first NBFC if no cookie ========== */
  useEffect(() => {
    if (!selectedNbfcFromStore && nbfcArray.length > 0) {
      const first = nbfcArray[0];
      dispatch(setSelectedNbfc(first));
      setSelectedNbfcLocal(String(first.partner_id));
    }
  }, [nbfcArray, selectedNbfcFromStore]);

  /** Close dropdown when clicking outside */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logoutTrigger();
  };

  const handleProfileClick = () => {
    if (profileButtonRef.current) {
      const rect = profileButtonRef.current.getBoundingClientRect();
      setProfileModalPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
      setProfileModalOpen(true);
      setOpen(false);
    }
  };

  const handleResetPassword = () => {
    navigate("/reset-password");
  };

  // Format user data for the modal
  const userData = {
    name: user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'User' : 'User',
    role: user?.role?.[0]?.role_name || user?.user_type || 'User',
    employeeId: user?.id || 'N/A',
    mobileNo: user?.mobile_no || user?.phone || 'N/A',
    lastLogin: user?.last_login || new Date().toLocaleString(),
    profileImage: user?.profile_image || undefined,
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_0_rgba(0,0,0,0.05)]">
      <div className="w-full">
        <nav className="flex items-center justify-between py-3">

          {/* NBFC Dropdown */}
          <div className="px-3 mb-2">
            <Select
              value={selectedNbfc}
              onValueChange={(value) => {
                setSelectedNbfcLocal(value);

                const nbfc = nbfcArray.find(
                  (nb) => String(nb.partner_id ?? nb.id) === value
                );

                dispatch(setSelectedNbfc(nbfc || null));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select NBFC" />
              </SelectTrigger>

              <SelectContent>
                {/* <SelectItem value="all">All NBFCs</SelectItem> */}

                {nbfcArray.map((nbfc: any) => (
                  <SelectItem
                    key={nbfc.partner_id ?? nbfc.id}
                    value={String(nbfc.partner_id ?? nbfc.id)}
                  >
                    {nbfc.nbfc_name ?? nbfc.name ?? "-"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* RIGHT MENU */}
          <div className="relative mr-6" ref={menuRef}>
            <button
              ref={profileButtonRef}
              onClick={handleProfileClick}
              className="flex items-center space-x-2"
            >
              <UserIcon className="w-6 h-6 text-gray-600 cursor-pointer" />
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-3">
                <a 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={handleProfileClick}
                >
                  Profile
                </a>

                <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
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

      {/* Profile Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        position={profileModalPosition}
        userData={userData}
        onResetPassword={handleResetPassword}
        onLogout={handleLogout}
      />
    </header>
  );
};

export default Header;
