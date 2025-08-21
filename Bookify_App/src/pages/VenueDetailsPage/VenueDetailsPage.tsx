import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import useVenueDetails from "../../customHooks/useVenueDetails";
import useCurrencyRate from "../../customHooks/useCurrencyRate";
import BackButton from "../../components/BackButton/BackButton";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import VenueTabs from "../../components/VenueTabs/VenueTabs";
import ContactDetails from "../../components/ContactDetails/ContactDetails";
import BookingCard from "../../components/BookingCard/BookingCard";
import styles from "./VenueDetailsPage.module.css";
import { Facebook, Instagram, Twitter, Email } from "@mui/icons-material";
import { Typography } from "@mui/material";

import { createBooking } from "@/services/bookings";
import { useAuth } from "@/services/auth/AuthContext";

function BookingBox({
                        venueId,
                        pricePerNightEUR,
                    }: {
    venueId: number;
    pricePerNightEUR: number;
}) {
    const { user } = useAuth();
    const [startDate, setStartDate] = useState(""); // YYYY-MM-DD
    const [endDate, setEndDate] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        setMessage(null);
        if (!user) {
            setMessage("Please log in to make a booking.");
            return;
        }
        setSubmitting(true);
        try {
            const startIso = `${startDate}T12:00:00.000Z`;
            const endIso = `${endDate}T12:00:00.000Z`;
            await createBooking({ venueId, startDate: startIso, endDate: endIso });
            setMessage("✅ Booked!");
        } catch (caught: any) {
            setMessage(caught?.response?.data?.message ?? "Booking failed");
        } finally {
            setSubmitting(false);
        }
    }

    return (
      <form onSubmit={onSubmit} className="border rounded p-3 space-y-2">
          <div>Price per night: €{pricePerNightEUR}</div>

          {!user && (
            <div className="text-sm">
                You are not logged in.{" "}
                <Link to="/login" className={styles.link}>
                    Log in
                </Link>{" "}
                to book this venue.
            </div>
          )}

          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            className="border p-2 w-full rounded"
            required
          />

          <button
            className="bg-black text-white px-4 py-2 rounded w-full"
            disabled={submitting || !startDate || !endDate}
          >
              {submitting ? "Booking…" : "Book"}
          </button>
          {message && <div>{message}</div>}
      </form>
    );
}

const VenueDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState<"description" | "gallery" | "map">(
      "description",
    );

    const venueId = Number(id);
    const { venueDetails, loading, error } = useVenueDetails(venueId);
    const { rate: eurToPlnRate, loading: rateLoading } = useCurrencyRate();

    if (loading || rateLoading) {
        return <p>Loading...</p>;
    }
    if (error || !venueDetails) {
        return <p>Error loading venue details.</p>;
    }

    const images = [
        `https://picsum.photos/seed/${venueDetails.albumId}a/800/400`,
        `https://picsum.photos/seed/${venueDetails.albumId}b/800/400`,
        `https://picsum.photos/seed/${venueDetails.albumId}c/800/400`,
    ];

    const priceInPln = +(
      venueDetails.pricePerNightInEUR * (eurToPlnRate || 1)
    ).toFixed(0);

    return (
      <div className={styles.detailsPage}>
          <BackButton />
          <div className={styles.layout}>
              <div className={styles.leftColumn}>
                  <ImageCarousel images={images} />

                  <VenueTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    description={venueDetails.description}
                    images={images}
                    coordinates={{ lat: 52.2297, lng: 21.0122 }}
                    amenities={venueDetails.features}
                  />
              </div>

              <div className={styles.rightColumn}>
                  {/* Old price Box in PLN */}
                  <BookingCard pricePerNight={priceInPln} />

                  {/* New reservation box – actual POST for BE */}
                  <div style={{ marginTop: 16 }}>
                      <BookingBox
                        venueId={venueId}
                        pricePerNightEUR={venueDetails.pricePerNightInEUR}
                      />
                  </div>

                  <ContactDetails contact={venueDetails.contactDetails} />
                  <div className={styles.social}>
                      <Typography variant="subtitle1" className={styles.socialTitle}>
                          Check out on social media
                      </Typography>
                      <div className={styles.icons}>
                          <Facebook className={styles.icon} />
                          <Instagram className={styles.icon} />
                          <Twitter className={styles.icon} />
                          <Email className={styles.icon} />
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
};

export default VenueDetailsPage;
