import React, { createContext, useState, useEffect } from 'react';

// Create authentication context
export const AuthContext = createContext();

// Mock users database
const MOCK_USERS = {
  admin: {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User'
  },
  user: {
    id: 2,
    username: 'user',
    password: 'user123',
    role: 'user',
    name: 'Regular User'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to restore user from localStorage', e);
      }
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    // Mock authentication
    const mockUser = Object.values(MOCK_USERS).find(
      (u) => u.username === username && u.password === password
    );

    if (mockUser) {
      const userData = {
        id: mockUser.id,
        username: mockUser.username,
        role: mockUser.role,
        name: mockUser.name
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
