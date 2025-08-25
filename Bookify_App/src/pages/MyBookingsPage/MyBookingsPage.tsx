import { useEffect, useState } from "react";
import { cancelBooking, myBookings, updateBooking } from "@/services/bookings";
import type { BookingListItemDto } from "@/services/bookings.types";
import styles from "./MyBookingsPage.module.css";
import { users } from "@/services";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/services/auth/AuthContext";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<BookingListItemDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingList, setLoadingList] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);


  function openConfirm() {
    if (deleting) {
      return;
    }
    setConfirmOpen(true);
  }

  function closeConfirm() {
    if (deleting) {
      return;
    }
    setConfirmOpen(false);
  }

  async function handleConfirmDelete() {
    try {
      setDeleting(true);
      setDeleteError(null);

      // Call backend (uses axios http with credentials)
      await users.deleteSelf();

      // Clear auth state
      if (typeof logout === "function") {
        await logout();
      }

      // Close dialog and redirect home
      setConfirmOpen(false);
      navigate("/", { replace: true });
    } catch (error: any) {
      setDeleteError(error?.message ?? "Failed to delete account.");
    } finally {
      setDeleting(false);
    }
  }

  async function loadBookings() {
    try {
      setLoadingList(true);
      const data = await myBookings();
      setBookings(data);
      setError(null);
    } catch (caught: any) {
      setError(caught?.response?.data?.message ?? "Failed to load");
    } finally {
      setLoadingList(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            <div className={styles.listCard}>
              <h1 className={styles.title}>My bookings</h1>

              {error && <div className={styles.errorText}>{error}</div>}
              {loadingList && <div className={styles.hint}>Loading…</div>}

              {!loadingList && bookings.length === 0 && !error && (
                <div className={styles.hint}>You have no bookings yet.</div>
              )}

              <div className={styles.listWrapper}>
                {bookings.map((booking) => (
                  <BookingRow key={booking.id} booking={booking} onChanged={loadBookings} />
                ))}
              </div>
              {/* Account deletion section */}
              <div className={styles.deleteAccountBox}>
                {deleteError && <div className={styles.errorText}>{deleteError}</div>}

                <button
                  onClick={openConfirm}
                  className={styles.dangerBtn}
                  disabled={deleting}
                  title="Delete my account permanently"
                >
                  {deleting ? "Deleting…" : "Delete my account"}
                </button>
              </div>

              {/* Confirmation dialog (MUI) */}
              <ConfirmDialog
                open={confirmOpen}
                onClose={closeConfirm}
                onConfirm={handleConfirmDelete}
                loading={deleting}
                title="Delete your account?"
                description="This will permanently remove your profile, hosted venues, cancel your bookings, and remove favourites. This action cannot be undone."
                confirmText="Yes, delete"
                cancelText="Keep my account"
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingRow({
                      booking,
                      onChanged,
                    }: {
  booking: BookingListItemDto;
  onChanged: () => void;
}) {
  const [startDate, setStartDate] = useState(
    new Date(booking.startDate).toISOString().slice(0, 10),
  );
  const [endDate, setEndDate] = useState(
    new Date(booking.endDate).toISOString().slice(0, 10),
  );
  const [submitting, setSubmitting] = useState(false);
  const [rowError, setRowError] = useState<string | null>(null);

  function toIsoAtNoon(day: string) {
    return `${day}T12:00:00.000Z`;
  }

  async function saveChanges() {
    try {
      setRowError(null);
      setSubmitting(true);
      await updateBooking(booking.id, {
        startDate: toIsoAtNoon(startDate),
        endDate: toIsoAtNoon(endDate),
      });
      onChanged();
    } catch (caught: any) {
      setRowError(caught?.response?.data?.message ?? "Failed to update booking");
    } finally {
      setSubmitting(false);
    }
  }

  async function cancelReservation() {
    try {
      setRowError(null);
      setSubmitting(true);
      await cancelBooking(booking.id);
      onChanged();
    } catch (caught: any) {
      setRowError(caught?.response?.data?.message ?? "Failed to cancel booking");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.bookingRow}>
      <div className={styles.bookingInfo}>
        <div className={styles.bookingTitle}>
          <strong>{booking.venue.title}</strong>
          {booking.venue.address?.city ? ` — ${booking.venue.address.city}` : ""}
        </div>
        <div className={styles.bookingMeta}>
          From: {startDate} &nbsp; • &nbsp; To: {endDate}
        </div>
        <div className={styles.bookingMeta}>
          Total: {Math.round(Number(booking.totalPrice))} PLN &nbsp; • &nbsp; Status: {booking.status}
        </div>
        {rowError && <div className={styles.errorText}>{rowError}</div>}
      </div>

      <div className={styles.bookingActions}>
        <input
          type="date"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
          className={styles.input}
        />
        <input
          type="date"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
          className={styles.input}
        />
        <button onClick={saveChanges} className={styles.primaryBtn} disabled={submitting}>
          {submitting ? "Saving…" : "Save"}
        </button>
        <button onClick={cancelReservation} className={styles.secondaryBtn} disabled={submitting}>
          Cancel
        </button>
      </div>
    </div>
  );
}
