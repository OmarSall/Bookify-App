import React from "react";

interface VenueGalleryTabProps {
    images: string[];
}

const VenueGalleryTab: React.FC<VenueGalleryTabProps> = ({ images }) => {
    return (
        <div>
            {images.map((url, index) => (
                <img key={index} src={url} alt={`Gallery ${index}`} />
            ))}
        </div>
    );
};

export default VenueGalleryTab;
