import { useEffect, useMemo, useState } from "react";
import { fetchVenues } from "@/services/venues";
import { getMyFavouriteIds } from "@/services/favourites";
import { useAuth } from "@/services/auth/AuthContext";
import type { VenueCardDto } from "@/services/venues.types";

type Filters = {
  city?: string;
  priceMin?: number;
  priceMax?: number;
  sortBy?: "price" | "rating" | "capacity" | "createdAt" | "title";
  sortDir?: "asc" | "desc";
  features?: string[];
};

function normalizeFeatures(rawFeaturesInput: any): string[] {
  if (Array.isArray(rawFeaturesInput) && rawFeaturesInput.every((entry) => typeof entry === "string")) {
    return rawFeaturesInput as string[];
  }
  if (Array.isArray(rawFeaturesInput) && rawFeaturesInput.length && typeof rawFeaturesInput[0] === "object") {
    return rawFeaturesInput.map((featureObj: any) => featureObj?.name).filter(Boolean);
  }
  if (Array.isArray(rawFeaturesInput?.venueFeatures)) {
    return rawFeaturesInput.venueFeatures.map((venueFeature: any) => venueFeature?.feature?.name).filter(Boolean);
  }

  return [];
}

export default function useVenues(
  page: number,
  perPage: number,
  filters: Filters = {},
) {
  const { user } = useAuth();
  const [venueItems, setVenueItems] = useState<VenueCardDto[]>([]);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setIsLoading(true);

        const [listResp, favouriteIds] = await Promise.all([
          fetchVenues({
            city: filters.city,
            page,
            perPage,
            priceMin: filters.priceMin,
            priceMax: filters.priceMax,
            sortBy: filters.sortBy,
            sortDir: filters.sortDir,
            features: filters.features,
          }),
          user ? getMyFavouriteIds().catch(() => []) : Promise.resolve<number[]>([]),
        ]);

        if (!isMounted) {
          return;
        }
        const favouriteIdSet = new Set<number>(favouriteIds ?? []);
        const normalizedItems = (listResp.items ?? []).map((venue: any) => ({
          ...venue,
          features: normalizeFeatures(
            (venue as any).features ?? (venue as any).venueFeatures ?? [],
          ),
          isFavourite: favouriteIdSet.has(venue.id),
        }));

        setVenueItems(normalizedItems as VenueCardDto[]);
        setTotalItemsCount(Number(listResp.totalCount ?? normalizedItems.length));
        setLoadError(null);
      } catch (errorCaught: any) {
        if (!isMounted) {
          return;
        }
        console.error("useVenues error:", errorCaught?.response ?? errorCaught);
        setLoadError(errorCaught?.response?.data?.message ?? "Failed to load venues");
        setVenueItems([]);
        setTotalItemsCount(0);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [page, perPage, filters?.city, filters.priceMin, filters.priceMax, filters.sortBy, filters.sortDir, user?.id, filters.features]);

  const availableFeatures = useMemo(() => {
    const uniqueFeaturesSet = new Set<string>();

    for (const venue of venueItems) {
      const featuresArray = Array.isArray(venue.features) ? venue.features : [];
      for (const featureName of featuresArray) {
        uniqueFeaturesSet.add(featureName);
      }
    }

    return Array.from(uniqueFeaturesSet).sort(
      (firstFeature, secondFeature) => firstFeature.localeCompare(secondFeature),
    );
  }, [venueItems]);

  const venues = venueItems;

  return {
    venues,
    totalCount: totalItemsCount,
    availableFeatures,
    loading: isLoading,
    error: loadError,
  };
}
