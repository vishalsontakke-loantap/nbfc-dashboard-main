import React, { useEffect, useRef } from 'react';
import { User, Phone, IdCard, Shield, Clock, Key, LogOut, Mail } from 'lucide-react';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    position: { top: number; right: number };
    userData: {
        name: string;
        role: string;
        employeeId: string;
        mobileNo: string;
        lastLogin: string;
        profileImage?: string;
    };
    onResetPassword: () => void;
    onLogout: () => void;
}

export function ProfileModal({
    isOpen,
    onClose,
    position,
    userData,
    onResetPassword,
    onLogout,
}: ProfileModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        // Handle ESC key
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={modalRef}
            className="fixed w-80 bg-white rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 border border-gray-100 overflow-hidden"
            style={{ top: `${position.top}px`, right: `${position.right}px` }}
        >
            {/* Gradient Header Background */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 px-6 pt-8 pb-16">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

                {/* Profile Image */}
                <div className="relative flex justify-center">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-white p-1 shadow-xl">
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                                {userData.profileImage ? (
                                    <img
                                        src={userData.profileImage}
                                        alt="Profile"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <User className="w-10 h-10 text-white" />
                                )}
                            </div>
                        </div>
                        {/* Online Status Indicator */}
                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-lg"></div>
                    </div>
                </div>

                {/* User Name */}
                <div className="relative text-center mt-3">
                    <h3 className="text-white mb-0.5">{userData.name}</h3>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                        <Shield className="w-3 h-3 text-white/90" />
                        <p className="text-xs text-white/90">{userData.role}</p>
                    </div>
                </div>
            </div>

            {/* User Details Card - Overlapping Design */}
            <div className="relative -mt-10 mx-4 mb-4">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
                    <div className="space-y-3.5">
                        {/* Mobile No */}
                        <div className="flex items-center gap-3 group">
                            {/* <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center flex-shrink-0 group-hover:from-blue-100 group-hover:to-blue-200 transition-colors">
                                <Phone className="w-4 h-4 text-blue-600" />
                            </div> */}
                            {/* <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 mb-0.5">Mobile Number</p>
                                <p className="text-sm text-gray-900 truncate">{userData.mobileNo}</p>
                            </div> */}
                        </div>

                        {/* Employee ID */}
                        <div className="flex items-center gap-3 group">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center flex-shrink-0 group-hover:from-purple-100 group-hover:to-purple-200 transition-colors">
                                <IdCard className="w-4 h-4 text-purple-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 mb-0.5">Employee ID</p>
                                <p className="text-sm text-gray-900 truncate">{userData.employeeId}</p>
                            </div>
                        </div>

                        {/* Role */}
                        <div className="flex items-center gap-3 group">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:from-emerald-100 group-hover:to-emerald-200 transition-colors">
                                <Shield className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 mb-0.5">Role</p>
                                <p className="text-sm text-gray-900 truncate">{userData.role}</p>
                            </div>
                        </div>

                        {/* Last Login */}
                        <div className="flex items-center gap-3 group">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center flex-shrink-0 group-hover:from-amber-100 group-hover:to-amber-200 transition-colors">
                                <Clock className="w-4 h-4 text-amber-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 mb-0.5">Last Login</p>
                                <p className="text-sm text-gray-900 truncate">{userData.lastLogin}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-4 pb-4 space-y-2">
                {/* Reset Password */}
                {/* <button
          onClick={() => {
            onResetPassword();
            onClose();
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 border border-gray-200 hover:border-blue-200 transition-all duration-200 text-left group shadow-sm hover:shadow"
        >
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:bg-blue-50 transition-colors">
            <Key className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
          </div>
          <span className="text-sm text-gray-700 group-hover:text-blue-700 transition-colors">Reset Password</span>
        </button> */}

                {/* Logout */}
                <button
                    onClick={() => {
                        onLogout();
                        onClose();
                    }}
                    className="w-full flex items-center gap-3 px-2 py-2 rounded-xl bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 border border-red-200 hover:border-red-300 transition-all duration-200 text-left group shadow-sm hover:shadow"
                >
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:bg-red-50 transition-colors">
                        <LogOut className="w-4 h-4 text-red-600 transition-colors" />
                    </div>
                    <span className="text-sm text-red-700 transition-colors">Logout</span>
                </button>

                <a
                    onClick={() => {
                        onResetPassword();
                        onClose();
                    }}
                    className="text-blue-600 hover:underline cursor-pointer"
                >
                    Reset Password
                </a>
            </div>
        </div>
    );
}