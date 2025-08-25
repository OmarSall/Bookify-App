import { http } from "@/lib/http";
import { ENDPOINTS } from "@/constants/api";
import type { VenueDetailsDto, CreateVenuePayload } from './venues.types';

export type VenueCardDto = {
  id: number;
  title: string;
  features: string[];
  address?: { city?: string | null } | null;
};

type FetchVenuesParams = {
  city?: string;
};

export async function fetchVenues(params?: FetchVenuesParams) {
  const { data } = await http.get<VenueCardDto[]>(ENDPOINTS.VENUES.LIST, { params });
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
  const LOCATIONS_URL =
    (ENDPOINTS as any)?.VENUES?.LOCATIONS ?? "/venues/locations";
  const { data } = await http.get<string[]>(LOCATIONS_URL);
  return data;
}