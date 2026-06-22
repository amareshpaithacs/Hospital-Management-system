import { useNavigate } from "react-router-dom";
import { useAuth } from "../config-service/AuthContext";
import "../styles/admin.css";

function NotFound() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleReturn = () => {
    if (user?.role === "Administrator") {
      navigate("/admin/dashboard", { replace: true });
    } else if (user) {
      navigate("/placeholder", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };
  
  return (
    <div className="admin-placeholder-page">
      <div className="admin-placeholder-card">
        <span className="admin-placeholder-eyebrow" style={{ color: "var(--color-error)" }}>404 Error</span>
        <h1 className="dash-card-title">Page Not Found</h1>
        <p className="page-subtitle mb-4">The page you are looking for does not exist or has been moved.</p>
        <button className="btn-primary-action" onClick={handleReturn}>
          Return Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
