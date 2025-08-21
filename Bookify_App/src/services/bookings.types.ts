export type BookingStatus = "CONFIRMED" | "CANCELLED";

export type BookingListItemDto = {
  id: number;
  venueId: number;
  startDate: string;
  endDate: string;
  totalPrice: number | string;
  status: BookingStatus;
  createdAt?: string;

  venue: {
    id: number;
    title: string;
    pricePerNight: number | string;
    capacity: number;
    rating?: number | null;
    address?: {
      city?: string | null;
    } | null;
  };
};

export type CreateBookingPayload = {
  venueId: number;
  startDate: string;
  endDate: string;
};

export type UpdateBookingPayload = {
  startDate: string;
  endDate: string;
};
