import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AdminLayout from "../components/admin/AdminLayout";
import { useAuth } from "../config-service/AuthContext";
import "../styles/admin.css";

function Placeholder({
  title = "Module",
  description = "This module is currently under development and will be available in an upcoming release.",
  useAdminLayout = false,
}) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const content = (
    <div className="admin-placeholder-page">
      <div className="admin-placeholder-card">
        <span className="admin-placeholder-eyebrow">Coming Soon</span>
        <h1>{title}</h1>
        <p>{description}</p>
        {!useAdminLayout && (
          <button className="btn-primary-action placeholder-action" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
  if (useAdminLayout || user?.role === "Administrator") {
    return <AdminLayout>{content}</AdminLayout>;
  }
  return content;
}

Placeholder.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  useAdminLayout: PropTypes.bool,
};

export default Placeholder;