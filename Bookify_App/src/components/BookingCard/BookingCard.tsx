import styles from "./BookingCard.module.css";
import {Typography, Button, TextField, Checkbox, FormControlLabel} from "@mui/material";
import {useState} from "react";

type BookingCardProps = {
    pricePerNight: number;
};

const BookingCard = ({pricePerNight}: BookingCardProps) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [justOneDay, setJustOneDay] = useState(false);

    const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    };

    const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJustOneDay(e.target.checked);
        if (e.target.checked) {
            setEndDate("");
        }
    };

    const calculateTotal = () => {
        if (!startDate) {
            return 0;
        }
        if (justOneDay) {
            return pricePerNight;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        return days > 0 ? days * pricePerNight : 0;
    };

    return (
        <div className={styles.bookingCard}>
            <Typography variant="h6" className={styles.title}>
                Book this venue
            </Typography>

            <div className={styles.dateInputs}>
                <TextField
                    label="starts at"
                    type="date"
                    value={startDate}
                    onChange={handleStartChange}
                    InputLabelProps={{shrink: true}}
                    fullWidth
                />
                {!justOneDay && (
                    <TextField
                        label="ends at"
                        type="date"
                        value={endDate}
                        onChange={handleEndChange}
                        InputLabelProps={{shrink: true}}
                        fullWidth
                    />
                )}
                <FormControlLabel
                    control={<Checkbox checked={justOneDay} onChange={handleCheckboxChange}/>}
                    label="just one day"
                />
            </div>

            <div className={styles.priceInfo}>
                <Typography variant="body2">per day</Typography>
                <Typography variant="body1">{pricePerNight} zł</Typography>

                <Typography variant="body2" sx={{marginTop: "1rem"}}>
                    total
                </Typography>
                <Typography variant="h6">{calculateTotal()} zł</Typography>
            </div>

            <Button variant="contained" className={styles.bookButton}>
                Book
            </Button>
        </div>
    );
};

export default BookingCard;