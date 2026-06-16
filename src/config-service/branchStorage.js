const STORAGE_KEY = "hms_branches";

const BRANCH_STATUS = {
  OPERATIONAL: "operational",
  MAINTENANCE: "maintenance",
  INACTIVE: "inactive",
};

const SEED_BRANCHES = [
  {
    id: "BR001",
    name: "Main Campus",
    address: "123 Healthcare Ave, Metro City",
    totalBeds: 120,
    staff: 156,
    patients: 88,
    status: BRANCH_STATUS.OPERATIONAL,
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "BR002",
    name: "North Branch",
    address: "456 North St, Metro City",
    totalBeds: 80,
    staff: 98,
    patients: 52,
    status: BRANCH_STATUS.OPERATIONAL,
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "BR003",
    name: "South Branch",
    address: "789 South Rd, Metro City",
    totalBeds: 60,
    staff: 72,
    patients: 41,
    status: BRANCH_STATUS.OPERATIONAL,
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "BR004",
    name: "East Wing",
    address: "321 East Blvd, Metro City",
    totalBeds: 100,
    staff: 124,
    patients: 67,
    status: BRANCH_STATUS.OPERATIONAL,
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "BR005",
    name: "West Medical Center",
    address: "654 West Ave, Metro City",
    totalBeds: 90,
    staff: 108,
    patients: 0,
    status: BRANCH_STATUS.MAINTENANCE,
    createdAt: "2026-01-01T00:00:00Z",
  },
];

export { BRANCH_STATUS };

export function getBranches() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('[Storage] Failed to read branches from localStorage:', err);
  }
  return SEED_BRANCHES;
}

export function saveBranches(branches) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(branches));
  } catch (err) {
    console.error('[Storage] Failed to save branches to localStorage:', err);
  }
}

export function generateBranchId(existingBranches) {
  const count = existingBranches.length + 1;
  return `BR${String(count).padStart(3, "0")}`;
}
