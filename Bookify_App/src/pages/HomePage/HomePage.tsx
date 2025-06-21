import styles from "./HomePage.module.css";
import HeroSection from "../../components/HeroSection/HeroSection";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import SortBar from "../../components/SortBar/SortBar";
import VenueCard from "../../components/VenueCard/VenueCard";

import { Box, Grid, Pagination } from "@mui/material";

const HomePage = () => {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <HeroSection />

                <div className={styles.contentWrapper}>
                    <Box className={styles.mainContent}>
                        <div className={styles.layout}>
                            <aside className={styles.sidebarArea}>
                                <FilterSidebar />
                            </aside>

                            <div className={styles.resultsArea}>
                                <SortBar />

                                <Grid container spacing={2} className={styles.venueGrid}>
                                    {Array.from({ length: 12 }).map((_, idx) => (
                                        <Grid item xs={12} sm={6} md={4} key={idx} {...({} as any)}>
                                            <VenueCard
                                                title="Enchanted Hut"
                                                location="Zakopane, Poland"
                                                rating={4.8}
                                                capacity={4}
                                                imageUrl="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                                            />
                                        </Grid>
                                    ))}
                                </Grid>

                                <Box className={styles.paginationWrapper}>
                                    <Pagination
                                        count={12}
                                        page={3}
                                        shape="circular"
                                        className="customPagination"
                                    />
                                </Box>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
