import React from 'react'
import banner from '../../assets/images/main-static-banner.webp'
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import Button from '../../components/common/Button';
import Icon1 from '../../assets/images/icon/free quote.svg';
import Icon3 from '../../assets/images/icon/Free Design support.svg';
import Icon2 from '../../assets/images/icon/Free Lamination.svg';
import Icon4 from '../../assets/images/icon/free shipping.svg';
import Icon5 from '../../assets/images/icon/FSC Certified.svg';
import Icon6 from '../../assets/images/icon/Quickest Turnaround.svg';
function ShippingPolicy() {
    const [ text]  = useTypewriter({
            words: ['Quality And Innovation.'],
            typeSpeed: 80,
            deleteSpeed: 80,
            loop:{},
        });
  return (
     <div className='max-w-[1200px] mx-auto'>
                  <div className='grid md:grid-cols-2 grid-cols-1 bg-[#d2e0FB59] rounded-[8px] p-5 mt-10 gap-6 md:gap-0'>
  <div className='flex flex-col justify-center gap-6 md:gap-10'>
    <div>
      <h1 className=' font-semibold m-0 font-sans leading-10 sm:text-4xl text-3xl  capitalize'>
        We committed to <br/>
        <h2 className='text-[#5A56E9] sm:text-4xl text-2xl font-sans font-semibold leading-10 capitalize'>
          {text} <Cursor cursorStyle='|' />
        </h2>
      </h1>
    </div>
    
    <p className='text-[#777777] text-sm md:text-base text-left'>
      Various Custom Packaging Styles With Perfect Solutions.
    </p>
    
    <ul className='grid grid-cols-3 gap-4 md:gap-0'>
      <li className='flex flex-col md:flex-row items-center text-[#777777] font-light text-xs md:text-sm lg:text-base capitalize gap-2 md:border-r md:mr-3'>  
        <svg width={30} height={30} fill='#5552E7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 77.39">
          <path d="M2.52,71.63H15.11a2.19,2.19,0,0,1-1.63-2.1V18a2.18,2.18,0,0,1,2.18-2.17h13.8l-.89,3.58H17.37V68.91h87.86V19.4h-11l-1-3.58h13.46A2.17,2.17,0,0,1,108.82,18V69.52a2.17,2.17,0,0,1-1.63,2.1h13.17c3.36,0,3.36,5.77,0,5.77H2.52c-3.36,0-3.36-5.76,0-5.76ZM57.71,0h8.58a1.15,1.15,0,0,1,1.15,1.15V4H81a4.57,4.57,0,0,1,1.1-1.75h0a4.64,4.64,0,0,1,6.58,0h0a4.64,4.64,0,0,1,0,6.58h0a4.64,4.64,0,0,1-6.58,0h0A4.61,4.61,0,0,1,81,7H74a25.23,25.23,0,0,1,6.06,4.89A27.14,27.14,0,0,1,86.72,25.7H88.6A1.37,1.37,0,0,1,90,27.08v6.29a1.37,1.37,0,0,1-1.37,1.38H82.38A1.38,1.38,0,0,1,81,33.37V27.08a1.38,1.38,0,0,1,1.38-1.38h1.44a24.26,24.26,0,0,0-5.88-11.85,22.1,22.1,0,0,0-10.5-6.47V9.83A1.15,1.15,0,0,1,66.29,11H57.71a1.14,1.14,0,0,1-1.15-1.15V7.38a22,22,0,0,0-10.7,6.74A24.57,24.57,0,0,0,40.21,25.7h1.41A1.38,1.38,0,0,1,43,27.08v6.29a1.38,1.38,0,0,1-1.38,1.38H35.4A1.38,1.38,0,0,1,34,33.37V27.08A1.38,1.38,0,0,1,35.4,25.7h1.91a27.42,27.42,0,0,1,6.42-13.47A25.13,25.13,0,0,1,50,7H41.91a4.53,4.53,0,0,1-1.1,1.74h0a4.63,4.63,0,0,1-3.29,1.37,4.7,4.7,0,0,1-3.3-1.37h0a4.64,4.64,0,0,1,0-6.58h0a4.64,4.64,0,0,1,6.58,0h0A4.57,4.57,0,0,1,41.91,4H56.56V1.15A1.14,1.14,0,0,1,57.71,0ZM74.66,40.74,70.21,52.12,53.8,51.91,49.26,40.74c3.9-7,7.87-15.49,9.91-23l2.16.24L61.25,38.1a2.12,2.12,0,1,0,1.29-.05l.06-19.91L65.08,18c1.81,7.51,5.74,16,9.58,22.71ZM69.82,57H53.88V53.82H69.82V57ZM57.87,72.58H65c1.61,0,1.61,3.13,0,3.13H57.87c-1.61,0-1.62-3.13,0-3.13Z"/>
        </svg>
        Free Design
      </li>
      
      <li className='flex flex-col md:flex-row items-center text-[#777777] text-xs md:text-sm lg:text-base capitalize gap-2 md:border-r md:mr-3'>  
        <svg width={30} height={30} fill='#5552E7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 289.28">
          <path d="M429.38 196.01c-25.83 0-46.64 20.95-46.64 46.63 0 25.83 20.95 46.64 46.64 46.64 25.83 0 46.63-20.95 46.63-46.64 0-25.82-20.95-46.63-46.63-46.63zm-382.92-26.2v-37.57h15.66c6.3 0 10.63 1.44 12.98 4.33 2.35 2.88 3.53 7.7 3.53 14.46 0 6.75-1.18 11.57-3.53 14.45-2.35 2.89-6.68 4.33-12.98 4.33H46.46zm15.83-27.95h-4.64v18.33h4.64c1.53 0 2.64-.19 3.33-.57.69-.38 1.04-1.25 1.04-2.61v-11.97c0-1.36-.35-2.23-1.04-2.61-.69-.38-1.8-.57-3.33-.57zm43.47 13.76H94.57v4.57h13.7v9.62H83.38v-37.57h24.61l-1.4 9.62H94.57v5.05h11.19v8.71zm30.48 14.19h-22.37v-37.57h11.18v27.95h11.19v9.62zm3.92 0v-37.57h11.18v37.57h-11.18zm36.69-37.57h11.8l-8.67 37.57h-16.33l-8.67-37.57h11.8l4.76 23.86h.5l4.81-23.86zm37.82 23.38h-11.19v4.57h13.7v9.62h-24.89v-37.57h24.61l-1.4 9.62h-12.02v5.05h11.19v8.71zm38.59 14.19h-12.31l-4.58-11.18h-2.41v11.18h-11.18v-37.57h17.62c8.01 0 12.02 4.39 12.02 13.17 0 6.01-1.73 9.97-5.2 11.9l6.04 12.5zm-19.3-27.95v7.51h2.58c1.34 0 2.32-.15 2.93-.45.62-.3.93-.99.93-2.07v-2.47c0-1.08-.31-1.77-.93-2.07-.61-.3-1.59-.45-2.93-.45h-2.58zm33.62-9.62l3.08 13.23h.39l3.13-13.23h12.37l-10.08 27.35v10.22h-11.18v-10.22l-10.07-27.35h12.36zM101.82 88.72H85.16v22.73h-19.6V50.2h40.18l-2.45 15.68H85.16v8.23h16.66v14.61zm63.21 22.73h-21.56l-8.04-18.23h-4.21v18.23h-19.6V50.2h30.87c14.04 0 21.07 7.16 21.07 21.46 0 9.8-3.04 16.27-9.12 19.41l10.59 20.38zm-33.81-45.57v12.25h4.5c2.36 0 4.07-.24 5.15-.73s1.62-1.62 1.62-3.38V70c0-1.77-.54-2.9-1.62-3.38-1.08-.49-2.79-.74-5.15-.74h-4.5zm79.87 22.44h-19.6v7.45h24.01v15.68h-43.61V50.2h43.12l-2.45 15.68h-21.07v8.23h19.6v14.21zm51.94 0h-19.6v7.45h24.01v15.68h-43.61V50.2h43.12l-2.45 15.68h-21.07v8.23h19.6v14.21zm136.5-15.43l-70.02-.42v-42.7c0-8.97-.6-15.44-7.46-22.31C317.46 2.87 311.14 0 304.11 0H25.25C18.22 0 11.91 2.87 7.32 7.46-.19 14.97 0 21.18 0 30.15v198.72c0 6.89 2.87 13.49 7.46 18.22 4.59 4.74 10.91 7.75 17.94 7.75h94.26c3.88 0 6.89-3.16 6.89-6.89 0-3.87-3.16-6.88-6.89-6.88l-94.26.14c-3.16 0-5.88-1.44-8.04-3.59-2.15-2.29-3.58-5.45-3.58-8.75V23.58c.39-2.47 1.56-4.74 3.3-6.36 2.15-2.15 5.02-3.44 8.17-3.44h278.86c3.16 0 6.03 1.29 8.18 3.44 4.05 4.06 3.44 8.14 3.44 13.28v210.57h-54.3c-3.87 0-6.89 3.01-6.89 6.88 0 3.73 3.02 6.89 6.89 6.89h61.19c3.87 0 6.89-3.01 6.89-6.89v-7.89h41.61c3.16-71.74 106.04-81.64 116.51 0h22.68c2.99-15.9 1.87-34.53-2.27-54.98-4.84-23.9-3.42-19.26-25.73-27.81l-45.51-20.38-37.27-64zm-17.94 19.66l-34.72-.43v44.77h58.26l-23.54-44.34zm-191.9 103.46c-25.83 0-46.64 20.95-46.64 46.63 0 25.83 20.95 46.64 46.64 46.64 25.83 0 46.63-20.95 46.63-46.64 0-25.82-20.95-46.63-46.63-46.63zm0 28.7c-9.9 0-17.94 8.03-17.94 17.93 0 9.91 8.04 17.94 17.94 17.94 9.9 0 17.93-8.03 17.93-17.94 0-9.9-8.03-17.93-17.93-17.93zm239.69 0c-9.9 0-17.94 8.03-17.94 17.93 0 9.91 8.04 17.94 17.94 17.94 9.9 0 17.93-8.03 17.93-17.94 0-9.9-8.03-17.93-17.93-17.93z"/>
        </svg>
        Free Shipping
      </li>
      
      <li className='flex flex-col md:flex-row items-center text-[#777777] text-xs md:text-sm lg:text-base capitalize gap-2'>  
        <svg width={30} height={30} fill='#5552E7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 452 512.11">
          <path d="M336.47 255.21h64.36v-12.46c-3.68-13.63-9.54-22.87-17.13-28.49-7.59-5.61-17.43-8.01-28.98-7.93l-263.96.06c-6.5 0-11.76-5.27-11.76-11.76 0-6.5 5.26-11.76 11.76-11.76l263.65.03c16.59-.16 31.23 3.62 43.25 12.53 1.08.8 2.14 1.64 3.17 2.52v-7.07c0-10.98-4.53-21.02-11.82-28.31-7.23-7.29-17.25-11.8-28.29-11.8h-8.49l-1.09-.05-4.15 15.56h-28.52l16.92-63.47c-14.22-3.8-22.7-18.5-18.89-32.72l-94.11-25.21c-3.81 14.21-18.5 22.71-32.7 18.9l-27.63 102.5h-29.41L177.4 0l199.7 53.51-19.69 73.73h3.31c17.45 0 33.36 7.19 44.9 18.72 11.56 11.51 18.73 27.45 18.73 44.92v64.99c6.79 1.35 12.86 4.71 17.57 9.42 6.21 6.21 10.08 14.81 10.08 24.28v77.35c0 9.87-4.04 18.85-10.52 25.32-4.63 4.63-10.53 8.02-17.13 9.57v46.66c0 17.46-7.18 33.39-18.72 44.93l-.74.68c-11.5 11.13-27.11 18.03-44.17 18.03H63.63c-17.47 0-33.4-7.17-44.94-18.7C7.17 481.89 0 465.98 0 448.47V190.88c0-17.52 7.16-33.43 18.68-44.95 11.52-11.52 27.44-18.69 44.95-18.69h37.12l.16.01L130.46 17.5l28.19 7.55-38.73 141.23H90.4l4.18-15.51H63.63c-11.01 0-21.04 4.52-28.32 11.79-7.27 7.27-11.79 17.31-11.79 28.32v257.59c0 11.01 4.53 21.03 11.81 28.3 7.28 7.29 17.32 11.82 28.3 11.82h297.09c10.73 0 20.54-4.3 27.74-11.25l.54-.58c7.29-7.28 11.83-17.32 11.83-28.29v-45.71h-64.36c-19.88 0-37.96-8.14-51.02-21.2l-1.23-1.35c-12.36-13-19.98-30.52-19.98-49.68v-3.1c0-19.79 8.13-37.83 21.21-50.94l.13-.13c13.1-13.05 31.12-21.15 50.89-21.15zm-95.71-93.06c17.19 4.6 34.89-5.6 39.49-22.8 4.61-17.19-5.61-34.89-22.8-39.49-17.2-4.6-34.9 5.6-39.5 22.8-4.6 17.19 5.62 34.88 22.81 39.49zM362.3 309.07l.06.05c10.93 10.96 10.9 28.79-.02 39.74l-.05.06c-10.96 10.93-28.79 10.9-39.75-.02l-.05-.05c-10.93-10.96-10.9-28.79.02-39.75l.05-.05c10.96-10.93 28.79-10.91 39.74.02z"/>
        </svg>
        Cheapest
      </li>
    </ul>
    
    <div className='mt-4 md:mt-0'>
      <Button label="Get Instant Quote" className='bg-[#4440E6] text-white md:w-72 w-auto' />
    </div>
  </div>
  
  <div className='flex justify-center md:justify-end'>
    <img 
      src={banner} 
      alt="main-banner" 
      className='max-w-full h-auto object-contain'
    />
  </div>
</div>

<div className="bg-[#B8B6FA99] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-8 py-2.5 sm:px-5 px-3 rounded-md w-full">
  <div className="flex gap-1 justify-start items-center">
    <img src={Icon1} width={40} alt="Free Quote" />
    <strong className="text-[15px]  font-light  opacity-80">Free Quote</strong>
  </div>
  <div className="flex justify-start gap-1 items-center">
    <img src={Icon3} width={40} alt="Free Design support" />
    <strong className="text-[15px] sm:whitespace-nowrap whitespace-pre-wrap text-[#111111] font-light  opacity-80">Free Design support</strong>
  </div>
  <div className="flex justify-center  gap-1 items-center">
    <img src={Icon2} width={40} alt="Free Lamination" />
    <strong className="text-[15px] font-light  opacity-80">Free Lamination</strong>
  </div>
  <div className="flex justify-center gap-1 items-center">
    <img src={Icon4} width={40} alt="Free Shipping" />
    <strong className="text-[15px] font-light  opacity-80">Free Shipping</strong>
  </div>
  <div className="flex justify-center gap-1 items-center">
    <img src={Icon5} width={40} alt="FSC Certified" />
    <strong className="text-[15px] font-light  opacity-80">FSC Certified</strong>
  </div>
  <div className="flex  justify-start gap-1 items-center">
    <img src={Icon6} width={40} alt="Quickest Turnaround" />
    <strong className="text-[15px] font-light sm:whitespace-nowrap  opacity-80 whitespace-pre-wrap text-[#111111] ">Quickest Turnaround</strong>
  </div>
</div>
                <div>
    <p className='text-[#777777] opacity-75 text-[14px] p-2'>
        <b>ORDER SHIPPING AND DELIVERY</b> <br /> <br />
        
        When placing an order, you can choose from the following product options offered by Umbrella Custom Packaging. <br /> <br />
        
        <b>STANDARD (Shipping Time NOT GUARANTEED):</b> <br /> <br />
        
        <ul>
            <li>Free Ground Shipping within 48 contiguous states.</li>
            <li>Usually Ships within <b>10 to 14 business days</b> after final proof approval.</li>
            <li>Products will be shipped within <b>8 business days</b> after final proof approval.</li>
        </ul> <br />
        
        <b>EXPRESS</b> – Guaranteed to ship within <b>6 business days</b> <br /> <br />
        
        In all cases, final proof approval must be received by <b>11:00 AM EST</b>, otherwise one business day will be added to the shipping times. <br /> <br />

        While Umbrella Custom Packaging aims to process, print, and ship orders promptly, the company cannot be held responsible for any damages or consequences arising from delays in the production, shipping, or delivery of the ordered products. <br /> <br />

        Customers of Umbrella Custom Packaging acknowledge that the company cannot be held responsible for any shipment delays due to external factors beyond their control, such as technical issues, weather conditions, shipping company delays, international customs issues, or any other circumstances beyond their direct control. The estimated shipment and delivery dates provided by the company are based on information from their suppliers and order history. <br /> <br />

        Although Umbrella Custom Packaging will endeavor to meet delivery schedules, unexpected technical issues, equipment failure, or malfunction may cause delays in the printing or shipping processes. In such cases, Umbrella Custom Packaging may refund or waive rush charges or expedite fees where applicable. Still, orders cannot be canceled due to delays in the printing or shipping processes. <br /> <br />

        Customers of Umbrella Custom Packaging are obligated to pay all customs duties and fees for goods shipped to their designated locations. Customers are responsible for arranging customs clearance for shipments delivered outside the United States. <br /> <br />

        At Umbrella Custom Packaging, we understand that our customers are concerned with the quality and pricing of their orders. We strive to offer the best possible quality at competitive prices. To ensure we meet the needs of our customers, we have production facilities located worldwide. We have a particular focus on South Asia, where we have established quality production houses that provide competitive pricing. We aim to make the entire process seamless for our customers, so we handle the shipping to your doorstep without additional charges. <br /> <br />

        <b>HOLIDAYS</b> <br /> <br />

        <ul>
            <li>New Year’s Day (January 1st)</li>
            <li>Martin Luther King Day</li>
            <li>President Day</li>
            <li>Memorial Day</li>
            <li>Independence Day (July 4th)</li>
            <li>Labor Day</li>
            <li>Columbus Day</li>
            <li>Veterans Day</li>
            <li>Thanksgiving Day</li>
            <li>Christmas Eve (December 24th)</li>
            <li>Christmas Day (December 25th)</li>
        </ul> <br />

        <b>DAMAGED AND LOST PACKAGES</b> <br /> <br />

        Customers are responsible for inspecting all packages for any visible signs of damage or missing items before accepting delivery. Customers should compare the items received with the packaging slips or invoices enclosed in the package. If any damage or missing items are noticed, customers should immediately notify Umbrella Custom Packaging and the delivery courier. Failure to file a claim within <b>3 business days</b> of order delivery may result in Umbrella Custom Packaging not being responsible for any damage or missing items. Additionally, 3rd party shipping errors, omissions, or damaged shipments are not the responsibility of Umbrella Custom Packaging. <br /> <br />

        Extra complimentary pieces are usually shipped with each ordered product without additional charges. Occasionally, the shipment may contain slightly fewer pieces than the ordered quantity. <br /> <br />

        Packages that need to be reshipped because of the incorrect shipping address provided by the customer will incur additional shipping and handling charges. <br /> <br />
    </p>
</div>

    
    
    
    
            </div>
  )
}

export default ShippingPolicy
