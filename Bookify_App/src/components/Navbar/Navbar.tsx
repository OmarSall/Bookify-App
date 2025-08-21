import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../../services/auth/AuthContext";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const label = user?.email ? user.email.split("@")[0] : null;

  // Opcjonalnie: ukryj pasek do czasu rozstrzygnięcia stanu logowania,
  // żeby nie było migotania "login → logged in".
  if (loading) {
    return (
      <div className={styles.navbarWrapper}>
        <div className={styles.navbarInner}>
          <nav className={styles.navbar}>
            <div>
              <Link to="/" className={styles.logoLink}>BOOKIFY</Link>
            </div>
            <div className={styles.navLinks}>
              {/* tu można wstawić skeleton/placeholder */}
            </div>
          </nav>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbarInner}>
        <nav className={styles.navbar}>
          <div>
            <Link to="/" className={styles.logoLink}>BOOKIFY</Link>
          </div>

          <div className={styles.navLinks}>
            <NavLink to="/about" className={styles.link}>about us</NavLink>

            {user ? (
              <>
                <NavLink to="/start-hosting" className={styles.link}>start hosting</NavLink>
                <NavLink to="/my-bookings" className={styles.link}>my bookings</NavLink>
                <NavLink to="/my-favourites" className={styles.link}>my favourites</NavLink>

                <span className={styles.link}>
                  logged in as <strong>{label}</strong>
                </span>

                <button type="button" onClick={logout} className={styles.link}>
                  log out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={`${styles.link} ${styles.loginLink}`}>login</NavLink>
                <NavLink to="/signup" className={styles.link}>sign up</NavLink>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
