export const SORT_VALUES = [
  "newest",
  "oldest",
  "price_asc",
  "price_desc",
  "rating_desc",
  "rating_asc",
  "capacity_desc",
  "capacity_asc",
] as const;

export type SortValue = typeof SORT_VALUES[number];

export const SORT_LABELS = {
  newest: "Newest",
  oldest: "Oldest",
  price_asc: "Price: low → high",
  price_desc: "Price: high → low",
  rating_desc: "Rating: high → low",
  rating_asc: "Rating: low → high",
  capacity_desc: "Capacity: high → low",
  capacity_asc: "Capacity: low → high",
} as const satisfies Record<SortValue, string>;

export const SORT_OPTIONS = SORT_VALUES.map((value) => ({
  value,
  label: SORT_LABELS[value],
}));

export const ITEMS_PER_PAGE_OPTIONS = [12, 24, 36, 48] as const;

export const SORT_TO_API: Record<
  SortValue,
  { sortBy: "createdAt" | "price" | "rating" | "capacity"; sortDir: "asc" | "desc" }
> = {
  newest: { sortBy: "createdAt", sortDir: "desc" },
  oldest: { sortBy: "createdAt", sortDir: "asc" },
  price_asc: { sortBy: "price", sortDir: "asc" },
  price_desc: { sortBy: "price", sortDir: "desc" },
  rating_desc: { sortBy: "rating", sortDir: "desc" },
  rating_asc: { sortBy: "rating", sortDir: "asc" },
  capacity_desc: { sortBy: "capacity", sortDir: "desc" },
  capacity_asc: { sortBy: "capacity", sortDir: "asc" },
};