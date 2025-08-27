import styles from "./FilterSidebar.module.css";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControlLabel,
  Checkbox,
  Slider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useMemo, useState } from "react";
import {
  AMENITIES_KEYWORDS,
  ROOM_AMENITIES_KEYWORDS,
  NEIGHBOURHOODS_KEYWORDS,
  HANDICAP_ACCESSIBILITY_KEYWORDS,
} from "@/constants/featureKeywords";

type FilterSidebarProps = {
  availableFeatures: string[];
  priceRange: [number, number];
  onPriceChange: (value: [number, number]) => void;
  selectedFeatures: string[];
  onSelectedFeaturesChange: (value: string[]) => void;
};

const FilterSidebar = ({
                         availableFeatures,
                         priceRange,
                         onPriceChange,
                         selectedFeatures,
                         onSelectedFeaturesChange,
                       }: FilterSidebarProps) => {

  const [localRange, setLocalRange] = useState<[number, number]>(priceRange);

  useEffect(() => {
    setLocalRange(priceRange);
  }, [priceRange]);

  const categorizedFeatures = useMemo(() => {
    const getByKeywords = (keywords: string[]) =>
      availableFeatures.filter((feature) =>
        keywords.some((keyword) =>
          feature.toLowerCase().includes(keyword.toLowerCase()),
        ),
      );

    const amenities = getByKeywords(AMENITIES_KEYWORDS);
    const roomAmenities = getByKeywords(ROOM_AMENITIES_KEYWORDS);
    const neighbourhoods = getByKeywords(NEIGHBOURHOODS_KEYWORDS);
    const handicapAccessibility = getByKeywords(HANDICAP_ACCESSIBILITY_KEYWORDS);

    const used = new Set([
      ...amenities,
      ...roomAmenities,
      ...neighbourhoods,
      ...handicapAccessibility,
    ]);

    const otherFeatures = availableFeatures.filter((feature) => !used.has(feature));

    return {
      amenities,
      roomAmenities,
      neighbourhoods,
      handicapAccessibility,
      otherFeatures,
    };
  }, [availableFeatures]);

  const handleReset = () => {
    onSelectedFeaturesChange([]);
    onPriceChange([0, 1000]);
  };

  const renderCheckboxes = (features: string[]) =>
    features.map((feature, index) => (
      <FormControlLabel
        key={index}
        control={
          <Checkbox
            checked={selectedFeatures.includes(feature)}
            onChange={(event) => {
              const next = event.target.checked
                ? [...selectedFeatures, feature]
                : selectedFeatures.filter((selectedFeature) => selectedFeature !== feature);
              onSelectedFeaturesChange(next);
            }}
          />
        }
        label={feature}
      />
    ));

  if (!availableFeatures.length) {
    return (
      <div className={styles.sidebar}>
        <Typography variant="h6">Filters</Typography>
        <Typography>Loading features...</Typography>
      </div>
    );
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <Typography variant="h6" className={styles.title}>
          FILTERS
        </Typography>
        <button className={styles.resetButton} onClick={handleReset}>
          reset
        </button>
      </div>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Price range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            min={0}
            max={1000}
            value={localRange}
            onChange={(_, newValue) => setLocalRange(newValue as [number, number]) }
            onChangeCommitted={(_, newValue) =>
              onPriceChange(newValue as [number, number]) }
            valueLabelDisplay="on"
            disableSwap
          />
        </AccordionDetails>
      </Accordion>

      {Object.entries(categorizedFeatures).map(([key, features]) =>
        features.length > 0 ? (
          <Accordion key={key}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{key.replace(/([A-Z])/g, " $1").toLowerCase()}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {renderCheckboxes(features)}
            </AccordionDetails>
          </Accordion>
        ) : null,
      )}
    </div>
  );
};

export default FilterSidebar;