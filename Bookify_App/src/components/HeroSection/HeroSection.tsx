import styles from "./HeroSection.module.css";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { ReactComponent as TreeWithCouple } from "../../assets/treeWithCouple.svg";
import { ReactComponent as UpperOrnament } from "../../assets/UpperOrnament.svg";

const HeroSection = () => {
    return (
        <Box className={styles.hero}>
            <UpperOrnament className={styles.ornament} />

            <Grid container spacing={4} alignItems="center" className={styles.content}>
                <Grid item xs={12} md={4}>
                    <TreeWithCouple className={styles.illustration} />
                </Grid>

                <Grid item xs={12} md={8}>
                    <Typography variant="h4" className={styles.heading}>
                        Find your place and experience it together.
                    </Typography>

                    <Grid container spacing={2} className={styles.form}>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField fullWidth placeholder="localization" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField fullWidth placeholder="occasion" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField fullWidth placeholder="date" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField fullWidth placeholder="guests" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField fullWidth placeholder="venue type" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Button fullWidth variant="contained" className={styles.searchBtn}>
                                Search for venue
                            </Button>
                        </Grid>
                    </Grid>

                    <Typography className={styles.subtle}>
                        I don't want to be that specific
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HeroSection;