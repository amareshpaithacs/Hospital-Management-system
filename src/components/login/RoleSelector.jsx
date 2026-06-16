import PropTypes from "prop-types";

const roles = [
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

function RoleSelector({ selectedRole, onRoleSelect }) {
  return (
    <div className="role-section">
      <span className="role-section-label">Login as:</span>
      <div className="role-grid">
        {roles.map((role) => (
          <button
            key={role}
            type="button"
            className={`role-btn${selectedRole === role ? " active" : ""}`}
            onClick={() => onRoleSelect(role)}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
}

RoleSelector.propTypes = {
  selectedRole: PropTypes.string.isRequired,
  onRoleSelect: PropTypes.func.isRequired,
};

export default RoleSelector;
