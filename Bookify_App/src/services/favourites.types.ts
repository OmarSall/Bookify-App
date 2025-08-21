export type FavouriteListItemDto = {
  userId: number;
  venueId: number;
  createdAt: string;

  venue: {
    id: number;
    title: string;
    pricePerNight: number | string;
    capacity: number;
    rating?: number | null;
    albumId?: number | null;
    address?: {
      city?: string | null;
    } | null;
  };
};
