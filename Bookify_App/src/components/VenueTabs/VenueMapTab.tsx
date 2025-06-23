import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "./VenueMapTab.module.css";

interface Coordinates {
    lat: number;
    lng: number;
}

interface VenueMapTabProps {
    coordinates: Coordinates;
}

// Fix default marker icon bug in Leaflet + Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const VenueMapTab = ({coordinates}: VenueMapTabProps) => {
    const {lat, lng} = coordinates;

    return (
        <div className={styles.mapWrapper}>
            <MapContainer
                center={[lat, lng]}
                zoom={13}
                scrollWheelZoom={false}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lng]}>
                    <Popup>This venue is here!</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default VenueMapTab;