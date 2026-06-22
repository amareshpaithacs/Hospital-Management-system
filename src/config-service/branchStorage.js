import { SEED_BRANCHES, BRANCH_STATUS } from "./branchSeedData";

const STORAGE_KEY = "hms_branches";
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
  if (!Array.isArray(branches)) {
    console.error('[Storage] Invalid data type. Expected an array of branches.');
    return;
  }
  const validBranches = branches.filter(b => b && b.id && b.name);
  if (validBranches.length !== branches.length) {
    console.warn('[Storage] Some branches were omitted because they lacked required fields (id, name).');
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(validBranches));
  } catch (err) {
    console.error('[Storage] Failed to save branches to localStorage:', err);
  }
}

export function generateBranchId(existingBranches) {
  if (!existingBranches || existingBranches.length === 0) return "BR001";
  const numericIds = existingBranches
    .map(b => b.id)
    .filter(id => id && id.startsWith("BR"))
    .map(id => parseInt(id.replace("BR", ""), 10))
    .filter(num => !isNaN(num));
  const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
  return `BR${String(maxId + 1).padStart(3, "0")}`;
}
