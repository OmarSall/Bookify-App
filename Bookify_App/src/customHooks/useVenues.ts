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
                console.log("📡 Fetching venues with:", {page, limit});

                const res = await axios.get(`${API_BASE_URL}${ENDPOINTS.VENUES}`, {
                    params: {
                        _page: page,
                        _per_page: limit,
                        _sort: "id",
                        _order: "asc",
                    },
                    headers: {
                        Accept: "application/json",
                    },
                });

                console.log("🧾 API raw response:", res);

                const rawVenues = Array.isArray(res.data) ? res.data : res.data?.data;

                const normalizedData: Venue[] = rawVenues.map((v: any, index: number) => {
                    const convertedId = Number(v.id);
                    console.log(`✅ [${index}] id before: ${typeof v.id}, after: ${typeof convertedId}`);
                    return {
                        ...v,
                        id: convertedId,
                    };
                });

                setVenues(normalizedData);

                const total =
                    res.data?.meta?.pagination?.total ??
                    Number(res.headers["x-total-count"]) ??
                    normalizedData.length;

                setTotalCount(total);
                console.log("📊 Total count:", total);
            } catch (err) {
                console.error("❌ Failed to fetch venues", err);
                setError("Failed to fetch venues");
            } finally {
                setLoading(false);
            }
        };

        void fetchVenues();
    }, [page, limit]);

    const availableFeatures = useMemo(() => {
        if (!venues.length) return [];
        const features = venues.flatMap((venue) => venue.features || []);
        return Array.from(new Set(features));
    }, [venues]);

    return {venues, totalCount, availableFeatures, loading, error};
};

export default useVenues;