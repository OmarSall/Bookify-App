export const coverImageUrl = (albumId: number | null | undefined, w = 600, h = 400) =>
  `https://picsum.photos/seed/${albumId ?? 1}/${w}/${h}`;

export const galleryUrls = (albumId: number | null | undefined, count = 5) =>
  Array.from({ length: count }, (_, i) =>
    `https://picsum.photos/seed/${albumId ?? 1}-${i}/${800}/${600}`
  );
