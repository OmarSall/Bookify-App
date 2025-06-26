import {useState} from "react";
import styles from "./ImageCarousel.module.css";

interface ImageCarouselProps {
    images: string[];
}

const ImageCarousel = ({images}: ImageCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className={styles.carousel}>
            <img
                src={images[currentIndex]}
                alt={`Venue image ${currentIndex + 1}`}
                className={styles.image}
            />

            {images.length > 1 && (
                <>
                    <button className={styles.prevButton} onClick={handlePrev}>
                        ❮
                    </button>
                    <button className={styles.nextButton} onClick={handleNext}>
                        ❯
                    </button>
                </>
            )}
        </div>
    );
};

export default ImageCarousel;