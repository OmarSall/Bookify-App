import styles from "./HeroSection.module.css";
import { Box, Typography, Button, InputAdornment, Autocomplete, TextField } from "@mui/material";
import TreeWithCouple from "../../assets/treeWithCouple.svg?react";
import UpperOrnament from "../../assets/UpperOrnament.svg?react";
import CustomInput from "../CustomInput";
import CelebrationIcon from "@mui/icons-material/Celebration";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GuestsInput from "./GuestInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationAutocomplete from "./LocationAutocomplete";
import type { VenueType } from "@/services/venues.types";
import TypeAutocomplete from "./TypeAutocomplete";
import DateRangeInput from "./DateRangeInput";


const HeroSection = () => {
  const [location, setLocation] = useState<string | null>(null);
  const navigate = useNavigate();
  const [venueType, setVenueType] = useState<VenueType | "">("");
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [guests, setGuests] = useState<number>(0);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location && location.trim()) {
      params.set("city", location.trim());
    }
    if (venueType) {
      params.set("type", venueType);
    }
    if (startDate) {
      params.set("startDate", startDate);
    }
    if (endDate) {
      params.set("endDate", endDate);
    }
    if (guests && guests > 0) {
      params.set("guests", String(guests));
    }
    navigate({ pathname: "/", search: params.toString() });
  };

  return (
    <Box className={styles.hero}>
      <UpperOrnament className={styles.ornament} />
      <TreeWithCouple className={styles.illustration} />

      <Box className={styles.content}>
        <div className={styles.heading}>
          Find your place and experience it together.
        </div>
        <form onSubmit={(event) => {
          event.preventDefault();
          handleSearch();
        }}>
          <Box className={styles.inputGroup}>
            <CustomInput
              name="localization"
              placeholder="localization"
              className={styles.input}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationAutocomplete
                      value={location ?? ""}
                      onChange={setLocation}
                      placeholder="localization"
                    />
                  </InputAdornment>
                ),
              }}
            />

            <CustomInput
              name="occasion"
              placeholder="occasion"
              className={styles.input}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CelebrationIcon sx={{ fontSize: 18, color: "#666" }} />
                  </InputAdornment>
                ),
              }}
            />

            <DateRangeInput
              start={startDate}
              end={endDate}
              onChange={(s, e) => {
                setStartDate(s);
                setEndDate(e);
              }}
              placeholder="date"
            />

            <GuestsInput value={guests} onChange={setGuests} />

            <CustomInput
              name="venue"
              placeholder="venue type"
              className={styles.input}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ gap: 1 }}>

                    <TypeAutocomplete
                      value={venueType}
                      onChange={setVenueType}
                      placeholder="venue type"
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Typography className={styles.subtle}>
            I don't want to be that specific
          </Typography>

          <Button type="submit" variant="contained" className={styles.searchBtn}>
            Search for venue
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default HeroSection;