import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  return (
    <div className="admin-layout">
      {isSidebarOpen && isMobile && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
      )}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="admin-main">
        <Header onMenuClick={() => setIsSidebarOpen(true)} isSidebarOpen={isSidebarOpen} />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
