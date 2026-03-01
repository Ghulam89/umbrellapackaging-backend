import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Icon10, Icon11, Icon12, Icon7, Icon8, Icon9 } from '../../assets';

const CustomPackagingApart = () => {
  const [slidesToShow, setSlidesToShow] = useState(1);
  const sliderRef = useRef(null);
  const animationRef = useRef(null);
  const isPausedRef = useRef(false);
  const translateXRef = useRef(0);
  const containerWidthRef = useRef(0);

  const data = useMemo(() => [
    {
      id: 1,
      icon: Icon7,
      title: 'No Die & Plate Charges',
      description: 'Enjoy the benefit of no additional costs for die and plate setups on your custom orders.'
    },
    {
      id: 2,
      icon: Icon8,
      title: 'No Minimum Order Qty',
      description: 'Order as few or as many items as you need without any minimum quantity restrictions.'
    },
    {
      id: 3,
      icon: Icon9,
      title: 'Free Design',
      description: 'Avail professional design services without any added fees, ensuring your vision comes to life.'
    },
    {
      id: 4,
      icon: Icon10,
      title: 'Quickest Turnaround',
      description: 'Get your orders processed and delivered promptly, ensuring the fastest turnaround time possible.'
    },
    {
      id: 5,
      icon: Icon11,
      title: 'Cheapest Prices',
      description: 'Benefit from our regular discounted rates and get the best custom packaging at the lowest prices.'
    },
    {
      id: 6,
      icon: Icon12,
      title: 'Free Shipping',
      description: 'Enjoy the added perk of free shipping on your orders, making it even more cost-effective for you.'
    }
  ], []);

  // Duplicate data for seamless infinite loop
  const infiniteData = useMemo(() => [...data, ...data, ...data], [data]);

  // Calculate slides to show based on screen size
  useEffect(() => {
    let ticking = false;
    const updateMetrics = () => {
      const apply = () => {
        const width = window.innerWidth;
        if (width >= 1024) {
          setSlidesToShow(4);
        } else if (width >= 768) {
          setSlidesToShow(3);
        } else if (width >= 640) {
          setSlidesToShow(2);
        } else {
          setSlidesToShow(1);
        }
        if (sliderRef.current?.parentElement) {
          containerWidthRef.current = sliderRef.current.parentElement.offsetWidth || 0;
        }
        ticking = false;
      };
      if (!ticking) {
        requestAnimationFrame(apply);
        ticking = true;
      }
    };

    updateMetrics();
    window.addEventListener('resize', updateMetrics, { passive: true });
    return () => window.removeEventListener('resize', updateMetrics);
  }, []);

  // Continuous smooth scrolling animation
  useEffect(() => {
    const animate = () => {
      if (!sliderRef.current || isPausedRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const containerWidth = containerWidthRef.current || 0;
      if (containerWidth === 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const gap = slidesToShow === 4 ? 40 : slidesToShow === 3 ? 30 : slidesToShow === 2 ? 20 : 8;
      const slideWidth = (containerWidth - (slidesToShow - 1) * gap - 24) / slidesToShow;
      const slideDistance = slideWidth + gap;
      const totalWidth = data.length * slideDistance;

      // Move continuously - smooth scrolling without delay
      translateXRef.current -= 1; // Adjust speed here (lower = slower, higher = faster)

      // Reset position when we've scrolled one full set for seamless infinite loop
      if (Math.abs(translateXRef.current) >= totalWidth) {
        translateXRef.current += totalWidth;
      }

      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(${translateXRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [data.length, slidesToShow]);

  // Pause on hover
  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
  };

  // Calculate slide width for rendering
  const getSlideWidth = () => {
    const containerWidth = containerWidthRef.current;
    if (!containerWidth) return 'auto';
    const gap = slidesToShow === 4 ? 40 : slidesToShow === 3 ? 30 : slidesToShow === 2 ? 20 : 8;
    return (containerWidth - (slidesToShow - 1) * gap - 24) / slidesToShow;
  };

  return (
    <div className="sm:max-w-6xl my-6 max-w-[95%] mx-auto">
      <div className="text-center pb-3">
        <h2 className="sm:text-[35px] text-[25px] pb-3 font-sans font-[600] text-[#333333]">
          Your Packaging Partner: What Sets Umbrella Custom Packaging Apart
        </h2>
        
        <div 
          className='rounded-lg p-3 h-64 bg-[#eff4fe] overflow-hidden relative'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            ref={sliderRef}
            className="flex"
            style={{
              gap: slidesToShow === 4 ? '40px' : slidesToShow === 3 ? '30px' : slidesToShow === 2 ? '20px' : '8px',
            }}
          >
            {infiniteData.map((item, index) => {
              const slideWidth = getSlideWidth();
              
              return (
                <div 
                  key={`${item.id}-${index}`}
                  className="flex-shrink-0 text-center px-2"
                  style={{
                    width: typeof slideWidth === 'number' ? `${slideWidth}px` : 'auto',
                    minWidth: typeof slideWidth === 'number' ? `${slideWidth}px` : 'auto',
                  }}
                >
                  <img 
                    src={item.icon} 
                    alt={item.title}
                    width={80} 
                    height={80}
                    className='mx-auto transition-transform duration-300 hover:scale-110'
                    loading="lazy"
                  />
                  <strong className="font-[600] text-[#111111] block mt-2 text-sm sm:text-base">
                    {item.title}
                  </strong>
                  <p className="m-0 text-[14px] sm:text-[16px] mt-1 text-gray-700">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CustomPackagingApart);
