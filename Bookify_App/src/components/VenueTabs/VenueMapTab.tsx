import React from "react";

interface Coordinates {
    lat: number;
    lng: number;
}

interface VenueMapTabProps {
    coordinates: Coordinates;
}

const VenueMapTab: React.FC<VenueMapTabProps> = ({ coordinates }) => {
    return (
        <div>
            <p>Map for lat: {coordinates.lat}, lng: {coordinates.lng}</p>
            {/* Replace with actual Google Maps integration */}
        </div>
    );
};

export default VenueMapTab;
