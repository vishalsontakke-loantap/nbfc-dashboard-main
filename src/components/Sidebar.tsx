import { NavLink, useLocation } from "react-router-dom";
import React from "react";
import { assetPath } from "@/lib/utils";
import { sidebar } from "@/lib/constants/sidebar";
import { cn } from "@/lib/utils";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActivePath = (to: string, match: string[]) => {
    if (match) {
      return match.some((m) => location.pathname === m || location.pathname.startsWith(m + "/"));
    }
    return location.pathname === to;
  };

  return (
    <aside className="sticky top-0 h-screen min-w-64 bg-white shadow-[0_2px_0_rgba(0,0,0,0.05)] p-4 shadow-xl  flex flex-col">
      <div className="mb-6 flex flex-col items-center">
        <NavLink to="/" className="block">
          <img
            src={assetPath("/images/Bank_of_Maharashtra_logo.svg")}
            alt="Bank of Maharashtra Logo"
            className="w-40 h-auto mb-2"
          />
        </NavLink>
        <hr className="w-3/4 border-t-2 border-blue-100 mt-2" />
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
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
    </aside>
  );
};

export default Sidebar;
