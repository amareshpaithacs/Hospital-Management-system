import { BsActivity } from "react-icons/bs";

function LoginBanner() {
  return (
    <div className="login-banner">
      <div className="banner-brand">
        <div className="brand-logo">
          <div className="brand-logo-inner">
            <BsActivity className="brand-logo-icon" />
          </div>
        </div>
        <div className="brand-text">
          <span className="brand-name">MediCare HIS</span>
          <span className="brand-subtitle">Hospital Information System</span>
        </div>
      </div>
      <h2 className="banner-heading">Enterprise Healthcare Management</h2>
      <p className="banner-description">
        Complete hospital operations platform with role-based access control,
        real-time operations, AI-assisted workflows, and comprehensive patient
        care management.
      </p>
      <div className="banner-features">
        <div className="feature-card">
          <span className="feature-title feature-title-blue">Multi-Branch</span>
          <span className="feature-desc">Centralized Control</span>
        </div>
        <div className="feature-card">
          <span className="feature-title feature-title-green">RBAC Security</span>
          <span className="feature-desc">Role-Based Access</span>
        </div>
        <div className="feature-card">
          <span className="feature-title feature-title-blue">Real-Time</span>
          <span className="feature-desc">Live Operations</span>
        </div>
        <div className="feature-card">
          <span className="feature-title feature-title-green">AI-Assisted</span>
          <span className="feature-desc">Smart Workflows</span>
        </div>
      </div>
    </div>
  );
}

export default LoginBanner;
