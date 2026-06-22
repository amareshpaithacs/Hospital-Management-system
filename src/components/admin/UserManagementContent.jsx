import { useState } from "react";
import { BsSearch, BsPlus, BsEye, BsPencilSquare, BsTrash, BsChevronDown } from "react-icons/bs";
import { getUsers, saveUsers, generateUserId } from "../../config-service/userStorage";
import Modal from "../common/Modal";

const PERMISSIONS_LIST = [
  "View Patients", "Edit Patients",
  "Prescribe", "Order Tests",
  "Dispense Meds", "Vitals Entry",
  "Register Patients", "Schedule",
  "Process Samples", "Publish Results",
  "Billing", "Inventory",
];

const ROLES = [
  "Doctor",
  "Nurse",
  "Receptionist",
  "Pharmacist",
  "Lab Technician",
  "Admin",
];

const ROLE_BADGE_MAP = {
  Doctor: "role-doctor",
  Nurse: "role-nurse",
  Pharmacist: "role-pharmacist",
  Receptionist: "role-receptionist",
  "Lab Technician": "role-lab-technician",
  Admin: "role-admin",
};

const AVATAR_COLORS = ["blue", "teal", "green", "purple", "orange"];

const EMPTY_FORM = {
  name: "",
  email: "",
  role: "",
  department: "",
  status: "active",
  accessExpiry: "",
  permissions: [],
};

