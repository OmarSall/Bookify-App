import { http } from "../lib/http";
import type {
  BookingListItemDto,
  CreateBookingPayload,
  UpdateBookingPayload,
} from "./bookings.types";

export async function createBooking(body: CreateBookingPayload) {
  const { data } = await http.post<BookingListItemDto>("/bookings", body);
  return data;
}

export async function myBookings() {
  const { data } = await http.get<BookingListItemDto[]>("/bookings/me");
  return data;
}

export async function updateBooking(id: number, body: UpdateBookingPayload) {
  const { data } = await http.patch<BookingListItemDto>(`/bookings/${id}`, body);
  return data;
}

export async function cancelBooking(id: number) {
  const { data } = await http.delete<unknown>(`/bookings/${id}`);
  return data;
}
