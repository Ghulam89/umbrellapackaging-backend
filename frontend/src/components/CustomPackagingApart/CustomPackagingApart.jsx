import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import icon1 from '../../assets/images/icon/Free Design support.svg';
import icon2 from '../../assets/images/icon/Free Lamination.svg';
import icon3 from '../../assets/images/icon/free quote.svg';
const CustomPackagingApart = () => {

    const data  = [
        {
            id:1,
            icon:icon1,
            title:'No Minimum Order Qty',
            description:'Order as few as one custom unit to get started, with no minimum order quantity requirements.'

        },
         {
            id:2,
            icon:icon2,
            title:'Free Design',
            description:'Avail professional design services without any added fees, ensuring your vision comes to life.'

        },
        {
            id:3,
            icon:icon2,
            title:'Quickest Turnaround',
            description:'Avail professional design services without any added fees, ensuring your vision comes to life.'

        },
        {
            id:3,
            icon:icon2,
            title:'Cheapest Prices',
            description:'Benefit from our regular discounted rates and get the best custom packaging at the lowest prices.'

        },
        {
            id:4,
            icon:icon2,
            title:'Fee Shipping',
            description:'Enjoy free shipping services for stock and custom orders of packaging boxes at Umbrella Packaging.'

        },

        {
            id:3,
            icon:icon2,
            title:'Quickest Turnaround',
            description:'Avail professional design services without any added fees, ensuring your vision comes to life.'

        },


    ]
  return (
    <>
     <div className="sm:max-w-6xl  my-6  max-w-[95%] mx-auto">
     <div className="text-center pb-3">
     <h1 className="text-[#333333] pb-3.5 font-semibold">
     Your Packaging Partner: What Sets Umbrella Custom Packaging Apart


        </h1>
        <div className='rounded-lg p-3 h-56 flex justify-center items-center bg-[#eff4fe]'>
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        speed={2000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        loop={true}
        // pagination={{
        //   clickable: true,
        // }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {data?.map((item) => (
            <SwiperSlide key={item.id}>
                <div className="text-center">
                <img src={item.icon} alt=""  width={60} className=' mx-auto' />
                <h5 className=" font-semibold">{item.title}</h5>
                <p className=" m-0 text-sm">
                    {item.description}
                </p>
                </div>
            </SwiperSlide>
        ))}
      </Swiper>
        </div>
     
     </div>
     </div>
      
    </>
  );
};

export default CustomPackagingApart;