import { useState } from "react";
import { BsPlus, BsBuilding, BsGeoAlt, BsEye, BsGear } from "react-icons/bs";
import { getBranches, saveBranches, generateBranchId, BRANCH_STATUS } from "../../config-service/branchStorage";
import Modal from "../common/Modal";

const DEPARTMENT_LIST = [
  "Emergency", "ICU",
  "General Medicine", "Surgery",
  "Pediatrics", "Cardiology",
  "Orthopedics", "Radiology",
  "Oncology",
];

const RESOURCE_LIST = ["Pharmacy", "Laboratory", "ICU"];
const STATUS_CLASS_MAP = {
  [BRANCH_STATUS.OPERATIONAL]: "status-pill-active",
  [BRANCH_STATUS.MAINTENANCE]: "status-pill-warning",
};

const STATUS_LABEL_MAP = {
  [BRANCH_STATUS.OPERATIONAL]: "operational",
  [BRANCH_STATUS.MAINTENANCE]: "maintenance",
};

const EMPTY_FORM = {
  branchName: "",
  locationAddress: "",
  totalBedCapacity: "0",
  staffCount: "0",
  departments: [],
  resources: [],
};

function BranchManagementContent() {
  const [branches, setBranches] = useState(() => getBranches());
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingBranchId, setEditingBranchId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const totalBranchCount = branches.length;
  const totalBedsCount = branches.reduce((sum, b) => sum + b.totalBeds, 0);
  const totalStaffCount = branches.reduce((sum, b) => sum + b.staff, 0);
  const occupiedBeds = branches.reduce((sum, b) => sum + b.patients, 0);
  const occupancyRate = totalBedsCount > 0
    ? Math.round((occupiedBeds / totalBedsCount) * 100)
    : 0;
  const NETWORK_STATS = [
    { label: "Total Branches", value: totalBranchCount, colorClass: "bm-ns-blue" },
    { label: "Total Beds", value: totalBedsCount, colorClass: "bm-ns-green" },
    { label: "Total Staff", value: totalStaffCount, colorClass: "bm-ns-purple" },
    { label: "Occupied Beds", value: occupiedBeds, colorClass: "bm-ns-orange" },
    { label: "Occupancy Rate", value: `${occupancyRate}%`, colorClass: "bm-ns-peach" },
  ];

  const openModal = (mode, branch = null) => {
    setModalMode(mode);
    setEditingBranchId(branch ? branch.id : null);
    setForm(branch ? {
      branchName: branch.name,
      locationAddress: branch.address,
      totalBedCapacity: String(branch.totalBeds),
      staffCount: String(branch.staff),
      departments: branch.departments || [],
      resources: branch.resources || [],
    } : EMPTY_FORM);
    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setErrors({});
  };

  const toggleListItem = (field, value) => {
    if (modalMode === "view") return;
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleSaveBranch = () => {
    const validationErrors = {};
    if (!form.branchName) validationErrors.branchName = "Branch name is required";
    if (!form.locationAddress) validationErrors.locationAddress = "Location address is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    let updated;
    if (modalMode === "add") {
      const newBranch = {
        id: generateBranchId(branches),
        name: form.branchName,
        address: form.locationAddress,
        totalBeds: Number(form.totalBedCapacity) || 0,
        staff: Number(form.staffCount) || 0,
        patients: 0,
        status: BRANCH_STATUS.OPERATIONAL,
        departments: form.departments,
        resources: form.resources,
        createdAt: new Date().toISOString(),
      };
      updated = [...branches, newBranch];
    } else if (modalMode === "edit") {
      updated = branches.map((b) => {
        if (b.id === editingBranchId) {
          return {
            ...b,
            name: form.branchName,
            address: form.locationAddress,
            totalBeds: Number(form.totalBedCapacity) || 0,
            staff: Number(form.staffCount) || 0,
            departments: form.departments,
            resources: form.resources,
          };
        }
        return b;
      });
    }
    setBranches(updated);
    saveBranches(updated);
    closeModal();
  };

  const isViewMode = modalMode === "view";
  const getModalTitle = () => {
    if (modalMode === "add") return "Add New Branch";
    if (modalMode === "edit") return "Branch Settings";
    return "Branch Details";
  };

  const getModalActionText = () => {
    if (modalMode === "add") return "Create Branch";
    return "Save Settings";
  };

  const getStatusBadgeClass = (status) => STATUS_CLASS_MAP[status] ?? "status-pill-inactive";
  const getStatusLabel = (status) => STATUS_LABEL_MAP[status] ?? "inactive";
  const getInputClass = (fieldName) => {
    return `form-input${errors[fieldName] ? " input-error" : ""}`;
  };
  return (
    <div className="container-fluid py-3 admin-content-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="page-title">Branch Management</h2>
          <p className="page-subtitle">Manage multi-branch hospital operations</p>
        </div>
        <button className="bm-btn-add" onClick={() => openModal("add")}>
          <BsPlus size={18} />
          Add New Branch
        </button>
      </div>
      <div className="bm-grid mb-4">
        {branches.map((branch) => (
          <div key={branch.id} className="bm-card">
            <div className="bm-card-header">
              <div className="d-flex align-items-center gap-3">
                <div className="bm-branch-icon">
                  <BsBuilding size={24} color="#ffffff" />
                </div>
                <div>
                  <h6 className="bm-branch-name">{branch.name}</h6>
                  <span className="bm-branch-id">{branch.id}</span>
                </div>
              </div>
              <span className={`status-pill ${getStatusBadgeClass(branch.status)}`}>
                {getStatusLabel(branch.status)}
              </span>
            </div>
            <div className="bm-address-row">
              <BsGeoAlt size={14} className="bm-address-icon" />
              <span className="bm-address-text">{branch.address}</span>
            </div>
            <div className="bm-stats-row">
              <div className="bm-stat">
                <span className="bm-stat-label">Total Beds</span>
                <span className="bm-stat-value">{branch.totalBeds}</span>
              </div>
              <div className="bm-stat">
                <span className="bm-stat-label">Staff</span>
                <span className="bm-stat-value">{branch.staff}</span>
              </div>
              <div className="bm-stat">
                <span className="bm-stat-label">Patients</span>
                <span className="bm-stat-value">{branch.patients}</span>
              </div>
            </div>
            <div className="bm-card-footer">
              <button className="bm-btn-view-details" onClick={() => openModal("view", branch)}>
                <BsEye size={14} />
                View Details
              </button>
              <button className="bm-btn-settings" title="Branch settings" onClick={() => openModal("edit", branch)}>
                <BsGear size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="bm-network-card">
        <h6 className="bm-network-title">Network Overview</h6>
        <div className="bm-network-stats">
          {NETWORK_STATS.map(({ label, value, colorClass }) => (
            <div key={label} className={`bm-network-stat ${colorClass}`}>
              <span className="bm-network-label">{label}</span>
              <span className="bm-network-value">{value}</span>
            </div>
          ))}
        </div>
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
              <button className="btn-primary-action" onClick={handleSaveBranch}>
                {getModalActionText()}
              </button>
              <button className="btn-secondary-action" onClick={closeModal}>
                Cancel
              </button>
            </>
          )}>
        <div className="field-group">
                  <label className="field-group-label">
                    Branch Name <span className="required-mark">*</span>
                  </label>
                  <input
                    type="text"
                    className={getInputClass("branchName")}
                    placeholder="North Medical Center"
                    value={form.branchName}
                    onChange={(e) => setForm((p) => ({ ...p, branchName: e.target.value }))}
                    disabled={isViewMode} />
                  {errors.branchName && <span className="error-hint">{errors.branchName}</span>}
                </div>
                <div className="field-group">
                  <label className="field-group-label">
                    Location Address <span className="required-mark">*</span>
                  </label>
                  <input
                    type="text"
                    className={getInputClass("locationAddress")}
                    placeholder="123 Healthcare Ave, City"
                    value={form.locationAddress}
                    onChange={(e) => setForm((p) => ({ ...p, locationAddress: e.target.value }))}
                    disabled={isViewMode}/>
                  {errors.locationAddress && <span className="error-hint">{errors.locationAddress}</span>}
                </div>
                <div className="two-col-grid">
                  <div className="field-group">
                    <label className="field-group-label">
                      Total Bed Capacity <span className="required-mark">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      value={form.totalBedCapacity}
                      onChange={(e) => setForm((p) => ({ ...p, totalBedCapacity: e.target.value }))}
                      disabled={isViewMode}/>
                  </div>
                  <div className="field-group">
                    <label className="field-group-label">
                      Staff Count <span className="required-mark">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      value={form.staffCount}
                      onChange={(e) => setForm((p) => ({ ...p, staffCount: e.target.value }))}
                      disabled={isViewMode}/>
                  </div>
                </div>
                <div className="field-group">
                  <label className="field-group-label">Departments</label>
                  <div className="bm-section-box">
                    <div className="bm-checklist-grid">
                      {DEPARTMENT_LIST.map((item) => (
                        <label key={item} className="bm-check-item">
                          <input
                            type="checkbox"
                            className="check-input"
                            checked={form.departments.includes(item)}
                            onChange={() => toggleListItem("departments", item)}
                            disabled={isViewMode}/>
                          {item}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="field-group">
                  <label className="field-group-label">Available Resources</label>
                  <div className="bm-section-box">
                    <div className="bm-checklist-grid">
                      {RESOURCE_LIST.map((item) => (
                        <label key={item} className="bm-check-item">
                          <input
                            type="checkbox"
                            className="check-input"
                            checked={form.resources.includes(item)}
                            onChange={() => toggleListItem("resources", item)}
                            disabled={isViewMode}/>
                        {item}
                      </label>
                    ))}
                </div>
            </div>
        </div>
      </Modal>
    </div>
  );
}

export default BranchManagementContent;