import { useEffect, useMemo, useState } from 'react';
import { fetchVenues, type VenueCardDto } from '../services/venues';

export default function useVenues(page: number, perPage: number) {
  const [all, setAll] = useState<VenueCardDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchVenues();
        if (!alive) return;
        setAll(data);
        setError(null);
      } catch (e: any) {
        if (!alive) return;
        console.error('useVenues error:', e?.response ?? e);
        setError(e?.response?.data?.message ?? 'Failed to load venues');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const totalCount = all.length;

  const availableFeatures = useMemo(() => {
    const s = new Set<string>();
    for (const v of all) for (const f of v.features) s.add(f);
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [all]);

  const venues = useMemo(() => {
    const start = (page - 1) * perPage;
    return all.slice(start, start + perPage);
  }, [all, page, perPage]);

  return { venues, totalCount, availableFeatures, loading, error };
}
