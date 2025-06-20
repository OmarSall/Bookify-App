import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <AppBar position="static" color="default" elevation={1}>
            <Toolbar className={styles.toolbar}>
                <Typography variant="h6" className={styles.logo}>
                    <Link to="/" className={styles.link}>Bookify</Link>
                </Typography>
            </Toolbar>
            <Box className={styles.navLinks}>
                <Button component={Link} to="/about" color="inherit">About</Button>
                <Button component={Link} to="/favourites" color="inherit">Favourites</Button>
                <Button component={Link} to="/start-hosting" color="inherit">Start Hosting</Button>
                <Button component={Link} to="/login" variant="outlined">Login</Button>
            </Box>
        </AppBar>
    )
}

export default Navbar;