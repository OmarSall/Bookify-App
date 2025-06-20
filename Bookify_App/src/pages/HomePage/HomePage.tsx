import styles from "./HomePage.module.css";
import HeroSection from "../../components/HeroSection/HeroSection";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import SortBar from "../../components/SortBar/SortBar";
import VenueCard from "../../components/VenueCard/VenueCard";

import {Grid, Box, Pagination} from "@mui/material";

const HomePage = () => {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <HeroSection/>
                <div className={styles.contentWrapper}>
                    <Box className={styles.mainContent}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3} {...({} as any)}>
                                <FilterSidebar/>
                            </Grid>
                            <div className={styles.resultsArea}>
                                <Grid item xs={12} md={9} {...({} as any)}>
                                    <SortBar/>

                                    <Grid container spacing={2} className={styles.venueGrid}>
                                        {Array.from({length: 12}).map((_, idx) => (
                                            <Grid item xs={12} sm={6} md={4} key={idx} {...({} as any)}>
                                                <VenueCard
                                                    key={idx}
                                                    title="Enchanted Hut"
                                                    location="Zakopane, Poland"
                                                    rating={4.8}
                                                    capacity={4}
                                                    imageUrl="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"/>
                                            </Grid>
                                        ))}
                                    </Grid>

                                    <Box className={styles.paginationWrapper}>
                                        <Pagination count={5} color="primary"/>
                                    </Box>
                                </Grid>
                            </div>
                        </Grid>
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default HomePage;