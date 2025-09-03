import { useCallback, useEffect, useState } from "react";
import { http } from "@/lib/http";

type PriceDomain = {min: number, max: number};

type MetaResponse = {
  priceRange?: { minPrice?: number; maxPrice?: number };
};

export default function usePriceDomain() {
  const [priceDomain, setPriceDomain] = useState<PriceDomain | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await http.get<MetaResponse>("/venues/meta", { signal });
      const min = Number(data?.priceRange?.minPrice ?? 0);
      const max = Number(data?.priceRange?.maxPrice ?? 0);
      setPriceDomain({ min, max });
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load price domain";
      setError(msg);
      setPriceDomain(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load]);

  return {
    priceDomain,
    loading,
    error,
    refresh: load,
  };
}