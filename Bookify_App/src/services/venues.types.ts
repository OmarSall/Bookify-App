import type { VenueType } from "@/constants/venueTypes"

export type { VenueType } from "@/constants/venueTypes";

export type AvailabilityStatus = "available" | "booked" | "booked_by_me" | "unknown";

export type VenueCardDto = {
  id: number;
  name: string;
  location: { postalCode: string | null; name: string | null };
  pricePerNight: number;
  rating: number | null;
  capacity: number;
  albumId: number | null;
  features: string[];
  isFavourite: boolean;
  availabilityStatus?: AvailabilityStatus;
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

export type CreateVenuePayload = {
  title: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  street: string;
  city: string;
  country: string;
  postalCode?: string;
  albumId?: number;
  rating?: number;
  features: string[];
  startDate?: string;
  endDate?: string;
};