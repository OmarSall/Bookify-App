import { http } from "../lib/http";

export async function createBooking(body: { venueId: number; startDate: string; endDate: string }) {
  return (await http.post("/bookings", body)).data;
}

export async function myBookings() {
  return (await http.get("/bookings/me")).data;
}

export async function updateBooking(id: number, body: { startDate: string; endDate: string }) {
  return (await http.patch(`/bookings/${id}`, body)).data;
}

export async function cancelBooking(id: number) {
  return (await http.delete(`/bookings/${id}`)).data;
}
