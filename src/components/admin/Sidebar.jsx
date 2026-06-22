import { NavLink, useNavigate } from "react-router-dom";
import { BsActivity, BsGrid1X2, BsPeople, BsBuilding, BsGraphUp, BsShieldCheck, BsGear, BsBoxArrowRight, BsXLg, BsPersonCircle } from "react-icons/bs";
import { useAuth } from "../../config-service/AuthContext";

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-brand">
        <div className="sidebar-brand-wrapper">
          <div className="sidebar-brand-logo">
            <BsActivity className="sidebar-brand-icon" size={20} />
          </div>
          <span className="sidebar-brand-name">MediCare HIS</span>
        </div>
        <button className="sidebar-close-btn" onClick={onClose} aria-label="Close sidebar">
          <BsXLg size={20} />
        </button>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/admin/dashboard" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <BsGrid1X2 className="nav-icon" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/admin/users" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <BsPeople className="nav-icon" />
          <span>User Management</span>
        </NavLink>
        <NavLink to="/admin/branches" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <BsBuilding className="nav-icon" />
          <span>Branch Management</span>
        </NavLink>
        <NavLink to="/admin/analytics" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <BsGraphUp className="nav-icon" />
          <span>Analytics</span>
        </NavLink>
        <NavLink to="/admin/audit" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <BsShieldCheck className="nav-icon" />
          <span>Audit Logs</span>
        </NavLink>
        <NavLink to="/admin/settings" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <BsGear className="nav-icon" />
          <span>System Settings</span>
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-user-profile">
          <div className="sidebar-avatar">
            <BsPersonCircle size={20} className="sidebar-avatar-icon" />
          </div>
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">Dr. Sarah Admin</span>
            <span className="sidebar-user-role">Admin</span>
          </div>
        </div>
        <button className="logout-btn-full" onClick={handleLogout} title="Logout">
          <BsBoxArrowRight size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;