import styles from "./SortBar.module.css";
import { Box, Button, Typography } from "@mui/material";

const SortBar = () => {
    return (
        <Box className={styles.sortBar}>
            {/* Show count */}
            <div className={styles.showCount}>
                <Typography variant="body2" className={styles.label}>
                    show
                </Typography>
                <div className={styles.countBox}>18</div>
                <Typography variant="body2" className={styles.label}>
                    on the page
                </Typography>
            </div>

            {/* Sort button */}
            <div className={styles.actions}>
                <Button variant="outlined" className={styles.sortButton}>
                    sort
                </Button>
            </div>
        </Box>
    );
};

export default SortBar;