const EMPTY_ERRORS = { name: "", email: "", role: "", department: "" };
function UserManagementContent() {
  const [users, setUsers] = useState(() => getUsers());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingUserId, setEditingUserId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState(EMPTY_ERRORS);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const displayUsers = users.filter((u) => {
    const searchTerm = searchQuery.toLowerCase();
    const matchesSearch = !searchTerm || 
      u.name.toLowerCase().includes(searchTerm) || 
      u.email.toLowerCase().includes(searchTerm) || 
      u.id.toLowerCase().includes(searchTerm);
    const matchesRole = !selectedRole || u.role === selectedRole;
    const matchesStatus = !selectedStatus || u.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleCount = (role) => users.filter((u) => u.role === role).length;
  const getBadgeClass = (role) => ROLE_BADGE_MAP[role] ?? "role-admin";

  const openModal = (mode, user = null) => {
    setModalMode(mode);
    setEditingUserId(user ? user.id : null);
    setForm(user ? {
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      status: user.status,
      accessExpiry: user.accessExpiry || "",
      permissions: user.permissions || [],
    } : EMPTY_FORM);
    setErrors(EMPTY_ERRORS);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setErrors(EMPTY_ERRORS);
    setForm(EMPTY_FORM);
  };

  const promptDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const cancelDeleteUser = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      const updated = users.filter((u) => u.id !== userToDelete.id);
      setUsers(updated);
      saveUsers(updated);
      showToast("The user has been deleted successfully");
    }
    setUserToDelete(null);
    setShowDeleteModal(false);
  };

  const togglePermission = (perm) => {
    if (modalMode === "view") return;
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  const handleSaveUser = () => {
    const formErrors = {};
    if (!form.name) formErrors.name = "Full name is required";
    
    if (!form.email) {
      formErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      formErrors.email = "Please enter a valid email address";
    }
    if (!form.role) formErrors.role = "Role is required";
    if (!form.department) formErrors.department = "Department is required";
    if (Object.keys(formErrors).length > 0) {
      setErrors({ ...EMPTY_ERRORS, ...formErrors });
      return;
    }
    setErrors(EMPTY_ERRORS);
    let updated;
    if (modalMode === "add") {
      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const formattedDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
      const newUser = {
        id: generateUserId(form.role, users),
        name: form.name,
        email: form.email,
        role: form.role,
        department: form.department,
        status: form.status,
        accessExpiry: form.accessExpiry,
        lastLogin: formattedDate,
        initials: form.name[0].toUpperCase(),
        avatarColor: AVATAR_COLORS[users.length % AVATAR_COLORS.length],
        permissions: form.permissions,
        createdAt: new Date().toISOString(),
      };
      updated = [...users, newUser];
      showToast("The user is added successfully");
    } else if (modalMode === "edit") {
      updated = users.map((u) => {
        if (u.id === editingUserId) {
          return {
            ...u,
            ...form,
            initials: form.name[0].toUpperCase(),
          };
        }
        return u;
      });
      showToast("The user has been updated successfully");
    }
    
    setUsers(updated);
    saveUsers(updated);
    closeModal();
  };

  const isViewMode = modalMode === "view";
  const getModalTitle = () => {
    if (modalMode === "add") return "Add New User";
    if (modalMode === "edit") return "Edit User";
    return "View User";
  };

  const getModalActionText = () => {
    if (modalMode === "add") return "Create User";
    return "Save Changes";
  };

  const getInputClass = (fieldName) => {
    return `form-input${errors[fieldName] ? " input-error" : ""}`;
  };

  return (
    <div className="container-fluid py-3 admin-content-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="page-title">User Management</h2>
          <p className="page-subtitle">Manage hospital staff and their access permissions</p>
        </div>
        <button className="btn-add-user" onClick={() => openModal("add")}>
          <BsPlus size={18} />
          Add New User
        </button>
      </div>
      <div className="um-card">
        <div className="um-filters-row mb-4">
          <div className="um-search-bar">
            <BsSearch className="um-search-icon" size={14} />
            <input
              type="text"
              placeholder="Search users by name, email, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <div className="um-filter-select-wrapper">
            <select
              className="um-filter-select"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}>
              <option value="">All Roles</option>
              {ROLES.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <BsChevronDown className="um-filter-select-icon" />
          </div>
          <div className="um-filter-select-wrapper">
            <select
              className="um-filter-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)} >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <BsChevronDown className="um-filter-select-icon" />
          </div>
        </div>
        <div className="um-table-wrapper">
          <table className="um-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayUsers.map((user) => (
                <tr key={user.id}>
                  <td><span className="um-user-id">{user.id}</span></td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div className={`um-avatar um-avatar-${user.avatarColor}`}>
                        {user.initials}
                      </div>
                      <span className="um-user-name">{user.name}</span>
                    </div>
                  </td>
                  <td><span className="um-user-email">{user.email}</span></td>
                  <td>
                    <span className={`role-badge ${getBadgeClass(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td><span className="um-dept-text">{user.department}</span></td>
                  <td>
                    <span className={`status-pill ${user.status === "active" ? "status-pill-active" : "status-pill-inactive"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td><span className="um-last-login">{user.lastLogin}</span></td>
                  <td>
                    <div className="d-flex align-items-center gap-1">
                      <button className="um-action-btn um-action-view" title="View user" onClick={() => openModal("view", user)}>
                        <BsEye size={15} />
                      </button>
                      <button className="um-action-btn um-action-edit" title="Edit user" onClick={() => openModal("edit", user)}>
                        <BsPencilSquare size={14} />
                      </button>
                      <button className="um-action-btn um-action-delete" title="Delete user" onClick={() => promptDeleteUser(user)}>
                        <BsTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {displayUsers.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-4 um-dept-text">
                    No users match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="um-stats-bar">
        {ROLES.map((role) => (
          <div key={role} className="um-stat-item">
            <span className="um-stat-label">{role}s</span>
            <span className="um-stat-value">{getRoleCount(role)}</span>
          </div>
        ))}
      </div>
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={getModalTitle()}
        footer={
          isViewMode ? (
            <button className="btn-secondary-action" onClick={closeModal}>
              Close
            </button>
          ) : (
            <>
              <button className="btn-primary-action" onClick={handleSaveUser}>
                {getModalActionText()}
              </button>
              <button className="btn-secondary-action" onClick={closeModal}>
                Cancel
              </button>
            </>
          )
        }>
        <p className="um-section-label">Basic Information</p>
        <div className="two-col-grid">
          <div className="field-group">
            <label className="field-group-label">Full Name <span className="required-mark">*</span></label>
            <input
              type="text"
              className={getInputClass("name")}
              placeholder="Dr. John Smith"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              disabled={isViewMode} />
            {errors.name && <span className="error-hint">{errors.name}</span>}
          </div>
          <div className="field-group">
            <label className="field-group-label">Email Address <span className="required-mark">*</span></label>
            <input
              type="email"
              className={getInputClass("email")}
              placeholder="john.smith@hospital.com"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              disabled={isViewMode}/>
            {errors.email && <span className="error-hint">{errors.email}</span>}
          </div>
        </div>
        <div className="two-col-grid">
          <div className="field-group">
            <label className="field-group-label">Role <span className="required-mark">*</span></label>
            <select
              className={getInputClass("role")}
              value={form.role}
              onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
              disabled={isViewMode}>
              <option value="">Select role</option>
              {ROLES.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            {errors.role && <span className="error-hint">{errors.role}</span>}
          </div>
          <div className="field-group">
            <label className="field-group-label">Department <span className="required-mark">*</span></label>
            <input
              type="text"
              className={getInputClass("department")}
              placeholder="General Medicine"
              value={form.department}
              onChange={(e) => setForm((p) => ({ ...p, department: e.target.value }))}
              disabled={isViewMode}/>
            {errors.department && <span className="error-hint">{errors.department}</span>}
          </div>
        </div>
        <div className="two-col-grid">
          <div className="field-group">
            <label className="field-group-label">Status</label>
            <select
              className="form-input"
              value={form.status}
              onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
              disabled={isViewMode}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="field-group">
            <label className="field-group-label">Access Expiry Date</label>
            <input
              type="date"
              className="form-input"
              value={form.accessExpiry}
              onChange={(e) => setForm((p) => ({ ...p, accessExpiry: e.target.value }))}
              disabled={isViewMode}/>
          </div>
        </div>
        <div className="um-permissions-section">
          <p className="um-section-label">Permissions</p>
          <div className="um-permissions-grid">
            {PERMISSIONS_LIST.map((perm) => (
              <label key={perm} className="um-permission-item">
                <input
                  type="checkbox"
                  className="check-input"
                  checked={form.permissions.includes(perm)}
                  onChange={() => togglePermission(perm)}
                  disabled={isViewMode} />
                {perm}
              </label>
            ))}
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={showDeleteModal}
        onClose={cancelDeleteUser}
        title="Confirm Deletion"
        footer={
          <>
            <button
              className="btn-primary-action btn-delete-confirm"
              onClick={confirmDeleteUser}>
              Delete User
            </button>
            <button className="btn-secondary-action" onClick={cancelDeleteUser}>
              Cancel
            </button>
          </>
        }>
        <div className="delete-modal-content">
          <p className="delete-modal-text">
            Are you sure you want to delete <strong>{userToDelete?.name}</strong>?
          </p>
          <p className="delete-modal-subtext">
            This action cannot be undone. All data associated with this user will be permanently removed.
          </p>
        </div>
      </Modal>
      {toastMessage && (
        <div className="toast-notification">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default UserManagementContent;