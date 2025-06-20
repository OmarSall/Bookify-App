import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
      <footer className={styles.footer}>
          <div className={styles.links}>
              <Link to="/about">About us</Link>
              <Link to="/favourites">Your favourites</Link>
              <Link to="/start-hosting">Start hosting</Link>
          </div>
          <div className={styles.socials}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
          <p className={styles.copy}>© Bookify 2025</p>
      </footer>
    );
}