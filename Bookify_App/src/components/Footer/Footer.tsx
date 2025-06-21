import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Email } from "@mui/icons-material";

const Footer = () => {
    return (
        <footer className={styles.footerWrapper}>
            <div className={styles.footerInner}>
                <div className={styles.topLinks}>
                    <Link to="/contact">contact</Link>
                    <Link to="/assistance">assistance</Link>
                    <Link to="/about">about us</Link>
                </div>

                <div className={styles.message}>
                    <p>Feel free to contact us in case of any problems and doubts.</p>
                    <p>We are there for you.</p>
                </div>

                <div className={styles.icons}>
                    <Facebook />
                    <Instagram />
                    <Twitter />
                    <Email />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
