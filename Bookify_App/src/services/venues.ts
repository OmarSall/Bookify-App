import { http } from "@/lib/http";
import { ENDPOINTS } from "@/constants/api";
import type {
  VenueDetailsDto,
  CreateVenuePayload,
  VenueCardDto,
  VenueType,
} from "./venues.types";

export type VenuesListResponse = {
  items: VenueCardDto[];
  totalCount: number;
};

export type FetchVenuesParams = {
  city?: string;
  page?: number;
  perPage?: number;
  priceMin?: number;
  priceMax?: number;
  sortBy?: "price" | "rating" | "capacity" | "createdAt" | "title";
  sortDir?: "asc" | "desc";
  features?: string[];
  type?: VenueType;
};

export async function fetchVenues(params: FetchVenuesParams = {}) {
  const {
    city,
    page = 1,
    perPage = 12,
    priceMin,
    priceMax,
    sortBy,
    sortDir,
    features,
    type,
  } = params;
  const { data } = await http.get<VenuesListResponse>(ENDPOINTS.VENUES.LIST, {
    params: { city, page, perPage, priceMin, priceMax, sortBy, sortDir, features, type },
    paramsSerializer: {
      serialize: (parameter) => {
        const usp = new URLSearchParams();
        Object.entries(parameter).forEach(([key, val]) => {
          if (val === undefined || val === null) return;
          if (Array.isArray(val)) {
            // => features=WiFi&features=parking
            val.forEach((v) => usp.append(key, String(v)));
          } else {
            usp.append(key, String(val));
          }
        });
        return usp.toString();
      },
    },
  });
  return data;
}

export async function fetchVenueById(id: number | string) {
  const { data } = await http.get<VenueDetailsDto>(ENDPOINTS.VENUES.DETAILS(id));
  return data;
}

export async function createVenue(payload: CreateVenuePayload) {
  const { data } = await http.post<VenueCardDto>(ENDPOINTS.VENUES.LIST, payload);
  return data;
}

export async function getVenueLocations(): Promise<string[]> {
  const url = (ENDPOINTS as any)?.VENUES?.LOCATIONS ?? "/venues/locations";
  const { data } = await http.get<string[]>(url);
  return data;
}
