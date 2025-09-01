import styles from "./HeroSection.module.css";
import {
  Box,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material";
import TreeWithCouple from "../../assets/treeWithCouple.svg?react";
import UpperOrnament from "../../assets/UpperOrnament.svg?react";
import CustomInput from "../CustomInput";
import CelebrationIcon from "@mui/icons-material/Celebration";
import GuestsInput from "./GuestInput";
import { useState } from "react";
import LocationAutocomplete from "./LocationAutocomplete";
import type { VenueType } from "@/services/venues.types";
import TypeAutocomplete from "./TypeAutocomplete";
import DateRangeInput from "./DateRangeInput";

type HeroSectionProps = {
  city: string;
  type?: VenueType;
  startDate: string;
  endDate: string;
  guests: number;

  onCityChange: (val?: string) => void;
  onTypeChange: (val?: VenueType) => void;
  onStartDateChange: (val?: string) => void;
  onEndDateChange: (val?: string) => void;
  onGuestsChange: (val: number) => void;
};

const HeroSection = ({
                       city,
                       type,
                       startDate,
                       endDate,
                       guests,
                       onCityChange,
                       onTypeChange,
                       onStartDateChange,
                       onEndDateChange,
                       onGuestsChange,
                     }: HeroSectionProps) => {

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
                      value={city}
                      onChange={(val) => onCityChange(val || undefined)}
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
                onStartDateChange(s || undefined);
                onEndDateChange(e || undefined);
              }}
              placeholder="date"
            />

            <GuestsInput value={guests} onChange={onGuestsChange} />

            <CustomInput
              name="venue"
              placeholder="venue type"
              className={styles.input}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ gap: 1 }}>

                    <TypeAutocomplete
                      value={type ?? ""}
                      onChange={(val) => onTypeChange((val as VenueType) || undefined)}
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