export const VENUE_TYPES = ["studio", "apartment", "house", "villa"] as const;

export type VenueType = typeof VENUE_TYPES[number];

export const isVenueType = (x: unknown): x is VenueType =>
  typeof x === "string" && (VENUE_TYPES as readonly string[]).includes(x);