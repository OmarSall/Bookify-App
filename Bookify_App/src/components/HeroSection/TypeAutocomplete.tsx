import { Autocomplete, TextField, InputAdornment } from "@mui/material";
import type { VenueType } from "@/services/venues.types";
import styles from "./TypeAutocomplete.module.css";

type Option = { value: VenueType | ""; label: string };

const DEFAULT_OPTIONS: Option[] = [
  { value: "", label: "venue type" },
  { value: "studio", label: "Studio" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "villa", label: "Villa" },
];

type Props = {
  value: VenueType | "";
  onChange: (val: VenueType | "") => void;
  options?: Option[];
  placeholder?: string;
  className?: string;
};

export default function TypeAutocomplete({
                                           value,
                                           onChange,
                                           options = DEFAULT_OPTIONS,
                                           placeholder = "venue type",
                                           className,
                                         }: Props) {
  const current = options.find((o) => o.value === value) ?? options[0];

  return (
    <Autocomplete
      className={`${styles.autocompleteRoot} ${className ?? ""}`}
      options={options}
      value={current}
      getOptionLabel={(opt) => opt.label}
      isOptionEqualToValue={(a, b) => a.value === b.value}
      onChange={(_, opt) => onChange((opt as Option | null)?.value ?? "")}
      openOnFocus
      noOptionsText="No types found"
      ListboxProps={{ className: styles.listbox }}
      slotProps={{ popper: { sx: { zIndex: 1300 } } }}
      renderInput={(params) => (
        <TextField
          {...params}
          className={styles.textField}
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
          }}
          InputLabelProps={{
            style: { color: "#666" },
          }}
        />
      )}
    />
  );
}
