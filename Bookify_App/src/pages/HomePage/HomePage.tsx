import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./HomePage.module.css";

import HeroSection from "../../components/HeroSection/HeroSection";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import SortBar from "../../components/SortBar/SortBar";
import VenueCard from "../../components/VenueCard/VenueCard";
import CustomPagination from "../../components/CustomPagination/CustomPagination";

import {Box, Grid} from "@mui/material";
import useVenues from "../../customHooks/useVenues";
import useCurrencyRate from "../../customHooks/useCurrencyRate";

const HomePage = () => {
    const {rate: eurToPlnRate, loading: rateLoading} = useCurrencyRate();
    const [page, setPage] = useState<number>(1);
    const navigate = useNavigate();
    const [venuesPerPage, setVenuesPerPage] = useState<number>(12);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const {venues, totalCount, availableFeatures, loading, error} = useVenues(page, venuesPerPage);


    const handleCardClick = (venueId: number) => {
        navigate(`/venue/${venueId}`);
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <HeroSection/>

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
                                        <Grid container spacing={2} className={styles.venueGrid}>
                                            {venues.map((venue) => (
                                                <Grid item xs={12} sm={6} md={4} key={venue.id} {...({} as any)}>
                                                    <VenueCard
                                                        title={venue.name}
                                                        price={Math.round(venue.pricePerNightInEUR * (eurToPlnRate || 1))}
                                                        location={venue.location.name}
                                                        rating={venue.rating}
                                                        capacity={venue.capacity}
                                                        images={[`https://picsum.photos/seed/${venue.albumId}a/400/300`, `https://picsum.photos/seed/${venue.albumId}b/400/300`]}
                                                        onClick={() => handleCardClick(venue.id)}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>

                                        <Box className={styles.paginationWrapper}>
                                            <CustomPagination
                                                totalPages={Math.ceil(totalCount / venuesPerPage)}
                                                currentPage={page}
                                                onPageChange={setPage}
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