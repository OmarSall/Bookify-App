import styles from "./FilterSidebar.module.css";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormControlLabel,
    Checkbox,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FilterSidebar = () => {
    const filters = [
        "Pet friendly",
        "WiFi",
        "TV",
        "Hypoallergenic bedding",
        "Kitchen facilities",
        "Fireplace",
        "Parking",
        "Bathroom facilities",
    ];

    return (
        <div className={styles.sidebar}>
            <Typography variant="h6" className={styles.title}>
                Filters
            </Typography>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Venue features</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {filters.map((feature, index) => (
                        <FormControlLabel
                            key={index}
                            control={<Checkbox />}
                            label={feature}
                            disabled
                        />
                    ))}
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default FilterSidebar;