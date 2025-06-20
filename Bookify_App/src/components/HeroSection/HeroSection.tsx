import styles from "./HeroSection.module.css";
import {Box, Typography, Button} from "@mui/material";
import TreeWithCouple from "../../assets/treeWithCouple.svg?react";
import UpperOrnament from "../../assets/UpperOrnament.svg?react";
import CustomInput from "../CustomInput";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CelebrationIcon from "@mui/icons-material/Celebration";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from "@mui/icons-material/Search";
import {InputAdornment} from "@mui/material";
import GuestsInput from "./GuestInput";

const HeroSection = () => {
    return (
        <Box className={styles.hero}>
            <UpperOrnament className={styles.ornament}/>
            <TreeWithCouple className={styles.illustration}/>

            <Box className={styles.content}>
                <div className={styles.heading}>
                    Find your place and experience it together.
                </div>

                <Box className={styles.inputGroup}>
                    <CustomInput
                        name="localization"
                        placeholder="localization"
                        className={styles.input}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocationOnIcon sx={{fontSize: 18, color: "#666"}}/>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <CustomInput
                        name="occasion"
                        placeholder="occasion"
                        className={styles.input}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CelebrationIcon sx={{fontSize: 18, color: "#666"}}/>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <CustomInput
                        name="date"
                        placeholder="date"
                        className={styles.input}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalendarTodayIcon sx={{fontSize: 18, color: "#666"}}/>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <GuestsInput />
                    {/*<CustomInput*/}
                    {/*    name="guests"*/}
                    {/*    placeholder="guests"*/}
                    {/*    className={styles.input}*/}
                    {/*    InputProps={{*/}
                    {/*        startAdornment: (*/}
                    {/*            <InputAdornment position="start">*/}
                    {/*                <GroupIcon sx={{fontSize: 18, color: "#666"}}/>*/}
                    {/*            </InputAdornment>*/}
                    {/*        ),*/}
                    {/*    }}*/}
                    {/*/>*/}

                    <CustomInput
                        name="venue"
                        placeholder="venue type"
                        className={styles.input}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{fontSize: 18, color: "#666"}}/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Typography className={styles.subtle}>
                    I don't want to be that specific
                </Typography>

                <Button variant="contained" className={styles.searchBtn}>
                    Search for venue
                </Button>
            </Box>
        </Box>
    );
};

export default HeroSection;
