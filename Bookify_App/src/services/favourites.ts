import { http } from "../lib/http";

export async function myFavourites() {
  return (await http.get("/favourites/me")).data;
}

export async function addFavourite(venueId: number) {
  return (await http.post(`/favourites/${venueId}`)).data;
}

export async function removeFavourite(venueId: number) {
  return (await http.delete(`/favourites/${venueId}`)).data;
}
