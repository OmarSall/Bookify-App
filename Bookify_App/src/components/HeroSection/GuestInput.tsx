import { Box, IconButton, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import styles from "./GuestsInput.module.css";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  placeholder?: string;
}

const GuestsInput = ({
                       value,
                       onChange,
                       min = 2,
                       max = 10,
                       placeholder = "guests",
                     }: Props) => {
  const decreaseGuests = () => onChange(Math.max(min, (value || min) - 1));
  const increaseGuests = () => onChange(Math.min(max, (value || 0) + 1));

  const showPlaceholder = !value;

  return (
    <Box className={styles.guestsInput}>
      <IconButton size="small" onClick={decreaseGuests} disabled={showPlaceholder || value <= min}>
        <Remove fontSize="small" />
      </IconButton>

      {showPlaceholder ? (
        <Typography className={styles.placeholder}>{placeholder}</Typography>
      ) : (
        <Typography className={styles.value}>{value} {value === 1 ? "guest" : "guests"}</Typography>
      )}

      <IconButton size="small" onClick={increaseGuests} disabled={value >= max}>
        <Add fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default GuestsInput;