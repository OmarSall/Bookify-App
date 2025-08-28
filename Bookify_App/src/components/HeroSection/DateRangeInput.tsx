import { useEffect, useMemo, useRef, useState } from "react";
import { Box, InputAdornment, Popper, TextField, ClickAwayListener, IconButton } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ClearIcon from "@mui/icons-material/Clear";
import { DateRange, RangeKeyDict } from "react-date-range";
import { format } from "date-fns";
import styles from "./DateRangeInput.module.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type Props = {
  /** YYYY-MM-DD or empty */
  start?: string;
  end?: string;
  onChange: (startISO?: string, endISO?: string) => void;
  placeholder?: string;
};

function toISO(date: Date | null | undefined) {
  if (!date) {
    return undefined;
  }
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function DateRangeInput({
                                         start,
                                         end,
                                         onChange,
                                         placeholder = "date",
                                       }: Props) {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const [range, setRange] = useState([
    {
      startDate: start ? new Date(start) : null,
      endDate: end ? new Date(end) : null,
      key: "selection",
    },
  ]);

  useEffect(() => {
    setRange([
      {
        startDate: start ? new Date(start) : null,
        endDate: end ? new Date(end) : null,
        key: "selection",
      },
    ]);
  }, [start, end]);

  const display = useMemo(() => {
    const s = range[0].startDate ? format(range[0].startDate, "yyyy-MM-dd") : "";
    const e = range[0].endDate ? format(range[0].endDate, "yyyy-MM-dd") : "";
    if (s && e) return `${s} – ${e}`;
    if (s) return s;
    return "";
  }, [range]);

  const handleApply = (next: RangeKeyDict) => {
    const s = toISO(next.selection.startDate as Date);
    const e = toISO(next.selection.endDate as Date);
    setRange([next.selection as any]);
    onChange(s, e);
  };

  const clear = () => {
    setRange([{ startDate: null, endDate: null, key: "selection" } as any]);
    onChange(undefined, undefined);
  };

  return (
    <Box ref={anchorRef} className={styles.wrapper}>
      <TextField
        className={styles.textField}
        placeholder={placeholder}
        value={display}
        onClick={() => setOpen(true)}
        onFocus={() => setOpen(true)}
        InputProps={{
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">
              <CalendarTodayIcon sx={{ fontSize: 18, color: "#666" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <>
              {display ? (
                <IconButton size="small" onClick={clear} aria-label="clear dates">
                  <ClearIcon fontSize="small" />
                </IconButton>
              ) : null}
            </>
          ),
        }}
      />

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        sx={{ zIndex: 1500 }}
      >
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Box className={styles.popperPaper}>
            <DateRange
              onChange={handleApply}
              moveRangeOnFirstSelection={false}
              months={2}
              direction="horizontal"
              ranges={range as any}
              rangeColors={["#4caf50"]}
              editableDateInputs
            />
          </Box>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
}
