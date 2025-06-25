import { useEffect, useState, useMemo } from "react";
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
    features: string[];
}

const useVenues = (page: number, limit: number) => {
    const [allVenues, setAllVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVenues = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${API_BASE_URL}${ENDPOINTS.VENUES}`);
                const rawVenues = res.data;

                const normalizedData: Venue[] = rawVenues.map((v: any) => ({
                    ...v,
                    id: Number(v.id),
                }));

                setAllVenues(normalizedData);
            } catch (err) {
                console.error("❌ Failed to fetch venues", err);
                setError("Failed to fetch venues");
            } finally {
                setLoading(false);
            }
        };

        void fetchVenues();
    }, []);

    const paginatedVenues = useMemo(() => {
        const start = (page - 1) * limit;
        return allVenues.slice(start, start + limit);
    }, [allVenues, page, limit]);

    const availableFeatures = useMemo(() => {
        return Array.from(new Set(allVenues.flatMap(v => v.features || [])));
    }, [allVenues]);

    return {
        venues: paginatedVenues,
        totalCount: allVenues.length,
        availableFeatures,
        loading,
        error,
    };
};

export default useVenues;
