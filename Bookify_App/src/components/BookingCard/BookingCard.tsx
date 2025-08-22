import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./BookingCard.module.css";
import { useAuth } from "@/services/auth/AuthContext";
import { createBooking } from "@/services/bookings";

type BookingCardProps = {
  pricePerNight: number;
  venueId?: number;
  onBooked?: () => void;
};

export default function BookingCard({ pricePerNight, venueId, onBooked }: BookingCardProps) {
  const { user } = useAuth();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!venueId) {
      return;
    }
    setMessage(null);

    if (!user) {
      setMessage("Please log in to make a booking.");
      return;
    }

    try {
      setSubmitting(true);
      const startIso = `${startDate}T12:00:00.000Z`;
      const endIso = `${endDate}T12:00:00.000Z`;
      await createBooking({ venueId, startDate: startIso, endDate: endIso });
      setMessage("✅ Booked!");
      onBooked?.();
    } catch (caught: any) {
      setMessage(caught?.response?.data?.message ?? "Booking failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (!venueId) {
    return (
      <div className={styles.card}>
        <div className={styles.priceRow}>
          <span className={styles.price}>{pricePerNight.toFixed(0)} zł</span>
          <span className={styles.per}>/ doba</span>
        </div>
      </div>
    );
  }

  // Z venueId — cena + formularz
  return (
    <div className={styles.card}>
      <div className={styles.priceRow}>
        <span className={styles.price}>{pricePerNight.toFixed(0)} zł</span>
        <span className={styles.per}>/ doba</span>
      </div>

      <form onSubmit={onSubmit} className={styles.form} noValidate>
        {!user && (
          <div className={styles.hint}>
            You are not logged in.{" "}
            <Link to="/login" className={styles.link}>Log in</Link> to book this venue.
          </div>
        )}

        <label className={styles.label} htmlFor="start">Start date</label>
        <input
          id="start"
          type="date"
          className={styles.input}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <label className={styles.label} htmlFor="end">End date</label>
        <input
          id="end"
          type="date"
          className={styles.input}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={submitting || !startDate || !endDate}
        >
          {submitting ? "Booking…" : "Book"}
        </button>

        {message && <div className={styles.message}>{message}</div>}
      </form>
    </div>
  );
}
