import {useEffect, useState, useMemo} from "react";
import axios from "axios";
import {API_BASE_URL, ENDPOINTS} from "../constants/api";

export interface Venue {
    id: number;
    name: string;
    rating: number;
    capacity: number;
    pricePerNightInEUR: number;
    location: {
        name: string;
        postalCode: string;
    };
    albumId: number;
    features: string[];
}

const useVenues = () => {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}${ENDPOINTS.VENUES}`);
                console.log("✅ Fetched venues:", res.data);
                console.log("🔍 First venue:", res.data[0]);
                setVenues(res.data);
            } catch (err) {
                setError("Failed to fetch venues");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const availableFeatures = useMemo(() => {
        if (!venues.length) return [];
        const features = venues.flatMap((venue) => venue.features || []);
        return Array.from(new Set(features));
    }, [venues]);

    return {venues, availableFeatures, loading, error};
};

export default useVenues;