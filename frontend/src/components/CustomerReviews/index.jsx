import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Button from "../common/Button";
import { FaStar } from "react-icons/fa";
import AddReviews from "./AddReviews";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
import { review } from "../../assets";

// ==================== Star rating ====================
const StarRating = React.memo(({ rating }) => (
  <ul className="flex justify-center gap-1" aria-label={`Rating: ${rating} out of 5`}>
    {[...Array(5)].map((_, i) => (
      <li key={i}>
        <FaStar
          size={20}
          color={i < rating ? "#f0ad4e" : "#e4e5e9"}
          aria-label={i < rating ? "Filled star" : "Empty star"}
        />
      </li>
    ))}
  </ul>
));

// ==================== Review Slide ====================
const ReviewSlide = React.memo(({ testimonial }) => (
  <div className="max-w-5xl mx-auto px-4 py-8">
    <StarRating rating={testimonial.rating} />
    <blockquote className="py-3 text-lg text-gray-600 italic">
      {testimonial?.review}
    </blockquote>
    <strong className="font-semibold text-gray-800">{testimonial?.name}</strong>
    {testimonial?.position && (
      <p className="text-sm text-gray-500">{testimonial.position}</p>
    )}
  </div>
));

// ==================== Navigation Buttons ====================
const NavigationButtons = () => (
  <div className="flex absolute top-1/2 z-40 w-full justify-between transform -translate-y-1/2">
    <button
      className="custom-prev w-12 h-12 bg-[#F6F6F6] text-[#4440E6] hover:bg-[#4440E6] hover:text-white rounded-full flex items-center justify-center shadow-md ml-4"
      aria-label="Previous review"
    >
      <IoIosArrowBack size={25} />
    </button>
    <button
      className="custom-next w-12 h-12 bg-[#F6F6F6] text-[#4440E6] hover:bg-[#4440E6] hover:text-white rounded-full flex items-center justify-center shadow-md mr-4"
      aria-label="Next review"
    >
      <IoIosArrowForward size={25} />
    </button>
  </div>
);

// ==================== Customer Reviews ====================
const CustomerReviews = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backgroundStyle = useMemo(
    () => ({
      backgroundImage: `url(${review})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }),
    []
  );

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsAutoPlay(scrollPosition <= 100);
  }, []);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BaseUrl}/rating/getAll`);
      setTestimonials(response?.data?.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch reviews. Please try again later.");
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    fetchReviews();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [fetchReviews, handleScroll]);

  const swiperConfig = useMemo(
    () => ({
      modules: [Autoplay, Pagination, Navigation],
      autoplay: isAutoPlay
        ? {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }
        : false,
      loop: testimonials.length > 1,
      navigation: {
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      spaceBetween: 30,
      slidesPerView: "auto",
      centeredSlides: true,
      breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 1 },
        1024: { slidesPerView: 1 },
      },
    }),
    [isAutoPlay, testimonials.length]
  );

  return (
    <div className="py-12" style={backgroundStyle}>
      <div className="sm:max-w-6xl max-w-[95%] mx-auto text-center">
        <h2 className="sm:text-[35px] text-[25px] leading-9 pb-4 font-sans font-[600] text-[#333333]">
          Customer Reviews
        </h2>
        <p className="text-sm pb-5 text-gray-500">
          Share your true experience with us by writing a review below
        </p>
        <Button
          onClick={() => setOpenModal(true)}
          label={"Write a Review"}
          className="mx-auto bg-[#4440E6] mb-5 text-white hover:bg-[#3730a3]"
        />

        {loading ? (
          <div className="py-10">Loading reviews...</div>
        ) : error ? (
          <div className="py-10 text-red-500">{error}</div>
        ) : testimonials.length === 0 ? (
          <div className="py-10">No reviews yet. Be the first to review!</div>
        ) : (
          <div className="w-full mx-auto relative">
            <Swiper {...swiperConfig}>
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial._id}>
                  <ReviewSlide testimonial={testimonial} />
                </SwiperSlide>
              ))}
            </Swiper>

            {testimonials.length > 1 && <NavigationButtons />}
            {testimonials.length > 1 && (
              <div className="swiper-pagination mt-4 !relative"></div>
            )}
          </div>
        )}
      </div>

      <AddReviews
        isModalOpen={openModal}
        setIsModalOpen={setOpenModal}
        onReviewAdded={fetchReviews}
      />
    </div>
  );
};

export default React.memo(CustomerReviews);
