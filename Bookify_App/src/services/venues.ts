import { http } from "@/lib/http";
import { ENDPOINTS } from "@/constants/api";
import type {
  VenueDetailsDto,
  CreateVenuePayload,
  VenueCardDto,
} from "./venues.types";

export type VenuesListResponse = {
  items: VenueCardDto[];
  totalCount: number;
};

export type FetchVenuesParams = {
  city?: string;
  page?: number;
  perPage?: number;
};

export async function fetchVenues(params: FetchVenuesParams = {}) {
  const { city, page = 1, perPage = 12 } = params;
  const { data } = await http.get<VenuesListResponse>(ENDPOINTS.VENUES.LIST, {
    params: { city, page, perPage },
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
