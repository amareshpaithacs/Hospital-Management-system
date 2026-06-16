import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsBuilding } from "react-icons/bs";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import RoleSelector from "./RoleSelector";
import { useAuth } from "../../config-service/AuthContext";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [branch, setBranch] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = {};
    if (!branch) validationErrors.branch = "Please select a branch.";
    if (!email) validationErrors.email = "Please enter your email.";
    if (!password) validationErrors.password = "Please enter your password.";
    if (!selectedRole) validationErrors.role = "Please select your role from the list below.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const response = await login({
        email,
        password,
        role: selectedRole,
        branch,
      });

      if (response.success) {
        if (response.user.role === "Administrator") {
          navigate("/admin/dashboard");
        } else {
          navigate("/placeholder");
        }
      }
    } catch (err) {
      setErrors({ form: err.message || "Invalid credentials or role/branch mismatch." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-card">
      <div className="form-header">
        <h1 className="form-title">Sign In</h1>
        <p className="form-subtitle">Access your hospital information system</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="field-label" htmlFor="branch">
            <BsBuilding size={14} className="label-icon" />
            Select Branch
          </label>
          <select
            id="branch"
            className={`field-input${errors.branch || errors.form ? " error" : ""}`}
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            <option value="" disabled>
              Select your branch...
            </option>
            <option value="Main Campus">Main Campus</option>
            <option value="North Branch">North Branch</option>
            <option value="South Branch">South Branch</option>
            <option value="East Wing">East Wing</option>
            <option value="West Medical Center">West Medical Center</option>
          </select>
          {errors.branch && <p className="error-msg">{errors.branch}</p>}
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className={`field-input${errors.email || errors.form ? " error" : ""}`}
            placeholder="your.email@hospital.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-msg">{errors.email}</p>}
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="password">
            Password
          </label>
          <div className="password-input-container">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`field-input${errors.password || errors.form ? " error" : ""}`}
              placeholder="demo123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password && (
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <PiEye size={20} /> : <PiEyeClosed size={20} />}
              </button>
            )}
          </div>
          {errors.password && <p className="error-msg">{errors.password}</p>}
        </div>

        {errors.form && <p className="error-msg">{errors.form}</p>}
        {errors.role && <p className="error-msg">{errors.role}</p>}

        <button type="submit" className="signin-btn" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <RoleSelector
        selectedRole={selectedRole}
        onRoleSelect={setSelectedRole}
      />
    </div>
  );
}

export default LoginForm;
