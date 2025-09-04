import React, { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

import box1 from '../../assets/images/boxes/box.webp';
import box2 from '../../assets/images/boxes/box2.webp';
import box3 from '../../assets/images/boxes/box3.webp';

function TemplateSlider() {
 
  const slides = useMemo(() => [
    {
      id: 1,
      image: box1,
      alt: "Custom packaging box design 1"
    },
    {
      id: 2,
      image: box2,
      alt: "Custom packaging box design 2"
    },
    {
      id: 3,
      image: box3,
      alt: "Custom packaging box design 3"
    }
  ], []);

  const swiperConfig = useMemo(() => ({
    cssMode: true,
    navigation: true,
    mousewheel: true,
    keyboard: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    modules: [Navigation, Mousewheel, Keyboard, Autoplay],
  }), []);

  return (
    <div className="template-slider">
      <Swiper {...swiperConfig} className="mySwiper">
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <img 
              src={slide.image} 
              alt={slide.alt}
              className="rounded-[8px] w-full"
              loading="lazy"
              width={800}
              height={600}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default React.memo(TemplateSlider);