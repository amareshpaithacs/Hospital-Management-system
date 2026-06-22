import PropTypes from "prop-types";

const HOSPITAL_ROLES = [
  "Administrator",
  "Receptionist",
  "Doctor",
  "Surgeon",
  "Nurse",
  "Pharmacist",
  "Lab Technician",
  "Patient",
  "Accountant",
  "Inventory Manager",
];

function RoleSelector({ selectedRole, onRoleSelect, errorMessage }) {
  return (
    <div className="role-section">
      <span className="role-section-label">Login as:</span>
      <div className="role-grid">
        {HOSPITAL_ROLES.map((role) => (
          <button
            key={role}
            type="button"
            className={`role-btn${selectedRole === role ? " active" : ""}`}
            onClick={() => onRoleSelect(role)}>
            {role}
          </button>
        ))}
      </div>
      {errorMessage && <p className="error-msg">{errorMessage}</p>}
    </div>
  );
}

RoleSelector.propTypes = {
  selectedRole: PropTypes.string.isRequired,
  onRoleSelect: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default RoleSelector;