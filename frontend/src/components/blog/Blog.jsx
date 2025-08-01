
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BlogCard from "../common/BlogCard";
import { BaseUrl } from "../../utils/BaseUrl";
import axios from "axios";

const Blog = () => {
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsAutoPlay(scrollPosition <= 100);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const testimonials = [
    {
      id: 1,
      
      title:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best.",

        desc:"The finish of printed materials makes a big difference, ...and it can turly affect how people see your ",
      
      image: "https://umbrellapackaging.com/wp-content/uploads/2025/01/Comparison-of-soft-touch-lamination-and-soft-touch-coating-highlighting-their-textures-and-finishes-for-enhanced-tactile-experience.webp",
    },
    {
      id: 2,
      
      title:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best.",

        desc:"The finish of printed materials makes a big difference, ...and it can turly affect how people see your ",
      
      image: "https://umbrellapackaging.com/wp-content/uploads/2025/01/Comparison-of-soft-touch-lamination-and-soft-touch-coating-highlighting-their-textures-and-finishes-for-enhanced-tactile-experience.webp",
    },
    {
      id: 3,
      
      title:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best.",

        desc:"The finish of printed materials makes a big difference, ...and it can turly affect how people see your ",
      
      image: "https://umbrellapackaging.com/wp-content/uploads/2025/01/Comparison-of-soft-touch-lamination-and-soft-touch-coating-highlighting-their-textures-and-finishes-for-enhanced-tactile-experience.webp",
    },
    {
      id: 4,
      title:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best.",
        desc:"The finish of printed materials makes a big difference, ...and it can turly affect how people see your ",
      image: "https://umbrellapackaging.com/wp-content/uploads/2025/01/Comparison-of-soft-touch-lamination-and-soft-touch-coating-highlighting-their-textures-and-finishes-for-enhanced-tactile-experience.webp",
    },
  ];


  const [blog,setBlog] =useState([])



  const fetchBlogs = async()=>{
    const response =   await axios.get(`${BaseUrl}/blog/getAll`)
 
    setBlog(response?.data?.data)
   }
 
 
   useEffect(()=>{
    fetchBlogs();
   },[])

  return (
    <div className="md:py-12 py-10">
      <div className=" sm:max-w-6xl max-w-[95%] mx-auto  text-center">
        <h2 className="sm:text-[35px] text-[25px]   pb-5   font-sans   font-[600] text-[#333333]">Blog & News</h2>
        <div className="w-full  mx-auto">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={
              isAutoPlay ? { delay: 3000, disableOnInteraction: false } : false
            }
            loop={true}
            // pagination={{ clickable: true }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            spaceBetween={30}
           slidesPerView="auto"
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {blog.map((testimonial) => (
              <SwiperSlide key={testimonial._id}>
                <BlogCard data={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>

          
          <div className="flex  justify-center gap-3 items-center mt-8">
            <button className="custom-prev w-12 h-12 bg-[#F6F6F6]  hover:bg-[#4440E6] hover:text-white  rounded-full flex items-center justify-center">
              <IoIosArrowBack  size={25}  />
            </button>
            <button className="custom-next w-12 h-12 bg-[#F6F6F6] hover:bg-[#4440E6] rounded-full hover:text-white flex items-center justify-center">
              <IoIosArrowForward size={25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
