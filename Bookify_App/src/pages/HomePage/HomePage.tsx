import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./HomePage.module.css";

import HeroSection from "../../components/HeroSection/HeroSection";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import SortBar from "../../components/SortBar/SortBar";
import VenueCard from "@/components/VenueCard";
import CustomPagination from "../../components/CustomPagination/CustomPagination";

import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import { useVenues, useCurrencyRate } from "@/customHooks";

const HomePage = () => {
  const [params] = useSearchParams();
  const city = params.get("city") ?? undefined;

  const { rate: eurToPlnRate, loading: rateLoading } = useCurrencyRate();
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  const [venuesPerPage, setVenuesPerPage] = useState<number>(12);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const filters = useMemo(() => ({ city }), [city]);

  const {
    venues,
    totalCount,
    availableFeatures,
    loading,
    error,
  } = useVenues(page, venuesPerPage, filters);

  const handleCardClick = (venueId: number) => {
    navigate(`/venue/${venueId}`);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <HeroSection />

        <div className={styles.contentWrapper}>
          <Box className={styles.mainContent}>
            <div className={styles.layout}>
              <aside className={styles.sidebarArea}>
                {!loading && venues.length > 0 && (
                  <FilterSidebar
                    availableFeatures={availableFeatures}
                    priceRange={priceRange}
                    onPriceChange={(range) => setPriceRange([range[0], range[1]])}
                  />
                )}
              </aside>

              <div className={styles.resultsArea}>
                <SortBar
                  venuesPerPage={venuesPerPage}
                  onVenuesPerPageChange={(val) => {
                    setVenuesPerPage(val);
                    setPage(1);
                  }}
                />
                {(loading) && <p>Loading venues...</p>}
                {!loading && rateLoading && <p>Converting prices...</p>}
                {!loading && !error && (
                  <>
                    <Grid
                      container
                      columns={{ xs: 12, sm: 12, md: 12 }}
                      spacing={2}
                      className={styles.venueGrid}
                      justifyContent={venues.length === 1 ? "center" : "flex-start"}
                    >
                      {
                        venues.map((venue) => (
                          <Grid key={venue.id}
                                size={{ xs: 12, sm: venues.length === 1 ? 9 : 6, md: venues.length === 1 ? 9 : 4 }}>
                            <VenueCard
                              id={venue.id}
                              isInitiallyFavourite={venue.isFavourite ?? false}
                              title={venue.name}
                              price={Math.round(
                                (venue.pricePerNightPLN ??
                                  venue.pricePerNight ??
                                  ((venue.pricePerNightInEUR ?? 0) * (eurToPlnRate || 1))) as number,
                              )}
                              location={venue.location?.name ?? ""}
                              rating={typeof venue.rating === "number" ? venue.rating : 0}
                              capacity={typeof venue.capacity === "number" ? venue.capacity : undefined}
                              images={[
                                `https://picsum.photos/seed/${(venue.albumId ?? 1)}a/400/300`,
                                `https://picsum.photos/seed/${(venue.albumId ?? 1)}b/400/300`,
                              ]}
                              onClick={() => handleCardClick(venue.id)}
                            />
                          </Grid>
                        ))}
                    </Grid>

                    <Box className={styles.paginationWrapper}>
                      <CustomPagination
                        totalPages={Math.ceil(totalCount / venuesPerPage)}
                        currentPage={page}
                        onPageChange={(newPage) => {
                          console.log("🧭 Going to page:", newPage);
                          setPage(newPage);
                        }}
                      />
                    </Box>
                  </>
                )}
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default HomePage;