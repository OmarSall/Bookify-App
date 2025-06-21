import { useParams } from "react-router-dom";
import { useState } from "react";
import useVenueDetails from "../../customHooks/useVenueDetails";
import BackButton from "../../components/BackButton/BackButton";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import VenueTabs from "../../components/VenueTabs/VenueTabs";
import ContactDetails from "../../components/ContactDetails/ContactDetails";
import BookingCard from "../../components/BookingCard/BookingCard";
import styles from "./VenueDetailsPage.module.css";

const VenueDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState<"description" | "gallery" | "map">("description");

    const venueId = Number(id);
    const { venueDetails, loading, error } = useVenueDetails(venueId);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error || !venueDetails) {
        return <p>Error loading venue details.</p>;
    }

    const images = [
        `https://picsum.photos/seed/${venueDetails.albumId}a/600/400`,
        `https://picsum.photos/seed/${venueDetails.albumId}b/600/400`,
        `https://picsum.photos/seed/${venueDetails.albumId}c/600/400`,
    ];

    return (
        <div className={styles.detailsPage}>
            <BackButton />
            <ImageCarousel images={images} />

            <VenueTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                description={venueDetails.description}
                images={images}
                coordinates={{ lat: 52.2297, lng: 21.0122 }} // optional: replace with real coordinates later
                amenities={venueDetails.features}
            />

            <ContactDetails
                name={venueDetails.name}
                contact={venueDetails.contactDetails}
            />
            <BookingCard />
        </div>
    );
};

export default VenueDetailsPage;
