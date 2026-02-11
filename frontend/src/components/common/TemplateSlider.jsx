import React, { useMemo, useState, useEffect, useRef } from 'react';
import { templateBox1, templateBox2, templateBox3 } from '../../assets';

function TemplateSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  const slides = useMemo(() => [
    { id: 1, image: templateBox1, alt: "Custom packaging box design 1" },
    { id: 2, image: templateBox2, alt: "Custom packaging box design 2" },
    { id: 3, image: templateBox3, alt: "Custom packaging box design 3" },
  ], []);

  // Duplicate slides for infinite loop
  const infiniteSlides = useMemo(() => [...slides, ...slides, ...slides], [slides]);
  const startIndex = slides.length; // Start from middle set

  // Initialize to start from middle
  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= slides.length * 2) {
        setTimeout(() => {
          if (sliderRef.current) {
            sliderRef.current.style.transition = 'none';
            setCurrentIndex(slides.length);
            void sliderRef.current.offsetHeight;
            requestAnimationFrame(() => {
              if (sliderRef.current) {
                sliderRef.current.style.transition = 'transform 600ms ease-in-out';
              }
            });
          }
        }, 600);
        return slides.length * 2;
      }
      return nextIndex;
    });
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      if (nextIndex < slides.length) {
        setTimeout(() => {
          if (sliderRef.current) {
            sliderRef.current.style.transition = 'none';
            setCurrentIndex(slides.length * 2 - 1);
            void sliderRef.current.offsetHeight;
            requestAnimationFrame(() => {
              if (sliderRef.current) {
                sliderRef.current.style.transition = 'transform 600ms ease-in-out';
              }
            });
          }
        }, 600);
        return slides.length - 1;
      }
      return nextIndex;
    });
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  // Auto slide functionality
  useEffect(() => {
    const startAutoplay = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      intervalRef.current = setInterval(() => {
        if (!isPaused) {
          setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            // Reset seamlessly when reaching end
            if (nextIndex >= slides.length * 2) {
              setTimeout(() => {
                if (sliderRef.current) {
                  sliderRef.current.style.transition = 'none';
                  setCurrentIndex(slides.length);
                  void sliderRef.current.offsetHeight;
                  requestAnimationFrame(() => {
                    if (sliderRef.current) {
                      sliderRef.current.style.transition = 'transform 600ms ease-in-out';
                    }
                  });
                }
              }, 600);
              return slides.length * 2;
            }
            return nextIndex;
          });
        }
      }, 3000);
    };

    startAutoplay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [slides.length, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (containerRef.current && (document.activeElement === containerRef.current || 
          containerRef.current?.contains(document.activeElement))) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goToPrevious();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          goToNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Calculate translateX
  const getTranslateX = () => {
    if (!sliderRef.current?.parentElement) return 0;
    const containerWidth = sliderRef.current.parentElement.offsetWidth;
    return -(currentIndex * containerWidth);
  };

  return (
    <div 
      ref={containerRef}
      className="template-slider max-w-5xl mx-auto relative"
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Custom packaging templates"
    >
      <div className="relative overflow-hidden rounded-[8px]">
        <div 
          ref={sliderRef}
          className="flex transition-transform ease-in-out"
          style={{
            transform: `translateX(${getTranslateX()}px)`,
            transitionDuration: '600ms',
          }}
        >
          {infiniteSlides.map((slide, index) => (
            <div
              key={`${slide.id}-${index}`}
              className="flex-shrink-0 w-full"
            >
              <img 
                src={slide.image} 
                alt={slide.alt}
                className="rounded-[8px] w-full h-auto"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-[#4440E6]"
          aria-label="Previous slide"
        >
          <svg 
            className="w-6 h-6 text-gray-700" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-[#4440E6]"
          aria-label="Next slide"
        >
          <svg 
            className="w-6 h-6 text-gray-700" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(slides.length + index);
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 5000);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              (currentIndex % slides.length) === index
                ? 'bg-[#4440E6] w-8'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default React.memo(TemplateSlider);