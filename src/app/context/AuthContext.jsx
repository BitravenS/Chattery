// context/AuthContext.js
"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { authService } from "@/services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const data = await authService.getStatus();
      if (data?.authenticated) {
        setUser(data.user);
      } else {
        setUser(null);
      }
      return data?.authenticated || false;
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null); // Ensure user is cleared on error
      return false;
    } finally {
      setLoading(false);
    }
  };

  const completeOAuthFlow = async () => {
    try {
      const userData = await authService.handleCallback();
      if (userData && userData.id) {
        // Validate the response
        setUser(userData);
        return true;
      } else {
        throw new Error("Invalid user data received during OAuth flow.");
      }
    } catch (error) {
      console.error("OAuth completion error:", error);
      return false;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true); // Ensure loading is true before checking auth status
      await checkAuthStatus();
    };

    initializeAuth();
  }, []);

  const login = async (provider) => {
    try {
      await authService.login(provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const SaveUsername = async (tempUsername) => {
    try {
      await authService.handleSaveChanges(tempUsername);
    } catch (error) {
      console.error("Failed to update username:", error);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const refreshUser = async () => {
    const oauthSuccess = await completeOAuthFlow();
    if (!oauthSuccess) {
      await checkAuthStatus();
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
