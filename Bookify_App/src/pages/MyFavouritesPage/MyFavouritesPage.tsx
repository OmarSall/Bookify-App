import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { myFavourites, removeFavourite } from "../../services/favourites";
import type { FavouriteListItemDto } from "../../services/favourites.types";
import styles from "./MyFavouritesPage.module.css";

export default function MyFavouritesPage() {
  const [rows, setRows] = useState<FavouriteListItemDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingList, setLoadingList] = useState(false);

  async function loadFavourites(): Promise<void> {
    try {
      setLoadingList(true);
      const data = await myFavourites();
      setRows(data);
      setError(null);
    } catch (caught: any) {
      setError(caught?.response?.data?.message ?? "Failed to load favourites");
    } finally {
      setLoadingList(false);
    }
  }

  useEffect(() => {
    void loadFavourites();
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            <div className={styles.listCard}>
              <h1 className={styles.title}>My favourites</h1>

              {error && <div className={styles.errorText}>{error}</div>}
              {loadingList && <div className={styles.hint}>Loading…</div>}
              {!loadingList && rows.length === 0 && !error && (
                <div className={styles.hint}>You have no favourites yet.</div>
              )}

              <div className={styles.listWrapper}>
                {rows.map((item) => (
                  <FavouriteRow
                    key={item.venueId}
                    favourite={item}
                    onChanged={loadFavourites}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FavouriteRow({
                        favourite,
                        onChanged,
                      }: {
  favourite: FavouriteListItemDto;
  onChanged: () => Promise<void>;
}) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [rowError, setRowError] = useState<string | null>(null);

  async function handleOpen() {
    navigate(`/venue/${favourite.venue.id}`);
  }

  async function handleRemove() {
    try {
      setRowError(null);
      setSubmitting(true);
      await removeFavourite(favourite.venueId);
      await onChanged();
    } catch (caught: any) {
      setRowError(caught?.response?.data?.message ?? "Failed to remove favourite");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.favouriteRow}>
      <div className={styles.favouriteInfo}>
        <div className={styles.favouriteTitle}>
          <strong>{favourite.venue.title}</strong>
          {favourite.venue.address?.city ? ` — ${favourite.venue.address.city}` : ""}
        </div>
        <div className={styles.favouriteMeta}>
          €{Number(favourite.venue.pricePerNight).toFixed(2)}
          &nbsp; · &nbsp; ⭐ {favourite.venue.rating ?? "—"}
          &nbsp; · &nbsp; 👥 {favourite.venue.capacity}
        </div>
        {rowError && <div className={styles.errorText}>{rowError}</div>}
      </div>

      <div className={styles.favouriteActions}>
        <button
          className={styles.primaryBtn}
          onClick={handleOpen}
          disabled={submitting}
        >
          Open
        </button>
        <button
          className={styles.secondaryBtn}
          onClick={handleRemove}
          disabled={submitting}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
