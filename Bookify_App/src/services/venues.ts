import { http } from '../lib/http';
import { ENDPOINTS } from '../constants/api';

export type VenueCardDto = {
  id: number;
  name: string;
  location: { postalCode: string | null; name: string | null };
  pricePerNightInEUR: number;
  rating: number | null;
  capacity: number;
  albumId: number | null;
  features: string[];
};

export type VenueDetailsDto = VenueCardDto & {
  venueId: number;
  numberOfReviews: number;
  description: string;
  sleepingDetails: { maxCapacity: number | null; amountOfBeds: number | null };
  checkInHour: string | null;
  checkOutHour: string | null;
  distanceFromCityCenterInKM: number | null;
  contactDetails: { phone: string | null; email: string | null };
};

export async function fetchVenues() {
  const { data } = await http.get<VenueCardDto[]>(ENDPOINTS.VENUES.LIST);
  return data;
}

export async function fetchVenueById(id: number | string) {
  const { data } = await http.get<VenueDetailsDto>(ENDPOINTS.VENUES.DETAILS(id));
  return data;
}
