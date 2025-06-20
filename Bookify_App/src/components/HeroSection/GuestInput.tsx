import { Box, IconButton, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import styles from "./GuestsInput.module.css";

const GuestsInput = () => {
    return (
        <Box className={styles.guestsInput}>
            <IconButton size="small">
                <Remove fontSize="small" />
            </IconButton>
            <Typography className={styles.placeholder}>guests</Typography>
            <IconButton size="small">
                <Add fontSize="small" />
            </IconButton>
        </Box>
    );
};

export default GuestsInput;