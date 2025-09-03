import { useEffect, useState } from "react";
import { login } from "@/services/auth";
import { useAuth } from "@/services/auth/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { AxiosError } from "axios";

function isAxiosError<T = unknown>(e: unknown): e is AxiosError<T> {
  return typeof e === "object" && e !== null && (e as any).isAxiosError === true;
}

export default function LoginPage() {
  const nav = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.msg) {
      setInfoMsg(location.state.msg);
      // optional: clear state to avoid showing message after page refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const user = await login(form);
      setUser(user);
      nav("/");
    } catch (error: unknown) {
      if (isAxiosError<{ message?: string }>(error)) {
        setErr(error.response?.data?.message ?? "Login failed");
      } else if (error instanceof Error) {
        setErr(error.message);
      } else {
        setErr("Login failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            <div className={styles.formCard}>
              <h1 className={styles.title}>Log in</h1>
              <p className={styles.subTitle}>Welcome back to Bookify</p>

              {err && <div className={styles.errorText}>{err}</div>}
              {infoMsg && (
                <div className={styles.infoBanner}>
                  {infoMsg}
                </div>
              )}
              <form className={styles.form} onSubmit={onSubmit} noValidate>
                <label className={styles.label} htmlFor="email">Email</label>
                <input
                  id="email"
                  className={styles.input}
                  placeholder="you@example.com"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />

                <label className={styles.label} htmlFor="password">Password</label>
                <input
                  id="password"
                  className={styles.input}
                  placeholder="Your password"
                  type="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className={styles.submitBtn}
                >
                  {loading ? "Signing in…" : "Log in"}
                </button>
              </form>

              <div className={styles.altAction}>
                Don’t have an account?{" "}
                <Link className={styles.link} to="/signup">Create one</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
