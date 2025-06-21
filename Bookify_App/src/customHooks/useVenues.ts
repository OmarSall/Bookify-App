import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "../constants/api";

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
}

const useVenues = () => {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}${ENDPOINTS.VENUES}`);
                setVenues(res.data);
            } catch (err) {
                setError("Failed to fetch venues");
            } finally {
                setLoading(false);
            }
        })();
    }, []);


    return { venues, loading, error };
};

export default useVenues;
