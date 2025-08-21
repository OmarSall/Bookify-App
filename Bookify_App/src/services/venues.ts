import { http } from '../lib/http';
import { ENDPOINTS } from '../constants/api';
import type { VenueCardDto, VenueDetailsDto, CreateVenuePayload } from './venues.types';

export async function fetchVenues() {
  const { data } = await http.get<VenueCardDto[]>(ENDPOINTS.VENUES.LIST);
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