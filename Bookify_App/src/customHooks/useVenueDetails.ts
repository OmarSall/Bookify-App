import { useEffect, useState } from 'react';
import { fetchVenueById, type VenueDetailsDto } from '../services/venues';

export default function useVenueDetails(id: number) {
    const [venueDetails, setVenueDetails] = useState<VenueDetailsDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        let alive = true;
        (async () => {
            try {
                setLoading(true);
                const data = await fetchVenueById(id);
                if (!alive) return;
                setVenueDetails(data);
                setError(null);
            } catch (e: any) {
                if (!alive) return;
                setError(e?.response?.data?.message ?? 'Failed to load venue');
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, [id]);

    return { venueDetails, loading, error };
}
