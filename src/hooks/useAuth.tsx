import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { AuthUser } from '../types';
import { login as authenticate, logout as clearSession, readSession } from '../services/authService';

interface AuthContextValue {
  user: AuthUser | null;
  signIn: (email: string, password: string) => AuthUser;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readSession());
  const value = useMemo<AuthContextValue>(() => ({
    user,
    signIn: (email, password) => {
      const nextUser = authenticate(email, password);
      setUser(nextUser);
      return nextUser;
    },
    signOut: () => {
      clearSession();
      setUser(null);
    },
  }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth harus digunakan di dalam AuthProvider.');
  return context;
}
