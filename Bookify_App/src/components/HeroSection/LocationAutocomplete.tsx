import { useEffect, useState, useCallback } from "react";
import { Autocomplete, TextField, InputAdornment, CircularProgress } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getVenueLocations } from "@/services/venues";
import styles from "./LocationAutocomplete.module.css";

const SUGGESTIONS_LIMIT = 12;

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

/**
 * Score how well one location option matches the user's query.
 * Higher score = better match. -1 means "no match".
 */
function rankLocationMatch(queryRaw: string, optionRaw: string) {
  const normalizedQuery = normalizeText(queryRaw);
  const normalizedOption = normalizeText(optionRaw);

  if (!normalizedQuery) {
    return 0;
  }

  if (normalizedOption.startsWith(normalizedQuery)) {
    return 100;
  }

  const words = normalizedOption.split(/\s+/);
  if (words.some((word) => word.startsWith(normalizedQuery))) {
    return 80;
  }

  if (normalizedOption.includes(normalizedQuery)) {
    return 60;
  }

  let matchedCount = 0;
  for (const character of normalizedOption) {
    if (character === normalizedQuery[matchedCount]) {
      matchedCount++;
    }
  }
  if (matchedCount === normalizedQuery.length) {
    return 40;
  }

  return -1;
}

type LocationAutocompleteProps = {
  value?: string;
  onChange?: (value: string | null) => void;
  className?: string;
  label?: string;
  placeholder?: string;
};

export default function LocationAutocomplete({
                                               value,
                                               onChange,
                                               className,
                                               label = "",
                                               placeholder = "localization",
                                             }: LocationAutocompleteProps) {
  const [allLocations, setAllLocations] = useState<string[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [inputValue, setInputValue] = useState(value ?? "");

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoadingLocations(true);
        const locations = await getVenueLocations();
        console.log("[locations]", locations); // debug: should be an array of strings
        if (isMounted) {
          setAllLocations(locations);
        }
      } finally {
        setLoadingLocations(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const filterOptions = useCallback(
    (options: string[], state: { inputValue: string }) => {
      const currentQuery = state.inputValue ?? "";
      const scoredOptions = options
        .map((option) => ({ option, score: rankLocationMatch(currentQuery, option) }))
        .filter((scoredItem) => scoredItem.score >= 0)
        .sort(
          (left, right) =>
            right.score - left.score || left.option.localeCompare(right.option),
        );

      return scoredOptions.slice(0, SUGGESTIONS_LIMIT).map((scoredItem) => scoredItem.option);
    },
    [],
  );

  return (
    <Autocomplete
      className={`${styles.autocompleteRoot} ${className ?? ""}`}
      options={allLocations}
      slotProps={{ popper: { sx: { zIndex: 1300 } } }}
      value={value ?? null}
      onChange={(_, newValue) => onChange?.(newValue)}
      inputValue={inputValue}
      onInputChange={(_, newValue) => setInputValue(newValue)}
      getOptionLabel={(opt) => (typeof opt === "string" ? opt : String(opt))}
      isOptionEqualToValue={(opt, val) => opt === val}
      filterOptions={filterOptions}
      loading={loadingLocations}
      openOnFocus
      noOptionsText="No locations found"
      ListboxProps={{ className: styles.listbox }}
      renderInput={(params) => (
        <TextField
          {...params}
          className={styles.textField}
          label={label}
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon sx={{ fontSize: 18, color: "#666" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loadingLocations ? <CircularProgress size={16} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
