import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { me, logout as apiLogout, type AuthUser } from '../auth';

export interface AuthContextValue {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const currentUser = await me();
        if (!alive) return;
        setUser(currentUser);
      } catch {
        if (!alive) return;
        setUser(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  async function logout() {
    await apiLogout();
    setUser(null);
  }

  const value: AuthContextValue = { user, setUser, loading, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
