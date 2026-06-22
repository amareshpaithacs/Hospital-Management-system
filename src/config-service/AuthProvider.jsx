import { useState } from "react";
import PropTypes from "prop-types";
import { authService } from "./serviceconfig";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser());

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    if (response.success) {
      setUser(response.user);
    }
    return response;
  };
  const logout = () => {
    authService.logout();
    setUser(null);
  };
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};