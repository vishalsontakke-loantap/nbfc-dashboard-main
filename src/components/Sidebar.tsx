import { NavLink, useLocation } from "react-router-dom";
import React from "react";
import { assetPath } from "@/lib/utils";
import { sidebar } from "@/lib/constants/sidebar";
import { cn } from "@/lib/utils";
const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActivePath = (to: string, match: string[]) => {
    if (match) {
      return match.some(
        (m) =>
          location.pathname === m ||
          location.pathname.startsWith(m + "/")
      );
    }
    return location.pathname === to;
  };

  return (
    <aside
      className="
        sticky top-0 h-screen min-w-64 bg-white
        shadow-[0_2px_0_rgba(0,0,0,0.05)] shadow-xl
        p-4 flex flex-col
      "
    >
      {/* Logo (fixed) */}
      <div className="mb-6 flex flex-col items-center shrink-0">
        <NavLink to="/" className="block">
          <img
            src={assetPath("/images/Bank_of_Maharashtra_logo.svg")}
            alt="Bank of Maharashtra Logo"
            className="w-40 h-auto mb-2"
          />

        </NavLink>
        <hr className="w-3/4 border-t-2 border-blue-100 mt-2" />
      </div>

      {/* Scrollable Menu (scrollbar hidden) */}
      <nav
        className="
          flex-1 overflow-y-auto
          [&::-webkit-scrollbar]:hidden
          [-ms-overflow-style:none]
          [scrollbar-width:none]
        "
      >
        <ul className="space-y-1 pr-1">
          {sidebar.map(({ to, label, icon, match }) => {
            const isActive = isActivePath(to, match);

            return (
              <li key={to}>
                <NavLink
                  to={to}
                  className={`flex items-center px-4 py-2 rounded-full transition-all duration-200 ${isActive
                    ? "bg-blue-200 text-blue-700 font-semibold shadow-md"
                    : "text-gray-700 hover:bg-blue-100 hover:text-blue-600 hover:font-semibold"
                    }`}
                >
                  <img
                    src={icon}
                    alt={label}
                    className={cn(
                      "mr-3 w-7 transition-transform duration-200 hover:scale-110",
                      isActive ? "filter-blue scale-110" : ""
                    )}
                  />
                  <span className="tracking-wide">{label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      <img
        src={assetPath("/images/loantap.svg")}
        alt="Bank of Maharashtra Logo"
        className="w-full h-auto mb-2"
      />
    </aside>
  );
};

export default Sidebar;
