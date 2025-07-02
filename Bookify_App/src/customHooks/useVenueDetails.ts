import {useEffect, useState} from "react";
import axiosInstance from "../services/axiosInstance";
import {ENDPOINTS} from "../constants/api";

export interface VenueDetails {
    id: number;
    venueId: number;
    description: string;
    albumId: number;
    features: string[];
    sleepingDetails: {
        maxCapacity: number;
        amountOfBeds: number;
    };
    contactDetails: {
        email: string;
        phone: string;
    };
    checkInHour: string;
    checkOutHour: string;
    distanceFromCityCenterInKM: number;
    name: string;
    pricePerNightInEUR: number;
    rating: number;
    location: {
        name: string;
        postalCode: string;
    };
}

const useVenueDetails = (venueId: number) => {
    const [venueDetails, setVenueDetails] = useState<VenueDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await axiosInstance.get(`${ENDPOINTS.VENUE_DETAILS}?venueId=${venueId}`);
                setVenueDetails(res.data[0]);
            } catch (err) {
                setError("Failed to fetch venue details");
            } finally {
                setLoading(false);
            }
        })();
    }, [venueId]);

    return {venueDetails, loading, error};
};

export default useVenueDetails;