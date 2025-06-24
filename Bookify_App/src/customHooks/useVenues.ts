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

const useVenues = (page: number, limit: number) => {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVenues = async () => {
            setLoading(true);
            try {
                const res = await axios.get<Venue[]>(`${API_BASE_URL}${ENDPOINTS.VENUES}`, {
                    params: {
                        _page: page,
                        _limit: limit,
                        _sort: "id",
                        _order: "asc",
                    },
                    headers: {
                        Accept: "application/json",
                    },
                });

                setVenues(res.data.map(v => ({
                    ...v,
                    id: Number(v.id),
                })));
                const total = res.headers["x-total-count"];
                setTotalCount(Number(total));
                console.log("Fetched venue:", res.data[0]);
                console.log("Typeof id:", typeof res.data[0].id);
            } catch (err) {
                setError("Failed to fetch venues");
            } finally {
                setLoading(false);
            }
        };

        void fetchVenues();
    }, [page, limit]);

    const availableFeatures = useMemo(() => {
        if (!venues.length) {
            return [];
        }
        const features = venues.flatMap((venue) => venue.features || []);
        return Array.from(new Set(features));
    }, [venues]);

    return {venues, totalCount, availableFeatures, loading, error};
};

export default useVenues;