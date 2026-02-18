'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { fetchSession, logout as apiLogout, type User } from '@/lib/auth';

type AccountType = 'user' | 'network';

type AuthState = {
  user: User | null;
  profile: User | null;
  accountType: AccountType | null;
  loading: boolean;
  configured: boolean;
};

const defaultState: AuthState = {
  user: null,
  profile: null,
  accountType: null,
  loading: true,
  configured: true,
};

const AuthContext = createContext<AuthState & { logout: () => Promise<void> }>({
  ...defaultState,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(defaultState);

  const loadSession = useCallback(async () => {
    try {
      const { user } = await fetchSession();
      if (user) {
        setState({
          user,
          profile: user,
          accountType: user.account_type as AccountType,
          loading: false,
          configured: true,
        });
      } else {
        setState({
          user: null,
          profile: null,
          accountType: null,
          loading: false,
          configured: true,
        });
      }
    } catch {
      setState({
        user: null,
        profile: null,
        accountType: null,
        loading: false,
        configured: true,
      });
    }
  }, []);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const logout = useCallback(async () => {
    await apiLogout();
    setState({
      user: null,
      profile: null,
      accountType: null,
      loading: false,
      configured: true,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
