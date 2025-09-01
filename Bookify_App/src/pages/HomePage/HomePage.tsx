import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import styles from "./HomePage.module.css";
import LinearProgress from "@mui/material/LinearProgress";
import HeroSection from "../../components/HeroSection/HeroSection";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import SortBar from "../../components/SortBar/SortBar";
import { type SortValue, SORT_TO_API } from "@/constants/sort";
import VenueCard from "@/components/VenueCard";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import { useVenues } from "@/customHooks";
import { type VenueType, isVenueType } from "@/constants/venueTypes";

const HomePage = () => {
  const location = useLocation();
  const [params, setSearchParams] = useSearchParams();

  const city = params.get("city") ?? undefined;
  const rawType = params.get("type") ?? undefined;
  const startDate = params.get("startDate") ?? undefined;
  const endDate = params.get("endDate") ?? undefined;
  const guestsRaw = params.get("guests");
  const sortFromUrl = (params.get("sort") as SortValue) ?? "newest";
  const perPageFromUrl = Number(params.get("perPage") ?? "") || 12;
  const pageFromUrl = Number(params.get("page") ?? "") || 1;
  const featuresFromUrl = params.getAll("features");
  const priceMinUrl = params.get("priceMin");
  const priceMaxUrl = params.get("priceMax");
  const initialPriceRange =
    priceMinUrl && priceMaxUrl ? [Number(priceMinUrl), Number(priceMaxUrl)] as [number, number] : null;

  const type: VenueType | undefined = isVenueType(rawType) ? rawType : undefined;
  const guests = guestsRaw ? Math.max(1, parseInt(guestsRaw, 10) || 0) : undefined;

  const [page, setPage] = useState<number>(pageFromUrl);
  const navigate = useNavigate();
  const [venuesPerPage, setVenuesPerPage] = useState<number>(perPageFromUrl);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(initialPriceRange);
  const [sort, setSort] = useState<SortValue>(sortFromUrl);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(featuresFromUrl);

  const updateSearchParam = (key: string, value?: string | number) => {
    const searchParameter = new URLSearchParams(location.search);
    if (value === undefined || value === "" || value === null) {
      searchParameter.delete(key);
    } else {
      searchParameter.set(key, String(value));
    }
    searchParameter.set("page", "1");
    setSearchParams(searchParameter, { replace: false });
  };

  const sortApi = useMemo(() =>
    SORT_TO_API[sort], [sort]);

  const filters = useMemo(
    () => ({
      city,
      type,
      ...(priceRange ? { priceMin: priceRange[0], priceMax: priceRange[1] } : {}),
      sortBy: sortApi.sortBy,
      sortDir: sortApi.sortDir,
      features: selectedFeatures,
      startDate,
      endDate,
      guests,
    }),
    [city, type, priceRange, sortApi, selectedFeatures, startDate, endDate, guests],
  );

  useEffect(() => {
    setPage(1);
  }, [city, type, selectedFeatures, priceRange, sort, startDate, endDate, guests]);

  useEffect(() => {
    const searchParams = new URLSearchParams();

    if (city) {
      searchParams.set("city", city);
    }
    if (type) {
      searchParams.set("type", type);
    }
    if (startDate) {
      searchParams.set("startDate", startDate);
    }
    if (endDate) {
      searchParams.set("endDate", endDate);
    }
    if (guests !== undefined) {
      searchParams.set("guests", String(guests));
    }

    searchParams.set("sort", sort);
    searchParams.set("perPage", String(venuesPerPage));
    searchParams.set("page", String(page));
    selectedFeatures.forEach((f) => searchParams.append("features", f));
    if (priceRange) {
      searchParams.set("priceMin", String(priceRange[0]));
      searchParams.set("priceMax", String(priceRange[1]));
    }

    setSearchParams(searchParams, { replace: false });
  }, [
    city, type, startDate, endDate, guests,
    sort, venuesPerPage, page, selectedFeatures, priceRange,
    setSearchParams,
  ]);

  const {
    venues,
    totalCount,
    availableFeatures,
    loading,
    error,
    priceDomain,
  } = useVenues(page, venuesPerPage, filters);

  const handleCardClick = (venueId: number) => {
    navigate(`/venue/${venueId}${location.search}`);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <HeroSection
          city={city ?? ""}
          type={type}
          startDate={startDate ?? ""}
          endDate={endDate ?? ""}
          guests={guests ?? 1}
          onCityChange={(val) => updateSearchParam("city", val || undefined)}
          onTypeChange={(val) => updateSearchParam("type", val || undefined)}
          onStartDateChange={(val) =>
            updateSearchParam("startDate", val || undefined)
          }
          onEndDateChange={(val) =>
            updateSearchParam("endDate", val || undefined)
          }
          onGuestsChange={(val) =>
            updateSearchParam("guests", val > 0 ? val : undefined)
          }
        />

        <div className={styles.contentWrapper}>
          <Box className={styles.mainContent}>
            <div className={styles.layout}>
              <aside className={styles.sidebarArea}>
                {!loading && venues.length > 0 && priceDomain && (
                  <FilterSidebar
                    availableFeatures={availableFeatures}
                    minPrice={priceDomain.min}
                    maxPrice={priceDomain.max}
                    priceRange={priceRange}
                    onPriceChange={setPriceRange}
                    selectedFeatures={selectedFeatures}
                    onSelectedFeaturesChange={(next) => setSelectedFeatures(next)}
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
                  sort={sort}
                  onSortChange={(val) => {
                    setSort(val);
                    setPage(1);
                  }}
                />
                {loading && <LinearProgress sx={{ mb: 2 }} />}
                {error && <p style={{ color: "crimson" }}>{error}</p>}
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
                              price={Math.round((venue.pricePerNight ?? 0))}
                              location={venue.location?.name ?? ""}
                              rating={typeof venue.rating === "number" ? venue.rating : 0}
                              capacity={venue.capacity ?? 0}
                              images={[
                                `https://picsum.photos/seed/${(venue.albumId ?? 1)}a/400/300`,
                                `https://picsum.photos/seed/${(venue.albumId ?? 1)}b/400/300`,
                              ]}
                              onClick={() => handleCardClick(venue.id)}
                              dimmed={
                                venue.availabilityStatus === "booked" ||
                                venue.availabilityStatus === "booked_by_me"
                              }
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