import React, { useEffect, useState, useCallback, useMemo, lazy, Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BaseUrl } from "../../utils/BaseUrl";
import axios from "axios";
import { useIntersectionObserver } from "../../utils/useIntersectionObserver";

// Lazy load the BlogCard component
const BlogCard = lazy(() => import("../common/BlogCard"));

// Skeleton loader for blog cards
const BlogCardSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
    <div className="h-48 bg-gray-300"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);

const Blog = () => {
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(false); // Start with false, will be true when fetching
  const [error, setError] = useState(null);
  const [visibleSlides, setVisibleSlides] = useState(1); // Track visible slides for lazy loading
  
  // Use Intersection Observer to defer API call until component is visible
  const [blogRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '200px', // Start loading 200px before visible
    triggerOnce: true
  });

  // Memoized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsAutoPlay(scrollPosition <= 100);
  }, []);

  useEffect(() => {
    // Throttle scroll event listener
    let ticking = false;
    
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [handleScroll]);

  // Update visible slides based on window width
  useEffect(() => {
    const updateVisibleSlides = () => {
      if (window.innerWidth >= 1024) {
        setVisibleSlides(3);
      } else if (window.innerWidth >= 768) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(1);
      }
    };

    updateVisibleSlides();
    window.addEventListener("resize", updateVisibleSlides);
    
    return () => {
      window.removeEventListener("resize", updateVisibleSlides);
    };
  }, []);

  // Fetch blogs with error handling
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BaseUrl}/blog/getAll`);
      setBlog(response?.data?.data || []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load blogs. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Only fetch blogs when component is visible (deferred loading)
  useEffect(() => {
    if (isVisible && !loading && blog.length === 0) {
      fetchBlogs();
    }
  }, [isVisible, fetchBlogs, loading, blog.length]);

  // Fallback: If component is already visible on mount, fetch immediately
  // Also fetch after a delay if intersection observer doesn't trigger (safety net)
  useEffect(() => {
    // Check if component is already visible on mount
    if (blogRef.current) {
      const rect = blogRef.current.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight + 200 && rect.bottom > -200;
      
      if (isInViewport && !loading && blog.length === 0 && !error) {
        // Component is already visible, fetch immediately
        fetchBlogs();
      }
    }

    // Fallback: Fetch after 2 seconds if intersection observer doesn't trigger
    const timer = setTimeout(() => {
      if (!loading && blog.length === 0 && !error && !isVisible) {
        // If still not visible after 2 seconds, fetch anyway as fallback
        fetchBlogs();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []); // Only run once on mount

  // Memoize Swiper configuration
   const swiperConfig = useMemo(() => ({
    modules: [Autoplay, Pagination, Navigation],
    autoplay: isAutoPlay ? { 
      delay: 3000, 
      disableOnInteraction: false 
    } : false,
    loop: true,
    navigation: {
      nextEl: ".blog-custom-next",
      prevEl: ".blog-custom-prev",
    },
    spaceBetween: 30,
    slidesPerView: "auto",
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
    // Lazy loading configuration for Swiper
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: visibleSlides + 1, // Load one extra slide on each side
    },
  }), [isAutoPlay, visibleSlides]);

  // Function to determine if a slide should be loaded
  const shouldLoadSlide = useCallback((index, activeIndex, totalSlides) => {
    // Load current, next, and previous slides
    return (
      index === activeIndex ||
      index === (activeIndex + 1) % totalSlides ||
      index === (activeIndex - 1 + totalSlides) % totalSlides
    );
  }, []);

  return (
    <div ref={blogRef} className="md:py-12 py-10">
      <div className="sm:max-w-6xl max-w-[95%] mx-auto text-center">
        <h2 className="sm:text-[35px] text-[25px] pb-5 font-sans font-[600] text-[#333333]">
          Blog & News
        </h2>
        <div className="w-full mx-auto">
          {/* Loading state */}
          {(loading || (!isVisible && blog.length === 0)) && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <BlogCardSkeleton key={index} />
              ))}
            </div>
          )}

          {/* Error state */}
          {error && !loading && blog.length === 0 && (
            <div>
              <div className="text-red-500 mb-4">{error}</div>
              <button 
                onClick={fetchBlogs}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && blog.length === 0 && isVisible && (
            <div className="text-gray-500">No blogs available at the moment.</div>
          )}

          {/* Blog content */}
          {!loading && blog.length > 0 && (
            <>
              <Swiper {...swiperConfig}>
                {blog.map((testimonial, index) => (
                  <SwiperSlide key={testimonial._id} className="mb-8">
                    <Suspense fallback={<BlogCardSkeleton />}>
                      <BlogCard data={testimonial} />
                    </Suspense>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="flex justify-center gap-3 items-center mt-6">
                <button 
                  className="blog-custom-prev w-12 h-12 bg-[#F6F6F6] hover:bg-[#4440E6] hover:text-white rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="Previous blog posts"
                >
                  <IoIosArrowBack size={25} />
                </button>
                <button 
                  className="blog-custom-next w-12 h-12 bg-[#F6F6F6] hover:bg-[#4440E6] hover:text-white rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="Next blog posts"
                >
                  <IoIosArrowForward size={25} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Blog);