import { MOCK_USERS } from "./mockData";
import { AUTH_CONFIG } from "./authConfig";

export const authService = {
  /*Replaces this with a real API call */
  login: async ({ email, password, role, branch }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = MOCK_USERS.find(
          (u) =>
            u.email === email &&
            u.password === password &&
            u.role === role &&
            u.branch === branch
        );
        if (user) {
          const sessionData = {
            id: user.id,
            displayName: user.displayName,
            email: user.email,
            role: user.role,
            selectedBranch: user.branch,
          };
          localStorage.setItem(AUTH_CONFIG.SESSION_KEY, JSON.stringify(sessionData));
          resolve({ success: true, user: sessionData });
        } else {
          reject({ success: false, message: "Invalid credentials or role/branch mismatch" });
        }
      }, AUTH_CONFIG.MOCK_DELAY_MS);
    });
  },

  logout: () => {
    localStorage.removeItem(AUTH_CONFIG.SESSION_KEY);
  },
  getCurrentUser: () => {
    const data = localStorage.getItem(AUTH_CONFIG.SESSION_KEY);
    return data ? JSON.parse(data) : null;
  },
  isAuthenticated: () => {
    return !!localStorage.getItem(AUTH_CONFIG.SESSION_KEY);
  },
};
