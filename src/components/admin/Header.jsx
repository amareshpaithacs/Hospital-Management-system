import { BsSearch, BsBell, BsList, BsHouse } from "react-icons/bs";

function Header({ onMenuClick, isSidebarOpen }) {
  return (
    <header className="admin-header">
      <div className="d-flex align-items-center gap-3">
        <button 
          className={`mobile-menu-btn ${isSidebarOpen ? 'd-lg-none' : ''}`} 
          onClick={onMenuClick}
          aria-label="Open sidebar">
          <BsList size={24} />
        </button>
        <div className="header-search d-none d-md-flex">
          <BsSearch className="header-search-icon" />
          <input type="text" placeholder="Search patients, ID, phone..." />
        </div>
      </div>
      <div className="header-actions">
        <div className="header-branch-selector">
          <BsHouse className="branch-icon" />
          <span>Main Campus</span>
        </div>
        <button className="notification-btn" title="Notifications">
          <BsBell />
          <span className="notification-badge"></span>
        </button>
        <div className="header-profile">
          <div className="profile-text text-end">
            <span className="profile-name">Dr. Sarah Admin</span>
            <span className="profile-dept">Administration</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;