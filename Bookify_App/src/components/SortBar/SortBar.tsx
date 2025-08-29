import styles from "./SortBar.module.css";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import ItemsPerPageSelector from "../ItemsPerPageSelector/ItemsPerPageSelector";
import { useState } from "react";
import {
  SORT_OPTIONS,
  SORT_LABELS,
  ITEMS_PER_PAGE_OPTIONS,
  type SortValue,
} from "@/constants/sort";

type SortBarProps = {
  venuesPerPage: number;
  onVenuesPerPageChange: (val: number) => void;
  sort: SortValue;
  onSortChange: (val: SortValue) => void;
};

const SortBar = ({ venuesPerPage, onVenuesPerPageChange, sort, onSortChange }: SortBarProps) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);

  const handlePick = (val: SortValue) => {
    onSortChange(val);
    setAnchor(null);
  };

  return (
    <Box className={styles.sortBar}>
      <div className={styles.showCount}>
        <ItemsPerPageSelector
          value={venuesPerPage}
          options={[...ITEMS_PER_PAGE_OPTIONS]}
          onChange={onVenuesPerPageChange}
        />
      </div>

      <div className={styles.actions}>
        <Button
          variant="outlined"
          className={styles.sortButton}
          onClick={(event) => setAnchor(event.currentTarget)}
        >
          {SORT_LABELS[sort] ?? "Sort"}
        </Button>
        <Menu anchorEl={anchor} open={open} onClose={() => setAnchor(null)}>
          {SORT_OPTIONS.map(({ value, label }) => (
            <MenuItem key={value} selected={value === sort} onClick={() => handlePick(value)}>
              {label}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </Box>
  );
};

export default SortBar;