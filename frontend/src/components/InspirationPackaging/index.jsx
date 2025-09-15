import React, { useState, useEffect, useCallback } from "react";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import { gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9 } from "../../assets";

// Import images with descriptive names


const InspirationPackaging = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    // Predefined image descriptions for accessibility
    const imageDescriptions = [
        "Eco-friendly cosmetic packaging with botanical design",
        "Luxury wine bottle with embossed label",
        "Minimalist food packaging with clean typography",
        "Sustainable product box with recycled materials",
        "Colorful retail packaging with geometric patterns",
        "Elegent gift box with ribbon closure",
        "Modern tech product packaging with sleek design",
        "Vintage-inspired packaging with nostalgic elements",
        "Creative product container with unique shape"
    ];

    // Sample images array with descriptions
    const images = [
        { src: gallery1, alt: imageDescriptions[0] },
        { src: gallery2, alt: imageDescriptions[1] },
        { src: gallery5, alt: imageDescriptions[2] },
        { src: gallery9, alt: imageDescriptions[3] },
        { src: gallery6, alt: imageDescriptions[4] },
        { src: gallery7, alt: imageDescriptions[5] },
        { src: gallery8, alt: imageDescriptions[6] },
        { src: gallery3, alt: imageDescriptions[7] },
        { src: gallery4, alt: imageDescriptions[8] }
    ];

    // Keyboard navigation for image viewer
    const handleKeyDown = useCallback((e) => {
        if (!isViewerOpen) return;
        
        switch(e.key) {
            case 'Escape':
                closeImageViewer();
                break;
            case 'ArrowLeft':
                goToPrevious();
                break;
            case 'ArrowRight':
                goToNext();
                break;
            default:
                break;
        }
    }, [isViewerOpen]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const openImageViewer = useCallback((index) => {
        setSelectedImage(images[index].src);
        setCurrentIndex(index);
        setIsViewerOpen(true);
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
    }, [images]);

    const closeImageViewer = useCallback(() => {
        setIsViewerOpen(false);
        setSelectedImage(null);
        // Re-enable body scrolling
        document.body.style.overflow = 'unset';
    }, []);

    const goToPrevious = useCallback(() => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setSelectedImage(images[newIndex].src);
        setCurrentIndex(newIndex);
    }, [currentIndex, images]);

    const goToNext = useCallback(() => {
        const newIndex = (currentIndex + 1) % images.length;
        setSelectedImage(images[newIndex].src);
        setCurrentIndex(newIndex);
    }, [currentIndex, images]);

    // Preload images for better user experience
    useEffect(() => {
        images.forEach(image => {
            const img = new Image();
            img.src = image.src;
        });
    }, []);

    return (
        <div className="sm:max-w-6xl bg-[#f9fafb] px-4  py-6 rounded-2xl max-w-[95%] mx-auto">
            <div className="pb-7 text-center">
                <h2 className="sm:text-[35px] text-[25px] font-sans font-[600] text-[#333333]">
                    Inspiration for Creative Packaging
                </h2>
                <Link to={'/contact-us'}>
                    <Button
                        label={'Contact Our Design Department'}
                        className="bg-[#4440E6] text-white mx-auto mt-2 hover:bg-[#3630c9] transition-colors"
                    />
                </Link>
            </div>
            
            {/* Gallery Grid */}
            <div className="columns-2 sm:columns-3 md:columns-4 gap-1.5">
                {images.map((img, index) => (
                    <div 
                        key={index} 
                        className="mt-1.5 cursor-pointer break-inside-avoid"
                        onClick={() => openImageViewer(index)}
                    >
                        <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full rounded-lg hover:opacity-90 transition-opacity"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>

            {/* Image Viewer Modal */}
            {isViewerOpen && (
                <div 
                    className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-90 z-50 flex items-center justify-center p-4"
                    onClick={closeImageViewer}
                    role="dialog"
                    aria-label="Image viewer"
                    aria-modal="true"
                >
                    <div 
                        className="relative max-w-4xl max-h-screen overflow-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                       

                        <button
                            onClick={goToPrevious}
                            className="absolute left-0  cursor-pointer top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 p-4 transition-colors"
                            aria-label="Previous image"
                        >
                            &#10094;
                        </button>

                        <div className="max-w-full max-h-screen overflow-auto flex items-center justify-center">
                            <img
                                src={selectedImage}
                                alt={imageDescriptions[currentIndex]}
                                className="max-w-full max-h-screen object-contain"
                            />
                        </div>

                        <button
                            onClick={goToNext}
                            className="absolute   cursor-pointer right-0 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 p-4 transition-colors"
                            aria-label="Next image"
                        >
                            &#10095;
                        </button>

                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-[rgba(0,0,0,0.8)] bg-opacity-50 px-3 py-1 rounded-full">
                            {currentIndex + 1} / {images.length}
                        </div>
                    </div>

                     <div className='absolute top-0 right-0 z-10'>
                            <button
                                onClick={closeImageViewer}
                                className="text-white text-3xl  cursor-pointer hover:text-gray-300 p-4 transition-colors"
                                aria-label="Close image viewer"
                            >
                                &times;
                            </button>
                        </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(InspirationPackaging);