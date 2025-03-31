import { useState, useEffect } from 'react';
import { API_URL } from '../utils/constants';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    fetch(`${API_URL}/api/current_user`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.isLoggedIn) {
          setUser(data.user);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error checking auth status:', err);
        setLoading(false);
      });
  }, []);

  const login = (provider) => {
    window.location.href = `${API_URL}/auth/${provider}`;
  };

  const logout = () => {
    window.location.href = `${API_URL}/api/logout`;
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
} 