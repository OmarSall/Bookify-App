import { useState } from 'react';
import { signup } from "@/services/auth";
import { useAuth } from "@/services/auth/AuthContext";
import { Link, useNavigate } from 'react-router-dom';
import styles from './SignUpPage.module.css';

export default function SignUpPage() {
  const nav = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: '', name: '', password: '' });
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const u = await signup(form);
      setUser(u);
      nav('/');
    } catch (e: any) {
      setErr(e?.response?.data?.message ?? 'Sign-up failed');
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
              <h1 className={styles.title}>Create account</h1>
              <p className={styles.subTitle}>Join Bookify to start booking</p>

              {err && <div className={styles.errorText}>{err}</div>}

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

                <label className={styles.label} htmlFor="name">Name</label>
                <input
                  id="name"
                  className={styles.input}
                  placeholder="Your name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />

                <label className={styles.label} htmlFor="password">Password</label>
                <input
                  id="password"
                  className={styles.input}
                  placeholder="Create a password"
                  type="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className={styles.submitBtn}
                >
                  {loading ? 'Creating…' : 'Sign up'}
                </button>
              </form>

              <div className={styles.altAction}>
                Already have an account?{' '}
                <Link className={styles.link} to="/login">Log in</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
