"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { API_URL } from "../utils/constants";

// Create the auth context
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // If no stored user, try to fetch from API
        const response = await fetch(`${API_URL}/auth/current_user`, {
          credentials: "include",
        }).catch(() => null);

        if (response && response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("Error checking auth status:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (provider) => {
    // Redirect to the auth endpoint
    window.location.href = `${API_URL}/auth/${provider}`;
  };

  const logout = async () => {
    try {
      // Call the logout endpoint
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      // Clear local storage and state
      setUser(null);

      // Redirect to home page
      window.location.href = "/";
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  // Make the context object with the user object and auth methods
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook for components to get the auth object and re-render when it changes
export const useAuth = () => {
  return useContext(AuthContext);
};
