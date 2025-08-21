import { createContext, useContext, useEffect, useState } from "react";
import { me, type AuthUser } from "../auth";

type AuthCtx = {
  user: AuthUser | null;
  setUser:
    (u: AuthUser | null) => void;
  loading: boolean;
};
const Ctx = createContext<AuthCtx>({
  user: null,
  setUser: () => {},
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setUser(await me());
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return <Ctx.Provider value={{ user, setUser, loading }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  return useContext(Ctx);
}
