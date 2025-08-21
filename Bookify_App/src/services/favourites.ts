import { http } from '../lib/http';
import type { FavouriteListItemDto } from './favourites.types';

export async function myFavourites() {
  const { data } = await http.get<FavouriteListItemDto[]>('/favourites/me');
  return data;
}

export async function addFavourite(venueId: number) {
  const { data } = await http.post<FavouriteListItemDto>(`/favourites/${venueId}`);
  return data;
}

export async function removeFavourite(venueId: number) {
  const { data } = await http.delete<unknown>(`/favourites/${venueId}`);
  return data;
}
