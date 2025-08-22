import styles from "./VenueCard.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import GroupIcon from "@mui/icons-material/Group";
import { useCallback, useState } from "react";
import type { VenueCardProps } from "@/components";
import { useAuth } from "@/services/auth/AuthContext";
import { addFavourite, removeFavourite } from "@/services/favourites";

const VenueCard: React.FC<VenueCardProps> = ({
                                               id,
                                               title,
                                               location,
                                               price,
                                               rating,
                                               capacity,
                                               images,
                                               isInitiallyFavourite = false,
                                               onClick,
                                               onFavouriteToggled,
                                             }) => {
  const { user } = useAuth();
  const [isFavourite, setIsFavourite] = useState<boolean>(isInitiallyFavourite);
  const [currentImage, setCurrentImage] = useState(0);
  const [heartBusy, setHeartBusy] = useState(false);
  const [heartError, setHeartError] = useState<string | null>(null);

  const handlePrev = (event: React.MouseEvent) => {
    event.stopPropagation();
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (event: React.MouseEvent) => {
    event.stopPropagation();
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const toggleFavourite = useCallback(
    async (event: React.MouseEvent) => {
      event.stopPropagation();
      setHeartError(null);

      if (!user) {
        setHeartError("Please log in to use favourites.");
        return;
      }
      if (heartBusy) return;

      const next = !isFavourite;

      setIsFavourite(next);
      setHeartBusy(true);

      try {
        if (next) {
          await addFavourite(id);
        } else {
          await removeFavourite(id);
        }
        onFavouriteToggled?.(next);
      } catch (caught: any) {
        setIsFavourite(!next);
        setHeartError(
          caught?.response?.data?.message ?? "Failed to update favourites",
        );
      } finally {
        setHeartBusy(false);
      }
    },
    [user, heartBusy, isFavourite, id, onFavouriteToggled],
  );

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageWrapper}>
        <img
          src={images[currentImage]}
          alt={title}
          className={styles.image}
          loading="lazy"
        />

        <div className={styles.overlay}>
          <button
            type="button"
            className={styles.arrowLeft}
            onClick={handlePrev}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            className={styles.arrowRight}
            onClick={handleNext}
            aria-label="Next image"
          >
            ›
          </button>

          <button
            type="button"
            className={styles.favoriteIcon}
            onClick={toggleFavourite}
            aria-pressed={isFavourite}
            aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
            disabled={heartBusy}
          >
            {isFavourite ? (
              <FavoriteIcon className={styles.filled} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </button>

          <div className={styles.titleBanner}>{title}</div>
          <div className={styles.bottomOverlay}>
            <div className={styles.price}>{Math.round(price)} zł / doba</div>
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
          rating {Number.isFinite(rating) ? rating : 0}
        </div>
        <div className={styles.detail}>
          <GroupIcon fontSize="small" />
          capacity {capacity}
        </div>
      </div>

      {heartError && <div className={styles.heartError}>{heartError}</div>}
    </div>
  );
};

export default VenueCard;