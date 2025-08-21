export type VenueCardProps = {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  capacity: number;
  images: string[];
  isInitiallyFavourite?: boolean;
  onClick?: () => void;
  onFavouriteToggled?: (next: boolean) => void;
};
