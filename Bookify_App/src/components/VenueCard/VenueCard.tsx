import styles from "./VenueCard.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import GroupIcon from "@mui/icons-material/Group";
import { useState } from "react";

type VenueCardProps = {
    title: string;
    location: string;
    price: number;
    rating: number;
    capacity: number;
    imageUrl: string;
    onClick?: () => void;
};

const VenueCard = ({
                       title,
                       location,
                       price,
                       rating,
                       capacity,
                       imageUrl,
                       onClick,
                   }: VenueCardProps) => {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.imageWrapper}>
                <img src={imageUrl} alt={title} className={styles.image} />

                <div
                    className={styles.favoriteIcon}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsFavorite((prev) => !prev);
                    }}
                >
                    {isFavorite ? (
                        <FavoriteIcon className={styles.filled} />
                    ) : (
                        <FavoriteBorderIcon />
                    )}
                </div>

                <div className={styles.nameBanner}>{title}</div>

                <div className={styles.bottomOverlay}>
                    {price !== undefined && (
                        <div className={styles.price}>{price.toFixed(0)} PLN / night</div>
                    )}
                    <div className={styles.location}>
                        <LocationOnIcon fontSize="small" />
                        {location}
                    </div>
                </div>
            </div>

            <div className={styles.detailsBar}>
                <div className={styles.detail}>
                    <StarIcon fontSize="small" />
                    rating {rating}
                </div>
                <div className={styles.detail}>
                    <GroupIcon fontSize="small" />
                    capacity {capacity}
                </div>
            </div>
        </div>
    );
};

export default VenueCard;
