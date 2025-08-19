import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar on the left */}
      <Sidebar />
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
