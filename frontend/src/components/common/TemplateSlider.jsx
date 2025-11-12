import React, { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import { templateBox1, templateBox2, templateBox3 } from '../../assets';

function TemplateSlider() {
  const slides = useMemo(() => [
    { id: 1, image: templateBox1, alt: "Custom packaging box design 1" },
    { id: 2, image: templateBox2, alt: "Custom packaging box design 2" },
    { id: 3, image: templateBox3, alt: "Custom packaging box design 3" },
  ], []);

  const swiperConfig = useMemo(() => ({
    navigation: true,
    mousewheel: true,
    keyboard: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
  }), []);

  return (
    <div className="template-slider max-w-5xl mx-auto">
      <Swiper 
        {...swiperConfig} 
        modules={[Navigation, Mousewheel, Keyboard, Autoplay]} 
        className="mySwiper" 
        aria-label="Custom packaging templates"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <img 
              src={slide.image} 
              alt={slide.alt}
              className="swiper-lazy rounded-[8px] w-full h-auto object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default React.memo(TemplateSlider);