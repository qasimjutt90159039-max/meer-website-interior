import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('meers_admin_token') || null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('meers_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const profile = await api.getProfile(token);
          setUser(profile);
        } catch (err) {
          console.warn('Session expired or invalid. Logging out.');
          logout();
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, [token]);

  const login = async (username, password) => {
    const res = await api.login({ username, password });
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem('meers_admin_token', res.token);
    localStorage.setItem('meers_admin_user', JSON.stringify(res.user));
    return res;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('meers_admin_token');
    localStorage.removeItem('meers_admin_user');
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
