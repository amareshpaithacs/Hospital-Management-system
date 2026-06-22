const STORAGE_KEY = "hms_users";

const SEED_USERS = [
  {
    id: "DOC001",
    name: "Dr. James Wilson",
    email: "james.wilson@hospital.com",
    role: "Doctor",
    department: "General Medicine",
    status: "active",
    accessExpiry: "",
    lastLogin: "2026-01-03 08:30",
    initials: "D",
    avatarColor: "teal",
    permissions: [],
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "NUR001",
    name: "Jennifer Thompson",
    email: "jennifer.t@hospital.com",
    role: "Nurse",
    department: "ICU Ward",
    status: "active",
    accessExpiry: "",
    lastLogin: "2026-01-03 07:00",
    initials: "J",
    avatarColor: "teal",
    permissions: [],
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "PHA001",
    name: "Robert Martinez",
    email: "robert.m@hospital.com",
    role: "Pharmacist",
    department: "Central Pharmacy",
    status: "active",
    accessExpiry: "",
    lastLogin: "2026-01-02 16:45",
    initials: "R",
    avatarColor: "teal",
    permissions: [],
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "REC001",
    name: "Maria Rodriguez",
    email: "maria.r@hospital.com",
    role: "Receptionist",
    department: "Front Desk",
    status: "active",
    accessExpiry: "",
    lastLogin: "2026-01-03 08:00",
    initials: "M",
    avatarColor: "teal",
    permissions: [],
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "LAB001",
    name: "Dr. Michael Lee",
    email: "michael.lee@hospital.com",
    role: "Lab Technician",
    department: "Clinical Laboratory",
    status: "active",
    accessExpiry: "",
    lastLogin: "2026-01-03 09:15",
    initials: "D",
    avatarColor: "teal",
    permissions: [],
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "DOC002",
    name: "Dr. Sarah Johnson",
    email: "sarah.j@hospital.com",
    role: "Doctor",
    department: "Cardiology",
    status: "inactive",
    accessExpiry: "",
    lastLogin: "2025-12-20 14:30",
    initials: "D",
    avatarColor: "teal",
    permissions: [],
    createdAt: "2026-01-01T00:00:00Z",
  },
];

export function getUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('[Storage] Failed to read users from localStorage:', err);
  }
  return SEED_USERS;
}
export function saveUsers(users) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('[Storage] Failed to save users to localStorage:', err);
  }
}
export function generateUserId(role, existingUsers) {
  const prefixMap = {
    Doctor: "DOC",
    Nurse: "NUR",
    Pharmacist: "PHA",
    Receptionist: "REC",
    "Lab Technician": "LAB",
    Admin: "ADM",
  };
  const prefix = prefixMap[role] || "USR";
  const count = existingUsers.filter((u) => u.id.startsWith(prefix)).length + 1;
  return `${prefix}${String(count).padStart(3, "0")}`;
}
