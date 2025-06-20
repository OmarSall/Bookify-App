import styles from "./VenueCard.module.css";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";

type VenueCardProps = {
    title: string;
    location: string;
    rating: number;
    capacity: number;
    imageUrl: string;
};

const VenueCard = ({ title, location, rating, capacity, imageUrl }: VenueCardProps) => {
    return (
        <Card className={styles.card}>
            <CardMedia
                component="img"
                image={imageUrl}
                alt={title}
                className={styles.image}
            />
            <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                    {location}
                </Typography>
                <Typography variant="h6" className={styles.title}>
                    {title}
                </Typography>
                <Box className={styles.info}>
                    <Box className={styles.infoItem}>
                        <StarIcon fontSize="small" />
                        <Typography variant="body2">{rating}</Typography>
                    </Box>
                    <Box className={styles.infoItem}>
                        <GroupIcon fontSize="small" />
                        <Typography variant="body2">Capacity {capacity}</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default VenueCard;