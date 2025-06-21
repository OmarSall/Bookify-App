import styles from "./VenueDescriptionTab.module.css";
import CheckIcon from "@mui/icons-material/CheckCircleOutline";

interface VenueDescriptionTabProps {
    description: string;
    amenities: string[];
}

const VenueDescriptionTab = ({ description, amenities }: VenueDescriptionTabProps) => {
    return (
        <div className={styles.description}>
            <p className={styles.text}>{description}</p>

            <div className={styles.amenities}>
                <h3 className={styles.subheading}>Amenities</h3>
                <ul className={styles.amenityList}>
                    {amenities.map((item, index) => (
                        <li key={index} className={styles.amenityItem}>
                            <CheckIcon className={styles.icon} />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default VenueDescriptionTab;
