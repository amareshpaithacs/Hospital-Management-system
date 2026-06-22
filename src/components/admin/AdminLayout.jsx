import { useState, useEffect } from "react";
import PropTypes from "prop-types";
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

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };
  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };
  return (
    <div className="admin-layout">
      {isSidebarOpen && isMobile && (
        <div className="sidebar-overlay" onClick={handleCloseSidebar} />
      )}
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <div className="admin-main">
        <Header onMenuClick={handleOpenSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
