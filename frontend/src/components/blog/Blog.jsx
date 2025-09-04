import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BlogCard from "../common/BlogCard";
import { BaseUrl } from "../../utils/BaseUrl";
import axios from "axios";

const Blog = () => {
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsAutoPlay(scrollPosition <= 100);
  }, []);

  useEffect(() => {
    // Throttle scroll event listener
    const throttledScroll = () => {
      let ticking = false;
      return () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };
    };

    const scrollHandler = throttledScroll();
    window.addEventListener("scroll", scrollHandler, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [handleScroll]);

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

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

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
  }), [isAutoPlay]);

  // Loading state
  if (loading) {
    return (
      <div className="md:py-12 py-10">
        <div className="sm:max-w-6xl max-w-[95%] mx-auto text-center">
          <h2 className="sm:text-[35px] text-[25px] pb-5 font-sans font-[600] text-[#333333]">
            Blog & News
          </h2>
          <div className="flex justify-center">
            <div className="animate-pulse text-gray-500">Loading blogs...</div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="md:py-12 py-10">
        <div className="sm:max-w-6xl max-w-[95%] mx-auto text-center">
          <h2 className="sm:text-[35px] text-[25px] pb-5 font-sans font-[600] text-[#333333]">
            Blog & News
          </h2>
          <div className="text-red-500">{error}</div>
          <button 
            onClick={fetchBlogs}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (blog.length === 0) {
    return (
      <div className="md:py-12 py-10">
        <div className="sm:max-w-6xl max-w-[95%] mx-auto text-center">
          <h2 className="sm:text-[35px] text-[25px] pb-5 font-sans font-[600] text-[#333333]">
            Blog & News
          </h2>
          <div className="text-gray-500">No blogs available at the moment.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:py-12 py-10">
      <div className="sm:max-w-6xl max-w-[95%] mx-auto text-center">
        <h2 className="sm:text-[35px] text-[25px] pb-5 font-sans font-[600] text-[#333333]">
          Blog & News
        </h2>
        <div className="w-full mx-auto">
          <Swiper {...swiperConfig}>
            {blog.map((testimonial) => (
              <SwiperSlide key={testimonial._id} className="mb-8">
                <BlogCard data={testimonial} />
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
        </div>
      </div>
    </div>
  );
};

export default React.memo(Blog);