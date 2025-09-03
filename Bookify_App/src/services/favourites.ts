import { http } from "@/lib/http";
import type { FavouriteListItemDto } from './favourites.types';

export async function myFavourites() {
  const { data } = await http.get<FavouriteListItemDto[]>('/favourites/me');
  return data;
}

export async function getMyFavouriteIds(): Promise<number[]> {
  const { data } = await http.get<any[]>("/favourites/me");
  return (data ?? [])
    .map((row) =>
      typeof row?.venueId === "number"
        ? row.venueId
        : typeof row?.venue?.id === "number"
          ? row.venue.id
          : null
    )
    .filter((id: any): id is number => typeof id === "number");
}

export async function addFavourite(venueId: number) {
  const { data } = await http.post<FavouriteListItemDto>(`/favourites/${venueId}`);
  return data;
}

export async function removeFavourite(venueId: number) {
  const { data } = await http.delete<unknown>(`/favourites/${venueId}`);
  return data;
}
