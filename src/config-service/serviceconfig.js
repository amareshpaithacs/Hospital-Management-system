import { MOCK_USERS } from "./authConfig";

const SESSION_KEY = "hms_user_session";

export const authService = {
  /**
   * Temporary mock login logic.
   * Replaces this with a real API call (e.g., fetch POST /api/auth/login) in the future.
   */
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
            email: user.email,
            role: user.role,
            selectedBranch: user.branch,
            // In a real app, store the JWT token here instead of plain user details
          };
          localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
          resolve({ success: true, user: sessionData });
        } else {
          reject({ success: false, message: "Invalid credentials or role/branch mismatch" });
        }
      }, 800);
    });
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  getCurrentUser: () => {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(SESSION_KEY);
  },
};
