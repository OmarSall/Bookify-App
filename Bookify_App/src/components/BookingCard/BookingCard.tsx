import styles from "./BookingCard.module.css";
import { Button, Typography } from "@mui/material";

const BookingCard = () => {
    return (
        <div className={styles.card}>
            <Typography variant="h6" className={styles.price}>
                $120 / night
            </Typography>

            <div className={styles.details}>
                <Typography variant="body2">Available: June - August</Typography>
                <Typography variant="body2">Capacity: up to 4 guests</Typography>
            </div>

            <Button variant="contained" className={styles.bookButton}>
                Book now
            </Button>
        </div>
    );
};

export default BookingCard;
