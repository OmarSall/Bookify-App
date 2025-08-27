import styles from "./SortBar.module.css";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import ItemsPerPageSelector from "../ItemsPerPageSelector/ItemsPerPageSelector";
import { useState } from "react";

export type SortValue =
  | "newest"
  | "oldest"
  | "price_asc"
  | "price_desc"
  | "rating_desc"
  | "rating_asc"
  | "capacity_desc"
  | "capacity_asc";


type SortBarProps = {
  venuesPerPage: number;
  onVenuesPerPageChange: (val: number) => void;
  sort: SortValue;
  onSortChange: (val: SortValue) => void;
};

const labels: Record<SortValue, string> = {
  newest: "Newest",
  oldest: "Oldest",
  price_asc: "Price: low → high",
  price_desc: "Price: high → low",
  rating_desc: "Rating: high → low",
  rating_asc: "Rating: low → high",
  capacity_desc: "Capacity: high → low",
  capacity_asc: "Capacity: low → high",
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
          options={[12, 24, 36, 48]}
          onChange={onVenuesPerPageChange}
        />
      </div>

      <div className={styles.actions}>
        <Button
          variant="outlined"
          className={styles.sortButton}
          onClick={(event) => setAnchor(event.currentTarget)}
        >
          {labels[sort] ?? "sort"}
        </Button>
        <Menu anchorEl={anchor} open={open} onClose={() => setAnchor(null)}>
          {(
            [
              "newest",
              "oldest",
              "price_asc",
              "price_desc",
              "rating_desc",
              "rating_asc",
              "capacity_desc",
              "capacity_asc",
            ] as SortValue[]
          ).map((opt) => (
            <MenuItem key={opt} selected={opt === sort} onClick={() => handlePick(opt)}>
              {labels[opt]}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </Box>
  );
};

export default SortBar;