import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType } from '../types/auth';

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'patient' | 'doctor' | 'admin' | null>(null);

  useEffect(() => {
    // Check for existing session
    const checkAuth = () => {
      const role = localStorage.getItem('userRole');
      if (role) {
        setIsAuthenticated(true);
        setUserRole(role as 'patient' | 'doctor' | 'admin');
      }
    };

    checkAuth();
  }, []);

  const login = (role: 'patient' | 'doctor' | 'admin') => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('userRole');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};