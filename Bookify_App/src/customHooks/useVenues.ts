import { useEffect, useMemo, useState } from "react";
import { fetchVenues } from "@/services/venues";

type Filters = {
  city?: string;
};

function normalizeFeatures(raw: any): string[] {
  // case 1: already string[]
  if (Array.isArray(raw) && raw.every((x) => typeof x === "string")) {
    return raw as string[];
  }

  // case 2: [{ name: "pool" }, { name: "garden" }]
  if (Array.isArray(raw) && raw.length && typeof raw[0] === "object") {
    return raw.map((f: any) => f?.name).filter(Boolean);
  }

  // case 3: join table style: { venueFeatures: [{ feature: { name }}, ...] }
  if (Array.isArray(raw?.venueFeatures)) {
    return raw.venueFeatures.map((vf: any) => vf?.feature?.name).filter(Boolean);
  }

  // last resort: empty
  return [];
}

function norm(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").trim();
}

export default function useVenues(
  page: number,
  perPage: number,
  filters: Filters = {},
) {
  const [all, setAll] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchVenues();
        if (!alive) {
          return;
        }
        const normalized = Array.isArray(data)
          ? data.map((venue: any) => ({
            ...venue,
            features: normalizeFeatures(
              (venue as any).features ?? (venue as any).venueFeatures ?? venue,
            ),
          }))
          : [];

        setAll(normalized);
        setError(null);
      } catch (e: any) {
        if (!alive) {
          return;
        }
        console.error("useVenues error:", e?.response ?? e);
        setError(e?.response?.data?.message ?? "Failed to load venues");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [filters?.city]);

  const cityNorm = norm(filters?.city ?? "");

  const filteredAll = useMemo(() => {
    if (!cityNorm) return all;
    return all.filter((v: any) => {
      const c = v?.address?.city ?? v?.location?.name ?? "";
      return norm(String(c)).includes(cityNorm);
    });
  }, [all, cityNorm]);

  const totalCount = filteredAll.length;

  const availableFeatures = useMemo(() => {
    const s = new Set<string>();
    for (const v of filteredAll) {
      const feats = Array.isArray(v.features) ? v.features : [];
      for (const f of feats) s.add(f);
    }
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [filteredAll]);

  const venues = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredAll.slice(start, start + perPage);
  }, [filteredAll, page, perPage]);

  return { venues, totalCount, availableFeatures, loading, error };
}
