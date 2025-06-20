import styles from "./SortBar.module.css";
import { ToggleButton, ToggleButtonGroup, Button, Box } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

const SortBar = () => {
    return (
        <Box className={styles.sortBar}>
            <ToggleButtonGroup exclusive>
                <ToggleButton value="grid" disabled>
                    <ViewModuleIcon />
                </ToggleButton>
                <ToggleButton value="list" disabled>
                    <ViewListIcon />
                </ToggleButton>
            </ToggleButtonGroup>

            <div className={styles.actions}>
                <Button variant="outlined" disabled>
                    Sort
                </Button>
                <Button variant="text" disabled>
                    Reset
                </Button>
            </div>
        </Box>
    );
};

export default SortBar;