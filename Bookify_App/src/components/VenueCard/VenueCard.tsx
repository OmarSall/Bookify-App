import styles from "./VenueCard.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import GroupIcon from "@mui/icons-material/Group";
import { useState } from "react";
import type { VenueCardProps } from "./VenueCard.types";

const VenueCard = ({
                     title,
                     location,
                     price,
                     rating,
                     capacity,
                     images,
                     onClick,
                   }: VenueCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageWrapper}>
        <img
          src={images[currentImage]}
          alt={title}
          className={styles.image}
        />
        <div className={styles.overlay}>
          <button className={styles.arrowLeft} onClick={handlePrev}>‹</button>
          <button className={styles.arrowRight} onClick={handleNext}>›</button>
          {/* Heart icon - top left */}
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

          <div className={styles.titleBanner}>{title}</div>
          <div className={styles.bottomOverlay}>
            <div className={styles.price}>
              {price.toFixed(0)} zł / doba
            </div>
            <div className={styles.location}>
              <LocationOnIcon fontSize="small" />
              {location}
            </div>
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