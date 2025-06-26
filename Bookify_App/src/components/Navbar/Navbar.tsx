import {Link} from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <div className={styles.navbarWrapper}>
            <div className={styles.navbarInner}>
                <nav className={styles.navbar}>
                    <div>
                        <Link to="/" className={styles.logoLink}>BOOKIFY</Link>
                    </div>
                    <div className={styles.navLinks}>
                        <Link to="/about" className={styles.link}>about us</Link>
                        <Link to="/favourites" className={styles.link}>your favourites</Link>
                        <Link to="/start-hosting" className={styles.link}>start hosting</Link>
                        <Link to="/login" className={`${styles.link} ${styles.loginLink}`}>login</Link>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;