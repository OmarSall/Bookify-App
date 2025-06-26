import styles from "./SortBar.module.css";
import {Box, Button} from "@mui/material";
import ItemsPerPageSelector from "../ItemsPerPageSelector/ItemsPerPageSelector";

type SortBarProps = {
    venuesPerPage: number;
    onVenuesPerPageChange: (val: number) => void;
};

const SortBar = ({venuesPerPage, onVenuesPerPageChange}: SortBarProps) => {
    return (
        <Box className={styles.sortBar}>
            <div className={styles.showCount}>
                <ItemsPerPageSelector
                    value={venuesPerPage}
                    options={[12, 24, 36, 48]}
                    onChange={onVenuesPerPageChange}
                />
            </div>

            <div className={styles.actions}>
                <Button variant="outlined" className={styles.sortButton}>
                    sort
                </Button>
            </div>
        </Box>
    );
};

export default SortBar;