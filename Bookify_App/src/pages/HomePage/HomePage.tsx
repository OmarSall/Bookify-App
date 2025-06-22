import {useState, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./HomePage.module.css";

import HeroSection from "../../components/HeroSection/HeroSection";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import SortBar from "../../components/SortBar/SortBar";
import VenueCard from "../../components/VenueCard/VenueCard";
import CustomPagination from "../../components/CustomPagination/CustomPagination";

import {Box, Grid} from "@mui/material";
import useVenues from "../../customHooks/useVenues";

const HomePage = () => {
    const [page, setPage] = useState<number>(1);
    const navigate = useNavigate();
    const {venues, availableFeatures, loading, error} = useVenues();

    const venuesPerPage = 12;
    const paginatedVenues = venues.slice((page - 1) * venuesPerPage, page * venuesPerPage);

    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

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
                                <SortBar/>

                                {loading && <p>Loading venues...</p>}
                                {error && <p>{error}</p>}
                                {!loading && !error && (
                                    <>
                                        <Grid container spacing={2} className={styles.venueGrid}>
                                            {paginatedVenues.map((venue) => (
                                                <Grid item xs={12} sm={6} md={4} key={venue.id} {...({} as any)}>
                                                    <VenueCard
                                                        title={venue.name}
                                                        location={venue.location.name}
                                                        rating={venue.rating}
                                                        capacity={venue.capacity}
                                                        imageUrl={`https://picsum.photos/seed/${venue.albumId}/400/300`}
                                                        onClick={() => handleCardClick(venue.id)}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>

                                        <Box className={styles.paginationWrapper}>
                                            <CustomPagination
                                                totalPages={Math.ceil(venues.length / venuesPerPage)}
                                                currentPage={page}
                                                onPageChange={(newPage: number) => setPage(newPage)}
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
