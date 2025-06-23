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
import {useMemo, useState} from "react";

type FilterSidebarProps = {
    availableFeatures: string[];
    priceRange: [number, number];
    onPriceChange: (value: number[]) => void;
};

const FilterSidebar = ({
                           availableFeatures,
                           priceRange,
                           onPriceChange,
                       }: FilterSidebarProps) => {
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

    const categorizedFeatures = useMemo(() => {
        const getByKeywords = (keywords: string[]) =>
            availableFeatures.filter((feature) =>
                keywords.some((kw) =>
                    feature.toLowerCase().includes(kw.toLowerCase())
                )
            );

        const amenities = getByKeywords([
            "wifi", "restaurant", "bar", "pool", "jacuzzi", "garden",
            "fitness", "fitness centre", "playground", "reception", "24h reception",
            "speakers", "outdoor music", "indoor music", "karaoke", "parking"
        ]);

        const roomAmenities = getByKeywords([
            "library", "kitchen", "kitchen facilities", "bathroom", "bathroom facilities",
            "pet", "pet friendly", "bedding", "hypoallergenic bedding", "air conditioning",
            "TV", "safe"
        ]);

        const neighbourhoods = getByKeywords([
            "lake", "forest", "mountain", "mountains", "sea", "national park", "river",
            "park", "mall", "zoo", "church", "town", "old town", "monument", "historical monument",
            "museum", "theatre", "cinema", "amusement", "amusement park", "restaurant"
        ]);

        const handicapAccessibility = getByKeywords([
            "wheelchair", "wheelchair friendly", "blind", "blind friendly",
            "deaf", "deaf friendly", "short-grown friendly"
        ]);

        const used = new Set([
            ...amenities,
            ...roomAmenities,
            ...neighbourhoods,
            ...handicapAccessibility,
        ]);

        const otherFeatures = availableFeatures.filter((f) => !used.has(f));

        return {
            amenities,
            roomAmenities,
            neighbourhoods,
            handicapAccessibility,
            otherFeatures,
        };
    }, [availableFeatures]);

    const handleReset = () => {
        setSelectedFeatures([]);
        onPriceChange([0, 1000]);
    };

    const renderCheckboxes = (features: string[]) =>
        features.map((feature, index) => (
            <FormControlLabel
                key={index}
                control={
                    <Checkbox
                        checked={selectedFeatures.includes(feature)}
                        onChange={(e) => {
                            const updated = e.target.checked
                                ? [...selectedFeatures, feature]
                                : selectedFeatures.filter((f) => f !== feature);
                            setSelectedFeatures(updated);
                        }}
                    />
                }
                label={feature}
            />
        ));

    console.log("availableFeatures:", availableFeatures);
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
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography>Price range</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Slider
                        min={0}
                        max={1000}
                        value={priceRange}
                        onChange={(_, newValue) =>
                            onPriceChange(newValue as number[])
                        }
                        valueLabelDisplay="on"
                    />
                </AccordionDetails>
            </Accordion>

            {Object.entries(categorizedFeatures).map(([key, features]) =>
                features.length > 0 ? (
                    <Accordion key={key}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography>{key.replace(/([A-Z])/g, " $1").toLowerCase()}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {renderCheckboxes(features)}
                        </AccordionDetails>
                    </Accordion>
                ) : null
            )}
        </div>
    );
};

export default FilterSidebar;