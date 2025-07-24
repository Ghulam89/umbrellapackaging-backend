import React, { useState, useEffect } from "react";
import Button from "../common/Button";
import { Link } from "react-router-dom";

const InspirationPackaging = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    
    // Sample images array
    const images = [
        "09.webp",
        "08.webp",
        "07.webp",
        "06.webp",
        "03.webp",
        "01.webp",
        "04.webp",
        "05.webp",
        "02.webp",
    ].map(img => `https://umbrellapackaging.com/wp-content/uploads/2024/01/${img}`);

    const openImageViewer = (index) => {
        setSelectedImage(images[index]);
        setCurrentIndex(index);
        setIsViewerOpen(true);
    };

    const closeImageViewer = () => {
        setIsViewerOpen(false);
        setSelectedImage(null);
    };

    const goToPrevious = () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setSelectedImage(images[newIndex]);
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const newIndex = (currentIndex + 1) % images.length;
        setSelectedImage(images[newIndex]);
        setCurrentIndex(newIndex);
    };

    return (
        <div className="sm:max-w-6xl bg-[#f9fafb] p-7 rounded-2xl max-w-[95%] mx-auto">
            <div className="pb-7 text-center">
             <h2 className="sm:text-[35px] text-[25px]     font-sans   font-[600] text-[#333333] ">Inspiration for Creative Packaging</h2>
                <Link to={'/contact-us'}>
                 <Button 
                    label={'Contact Our Design Department'} 
                    className="bg-[#4440E6] text-white mx-auto mt-2" 
                />
                </Link>
               
            </div>
            <div className="grid gap-1.5 pb-12 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                {images.map((img, index) => (
                    <div 
                        key={index} 
                        className="w-full cursor-pointer"
                        onClick={() => openImageViewer(index)}
                    >
                        <img
                            src={img}
                            className="w-full h-full object-cover rounded-2xl hover:opacity-90 transition-opacity"
                            alt={`Packaging Inspiration ${index + 1}`}
                        />
                    </div>
                ))}
            </div>

            {isViewerOpen && selectedImage && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] bg-opacity-90 z-50 flex items-center justify-center p-4">
                    <div className='absolute top-4 right-4'>
                        <button
                            onClick={closeImageViewer}
                            className="text-white text-3xl hover:text-gray-300"
                        >
                            &times;
                        </button>
                    </div>

                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 text-white text-3xl hover:text-gray-300 p-4"
                    >
                        &#10094;
                    </button>

                    <div className="max-w-4xl max-h-screen overflow-auto">
                        <img
                            src={selectedImage}
                            alt={`Gallery Image ${currentIndex + 1}`}
                            className="max-w-full max-h-screen object-contain"
                        />
                    </div>

                    <button
                        onClick={goToNext}
                        className="absolute right-4 text-white text-3xl hover:text-gray-300 p-4"
                    >
                        &#10095;
                    </button>

                    <div className="absolute bottom-4 text-white">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>
            )}
        </div>
    );
};

export default InspirationPackaging;