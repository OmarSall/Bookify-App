import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { me, logout as apiLogout, type AuthUser } from "../auth";
import { register401Handler } from "@/lib/http";
import { useNavigate } from "react-router-dom";

export interface AuthContextValue {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AUTH_SYNC_KEY = "bookify:auth-sync";

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        if (alive) {
          setLoading(false);
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== AUTH_SYNC_KEY) {
        return;
      }
      if (event.newValue === "logged-out") {
        setUser(null);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    const handler = async () => {
      await logout();
      navigate("/login", {
        replace: true,
        state: { msg: "Session expired. Please log in." },
      });
    };

    register401Handler(handler);
    return () => register401Handler(null);
  }, [logout, navigate]);

  async function logout() {
    try {
      await apiLogout();
    } catch {
    } finally {
      setUser(null);

      try {
        localStorage.removeItem("auth");
        sessionStorage.removeItem("auth");
      } catch {
      }

      try {
        localStorage.setItem(AUTH_SYNC_KEY, "logged-out");
        localStorage.removeItem(AUTH_SYNC_KEY);
      } catch {
      }
    }
  }

  const value: AuthContextValue = { user, setUser, loading, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
