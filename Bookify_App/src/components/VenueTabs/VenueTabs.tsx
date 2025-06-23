import styles from "./VenueTabs.module.css";
import {Tabs, Tab, Box} from "@mui/material";
import VenueDescriptionTab from "./VenueDescriptionTab";
import VenueGalleryTab from "./VenueGalleryTab";
import VenueMapTab from "./VenueMapTab";
import * as React from "react";

type Props = {
    activeTab: "description" | "gallery" | "map";
    onTabChange: (value: "description" | "gallery" | "map") => void;
    description: string;
    images: string[];
    coordinates: {
        lat: number;
        lng: number;
    };
    amenities: string[];
};

const VenueTabs = ({
                       activeTab,
                       onTabChange,
                       description,
                       images,
                       coordinates,
                       amenities,
                   }: Props) => {
    const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
        onTabChange(newValue as "description" | "gallery" | "map");
    };

    return (
        <div className={styles.tabsWrapper}>
            <Tabs value={activeTab} onChange={handleTabChange} className={styles.tabs}>
                <Tab label="Description" value="description"/>
                <Tab label="Gallery" value="gallery"/>
                <Tab label="Map" value="map"/>
            </Tabs>

            <Box className={styles.tabContent}>
                {activeTab === "description" && (
                    <VenueDescriptionTab description={description} amenities={amenities}/>
                )}
                {activeTab === "gallery" && <VenueGalleryTab images={images}/>}
                {activeTab === "map" && <VenueMapTab coordinates={coordinates}/>}
            </Box>
        </div>
    );
};

export default VenueTabs;