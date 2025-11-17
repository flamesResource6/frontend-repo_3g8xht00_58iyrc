import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      api.me(token).then(setUser).catch(() => setToken(''));
    }
  }, []);

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  const login = async (email, password) => {
    setLoading(true); setError('');
    try {
      const res = await api.login({ email, password });
      setToken(res.token);
      const me = await api.me(res.token);
      setUser(me);
    } catch (e) { setError(e.message); throw e; }
    finally { setLoading(false); }
  };

  const register = async (name, email, password) => {
    setLoading(true); setError('');
    try {
      await api.register({ name, email, password });
      await login(email, password);
    } catch (e) { setError(e.message); throw e; }
    finally { setLoading(false); }
  };

  const logout = async () => {
    try { if (token) await api.logout(token); } catch {}
    setToken(''); setUser(null);
  };

  const value = useMemo(() => ({ token, user, loading, error, login, register, logout, setUser }), [token, user, loading, error]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
