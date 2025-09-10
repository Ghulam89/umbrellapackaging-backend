import React from 'react'
import banner from '../../assets/images/main-static-banner.webp'
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';

import Icon1 from '../../assets/images/icon/free quote.svg';
import Icon3 from '../../assets/images/icon/Free Design support.svg';
import Icon2 from '../../assets/images/icon/Free Lamination.svg';
import Icon4 from '../../assets/images/icon/free shipping.svg';
import Icon5 from '../../assets/images/icon/FSC Certified.svg';
import Icon6 from '../../assets/images/icon/Quickest Turnaround.svg';
import { BaseUrl } from '../../utils/BaseUrl';
import PageMetadata from '../../components/common/PageMetadata';

function TermsAndConditions() {
     const [ text]  = useTypewriter({
            words: ['Quality And Innovation.'],
            typeSpeed: 80,
            deleteSpeed: 80,
            loop:{},
        });
    


        const metadata = {
              title: "Terms And Conditions - Umbrella Custom Packaging",
              description: "Get In Touch Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes. Umbrella Custom Packaging facilitates your business by providing innovative styled boxes in extraordinary design. We use the finest paper material and high quality cardboard to ensure perfect Die Cut boxes. You will get guaranteed satisfaction with high quality printing.",
              keywords: "custom packaging, wholesale boxes, packaging solutions, affordable packaging, custom boxes, packaging design, eco-friendly packaging",
              author: "Umbrella Custom Packaging",
              ogUrl: `${BaseUrl}/terms-and-conditions`,
              canonicalUrl: `${BaseUrl}/terms-and-conditions`,
              ogTitle: "Terms And Conditions - Umbrella Custom Packaging",
              ogDescription: "Get In Touch Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes...",
              modifiedTime: "2025-06-13T15:18:43+00:00",
              twitterTitle: "Terms And Conditions - Umbrella Custom Packaging",
              twitterDescription: "Get In Touch Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes...",
              robots: "index, follow"
            };

  return (
    <>
     <PageMetadata {...metadata} />
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
        <p className='text-[#777777] text-[14px]    opacity-70 p-2 mb-4'><b>LEGAL NOTICES </b> <br /> <br />

It is essential that you carefully review these Terms and Conditions, as they control your access to and use of this Site. By using or accessing this Site, you are indicating your agreement to abide by these Terms and Conditions, as well as any other specific guidelines, restrictions, or regulations that may be posted concerning particular sections or services of this Site. These additional guidelines, restrictions, or rules are considered a part of these Terms and Conditions and are, at this moment, incorporated by reference. <br /> <br />

<br /> Please note that Umbrella Custom Packaging may modify this Site and these Terms and Conditions without prior notice. You should review these Terms of Use every time you visit this Site. <br /> <br />

<b> COPYRIGHTS </b> <br /> <br />

All materials and software on the Umbrella Custom Packaging’s website are protected by copyright law, and all rights are reserved under the © 2023 Umbrellapackaging.com. Reproducing or redistributing any of these materials or software is strictly prohibited. <br /> <br />

<b> COPYRIGHTS AND TRADEMARKS</b> <br /> <br />

When creating your Products, you are solely responsible for the Content and any other materials, such as images, graphics, or text, that you use in combination. Unless you have obtained appropriate authorization from the owners, you agree not to include any copyrighted work, trademark, service mark, text, image, or design of any third party in your Products. You also guarantee that your Products do not infringe upon any rights of a third party, including trademark, copyright, the right of publicity, or privacy, and that they will not defame or libel any third party. Furthermore, you confirm that you have obtained all necessary permissions or rights to integrate third-party material into your Products. By placing an order on this Site, you declare that you have the requisite permission, authority, and right to place the order, and you authorize Umbrella Custom Packaging to create the Products on your behalf. <br /> <br />

<b>CUSTOMER CONTENTS</b> <br /> <br />

When creating your Products, you are solely responsible for the Content and any other materials, such as images, graphics, or text, that you use in combination. Unless you have obtained appropriate authorization from the owners, you agree not to include any copyrighted work, trademark, service mark, text, image, or design of any third party in your Products. You also guarantee that your Products do not infringe upon any rights of a third party, including trademark, copyright, the right of publicity, or privacy, and that they will not defame or libel any third party. Furthermore, you confirm that you have obtained all necessary permissions or rights to integrate third-party material into your Products. By placing an order on this Site, you declare that you have the requisite permission, authority, and right to place the order, and you authorize Umbrella Custom Packaging to create the Products on your behalf. <br /> <br />

When creating your Products, it is solely your responsibility to ensure that the Content you use, along with any other materials like images, graphics, or text, is used lawfully. You agree not to include any copyrighted work, trademark, service mark, text, image, or design of any third party in your Products without obtaining appropriate authorization from the owners. You also affirm that your Products do not infringe upon any rights of any third party, including trademark, copyright, the right of publicity, or privacy, and that they will not defame or libel any third party. Additionally, you confirm that you possess all necessary rights or permissions required to incorporate third-party material into your Products. By placing an order on this Site, you guarantee that you possess all the required permissions, rights, and authority to place the order. You authorize Umbrella Custom Packaging to produce the Products on your behalf. <br /> <br />

The person who creates the information, data, text, photographs, graphics, messages, or other materials (“Content”) is solely responsible. As a result, if you send, upload, post, or transmit any Content through the website, you are accountable for it. You agree to comply with all local regulations concerning online conduct and acceptable Content. You also agree not to use the website to upload, post or transmit any Content that is indecent, unlawful, or infringes upon the intellectual property or other proprietary rights of Umbrella Custom Packaging or any third party. Umbrella Custom Packaging does not have control over the Content posted by Customers and does not guarantee its accuracy, integrity, or quality. Umbrella Custom Packaging will not be responsible for any Content that may be offensive, indecent, or objectionable to you in any way. <br /> <br />

You acknowledge that it is your responsibility to safeguard your password and regulate access to your registered account. You also agree to be accountable for any orders placed or other actions taken through your registered account. By using your password to place an order for a print item or by allowing someone else to do so, you grant Umbrella Custom Packaging a worldwide, royalty-free, non-exclusive license to use, reproduce, sublicense, modify, adapt, publish, display, and create derivative works from the Content on the website and the printed product. This license is granted for the purpose of storing designs or processing print orders. <br /> <br />

You recognize that Umbrella Custom Packaging and its representatives have the right (but not the obligation) to remove any Content that infringes the terms of service or may be otherwise unacceptable at their sole discretion. Umbrella Custom Packaging may retain Content and may disclose it if required to do so by law or if such disclosure is necessary to: (a) comply with legal proceedings; (b) enforce the terms of service; (c) react to claims that the Content infringes the rights of third parties; or (d) protect the rights, property, or personal safety of Umbrella Custom Packaging, its users, and the general public. <br /> <br />

<b>DESIGN FILES</b> <br /> <br />

If you require design files with a higher resolution than 72 DPI, please contact <Link className='text-[#5A56E9]' to={"/contact-us"}> www.umbrellapackaging.com/contact/</Link> for a quote. Kindly note that Umbrella Custom Packaging only provides design files at 72 DPI (low resolution). <br /> <br />

<h2 className=' m-0 sm:text-3xl text-xl  opacity-75   font-bold font-sans'>CUSTOMER SUBMITTED ARTWORK</h2> <br />                                
For best results, it is required that all artwork, designs, and images be submitted in CMYK format with a minimum resolution of 300 DPI. Please note that Umbrella Custom Packaging is not liable for any color discrepancies that may arise when converting from RGB to CMYK color modes. Moreover, we cannot be held responsible for any image that appears fuzzy, distorted, or pixelated due to customer-provided artwork. <br /> <br />

<b>PROOFING AND MATCHING</b> <br /> <br />

Once you place a print order, Umbrella Custom Packaging will send you the final artwork proofs and a job specification sheet via email, and it is your responsibility to review and approve them. You must carefully review all details mentioned in the specification sheet, including delivery dates and production speed, and ensure that all your requirements have been accurately noted. Umbrella Custom Packaging will not be held liable for any specifications or requirements beyond what is noted in the final specification sheet. It is also your responsibility to thoroughly review the conclusive artwork proof for any spelling or design issues. Please note that unplanned changes may occur during file preparation, and what is shown on the final proof represents what will be printed. Umbrella Custom Packaging strongly recommends printing the proof at 100% to check the actual position, spelling, and design elements. Umbrella Custom Packaging will not be responsible for any design or spelling issues not identified by you and will communicate to Umbrella Custom Packaging immediately. Upon your approval, the design file and job specifications will be forwarded to the production department and printed as is. <br /> <br />

Umbrella Custom Packaging cannot be held responsible for color matching or ink density on screen proofs approved by customers. While screen proofs can predict design layout, text accuracy, image proportion, and placement, they cannot accurately predict color or density. Umbrella Custom Packaging will make an effort to match the gradient density of each color in a duo-tone. Still, it can only be held responsible for the final appearance of a duo tone if a color match proof is ordered. It is important to note that the application of lamination may affect or change the appearance of printed colors. Umbrella Custom Packaging cannot be held liable for the final color appearance of a laminated product/s. <br /> <br />

<b>MATERIALS</b> <br /> <br />

Please be aware that the paper or card stock used in our printing products is not intended for food contact. If you have any such requirement, please inform us in writing immediately. Please let us know if you have specific food-grade requirements regarding paper stock before placing your order. <br /> <br />

PRIOR TO PRINTING, IT IS THE CUSTOMER’s RESPONSIBILITY TO APPROVE THE PROOF AND LAYOUT. <br />

Umbrella Custom Packaging shall not be held responsible for any errors in the printed product arising from the following: <br /> <br />

Graphics Orientation or Placement and Incorrect Font Usage <br />

Spelling, Grammatical, and Punctuation Errors <br />

Wrong Die cuts, slits, or Incorrect and Missing Folds br'

Finished Product Size <br />

COLOR ACCURACY AND HARDCOPY PROOFS <br />

Umbrella Custom Packaging aims to replicate colors from print-ready files submitted by customers as closely as possible. However, due to limitations in the printing processes and the various properties of printing surfaces, color matching, and density cannot be guaranteed, especially with neighboring image ink requirements. Umbrella Custom Packaging guarantees the accuracy of color reproductions within 90% of the final proof approved by the customer. Customers may order a hardcopy proof for an additional charge to ensure color reproduction accuracy. Please note that Umbrella Custom Packaging cannot be held responsible for any color variations between submitted print-ready images and the artwork or product they represent. <br /> <br />

<b>INDEMNITY</b> <br /> <br />

You acknowledge and agree to indemnify and defend Umbrella Custom Packaging and its licensors, as well as their directors, officers, and employees, against any claims, liability, damages, costs, and expenses, including reasonable legal fees and expenses, arising out of or related to (i) your violation of these Terms and Conditions or (ii) any legal action, claim, or demand arising from or relating to any text, photograph, image, graphics, or other material that you included in Products which were not part of the standard Site Content. <br /> <br />

<b>ORDER CANCELLATION</b> <br /> <br />

If you request cancellation of your order before it is printed or shipped, Umbrella Custom Packaging will accommodate your request. However, if your item has already been shipped, cancellation is impossible. There may be cancellation fees during different stages of production. Our Customer Service Team will communicate any applicable cancellation fees to you. <br />
<ul style={{listStyleType:'circle'}}>
<li>Orders are placed online.</li>
<li>Orders are reworked in our design department. </li>
<li>Orders are sent to the press.</li>
<li>Orders are collected by the shipping firm and shipped.</li>
<li>Before stage 2, all orders can be canceled. If an order is canceled in stage 1, you will incur a charge of $15 plus 5% of the total amount to cover payment processing, bank charges, and our design department fees. For orders cancelled at stage 2, a minimum of 20% of the total order amount will be deducted as cancellation fees to cover our design department charges. After an order enters stage 3, cancellation is still possible but cannot be guaranteed. If the order is cancelled at this stage, a minimum of 50% of the total order amount will be deducted to cover expenses. Once an order enters stage 4, it cannot be canceled. </li>

</ul>
<b>DESIGN ORDER</b> <br /> <br />

Once an order for design services has been placed and confirmed, no refunds will be issued. <br />

<b>RETURNS AND REFUNDS</b> <br /> <br />

Due to the uniqueness of all orders, we do not offer any refunds or credits. However, if we confirm that an error was made on our part, we will proceed to reprint the order. <br /> <br />

<b>RE-PRINTS</b> <br /> <br />

The customer is responsible for reporting any defects, damages, or missing items found in the delivered products to Umbrella Custom Packaging within 3 business days of order delivery. Failure to notify Umbrella Custom Packaging within the specified time frame will result in the company not being liable for any claims for defects, damages, or missing items. <br /> <br />

To obtain replacement products, the customer must first obtain written authorization from Umbrella Custom Packaging for the return of at least 99% of the original product and must do so at their own expense within 10 days of the original delivery date. Umbrella Custom Packaging will not accept any returns that have not been pre-approved in writing. <br /> <br />

Refunds for expedited printing charges (including rush printing or shipping) will not be provided for any reason, including returned orders. No exceptions. <br /> <br />

ORDER SHIPPING AND DELIVERY <br />

When placing an order, you can choose from the following product options offered by Umbrella Custom Packaging. <br /> <br /> <br />

STANDARD (Shipping Time NOT GUARANTEED): <br />
Free Ground Shipping within 48 contiguous states. <br />
Usually Ships within 10 to 14 business days after final proof approval. <br />
Products will be shipped within 8 business days after final proof approval. <br />
EXPRESS – Guaranteed to ship within 6 business days. <br />
In all cases, final proof approval must be received by 11:00 AM EST otherwise one business day will be added to the shipping times. <br />
While Umbrella Custom Packaging aims to process, print, and ship orders promptly, the company cannot be held responsible for any damages or consequences arising from the delay in the production, shipping, or delivery of the ordered products. <br /> <br />

Customers of Umbrella Custom Packaging acknowledge that the company cannot be held responsible for any shipment delays due to external factors beyond their control, such as technical issues, weather conditions, shipping company delays, international customs issues, or any other circumstances beyond their direct control. The estimated shipment and delivery dates provided by the company are based on information from their suppliers and order history. <br /> <br />

Although Umbrella Custom Packaging will endeavor to meet delivery schedules, unexpected technical issues, equipment failure, or malfunction may cause delays in the printing or shipping processes. In such cases, Umbrella Custom Packaging may refund or waive rush charges or expedite fees where applicable. Still, orders cannot be canceled due to delays in the printing or shipping processes. <br /> <br />

Customers of Umbrella Custom Packaging are obligated to pay all customs duties and fees for goods shipped to their designated locations. Customers are responsible for arranging customs clearance for shipments delivered outside the United States. <br /> <br />

At Umbrella Custom Packaging, we understand that our customers are concerned with the quality and pricing of their orders. We strive to offer the best possible quality at competitive prices. To ensure we meet the needs of our customers, we have production facilities located worldwide. We have a particular focus on South Asia, where we have established quality production houses that provide competitive pricing. We aim to make the entire process seamless for our customers, so we handle the shipping to your doorstep without additional charges. <br /> <br />

<b>HOLIDAYS</b> <br /> <br />

New Year’s Day (January 1st) <br />
Martin Luther King Day <br /> 
President Day <br />
Memorial Day <br />
Independence Day (July 4th) <br />
Labor Day <br />
Columbus Day <br />
Veterans Day <br />
Thanks, Giving Day <br />
Christmas Eve (December 24th) <br />
Christmas Day (December 25th) <br />
<b>DAMAGED AND LOST PACKAGES</b> <br /> <br />

The customers are responsible for inspecting all packages for any visible signs of damage or missing items before accepting delivery. Customers should compare the items received with the packaging slips or invoices enclosed in the package. If any damage or missing items are noticed, customers should immediately notify Umbrella Custom Packaging and the delivery courier. Failure to file a claim within 3 business days of order delivery may result in Umbrella Custom Packaging not be responsible for any damage or missing items. Additionally, 3rd party shipping errors, omissions, or damaged shipments are not the responsibility of Umbrella Custom Packaging. <br /> <br />

Extra complimentary pieces are usually shipped with each ordered product without additional charges. Occasionally, the shipment may contain slightly fewer pieces than the ordered quantity. <br /> <br />

Packages that need to be reshipped because of the incorrect shipping address provided by the customer will incur additional shipping and handling charges. <br /> <br />

<b>DISCLAIMER OF WARRANTY</b> <br /> <br />

The website and its content are provided on an “as is” basis, without any warranty, whether expressed or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. You acknowledge that the website’s operation may be interrupted or contain errors. The website may contain references and links to products or services offered by independent companies, and these references and links are provided without any warranty, whether expressed or implied. <br /> <br />

<b>LIMITATION OF LIABILITY</b> <br /> <br />

Umbrella Custom Packaging, its licensors, suppliers, or vendors, as well as their officers, directors, employees, or agents, shall not be liable for any special, incidental, indirect, or consequential damages of any kind or for any damages whatsoever resulting from loss of use, data, or profits, regardless of whether or not Umbrella Custom Packaging has been advised of the possibility of such damages. This includes damages arising from or in connection with the site’s use or performance or failure to provide products or services that you order from Umbrella Custom Packaging or its affiliates. Such damages may arise from mistakes, omissions, viruses, delays, or service interruptions. Umbrella Custom Packaging shall not be liable or responsible for any damages or consequences arising from or related to your inappropriate or unauthorized use of this site or its content.</p>
    </div>
</div>
    </>
    
  )
}

export default TermsAndConditions
