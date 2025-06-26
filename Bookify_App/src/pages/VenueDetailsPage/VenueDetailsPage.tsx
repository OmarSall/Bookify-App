import {useParams} from "react-router-dom";
import {useState} from "react";
import useVenueDetails from "../../customHooks/useVenueDetails";
import useCurrencyRate from "../../customHooks/useCurrencyRate";
import BackButton from "../../components/BackButton/BackButton";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import VenueTabs from "../../components/VenueTabs/VenueTabs";
import ContactDetails from "../../components/ContactDetails/ContactDetails";
import BookingCard from "../../components/BookingCard/BookingCard";
import styles from "./VenueDetailsPage.module.css";
import {Facebook, Instagram, Twitter, Email} from "@mui/icons-material";
import {Typography} from "@mui/material";

const VenueDetailsPage = () => {
    const {id} = useParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState<"description" | "gallery" | "map">("description");

    const venueId = Number(id);
    const {venueDetails, loading, error} = useVenueDetails(venueId);
    const {rate: eurToPlnRate, loading: rateLoading} = useCurrencyRate();

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

    const priceInPln = +(venueDetails.pricePerNightInEUR * (eurToPlnRate || 1)).toFixed(0);

    return (
        <div className={styles.detailsPage}>
            <BackButton/>
            <div className={styles.layout}>
                <div className={styles.leftColumn}>
                    <ImageCarousel images={images}/>

                    <VenueTabs
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        description={venueDetails.description}
                        images={images}
                        coordinates={{lat: 52.2297, lng: 21.0122}}
                        amenities={venueDetails.features}
                    />
                </div>

                <div className={styles.rightColumn}>
                    <BookingCard pricePerNight={priceInPln}/>
                    <ContactDetails contact={venueDetails.contactDetails}/>
                    <div className={styles.social}>
                        <Typography variant="subtitle1" className={styles.socialTitle}>
                            Check out on social media
                        </Typography>
                        <div className={styles.icons}>
                            <Facebook className={styles.icon}/>
                            <Instagram className={styles.icon}/>
                            <Twitter className={styles.icon}/>
                            <Email className={styles.icon}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VenueDetailsPage;