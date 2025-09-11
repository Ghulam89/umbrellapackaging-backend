import React from 'react'
import p1  from '../../assets/images/p-1.webp'
import p2  from '../../assets/images/p-2.webp'
import PortfolioCard from './PortfolioCard'
import p3 from '../../assets/images/p-3.webp'
import p4 from '../../assets/images/p-4.webp'
import p5 from '../../assets/images/p-5.webp'
import p6 from '../../assets/images/p6.webp'
import p7 from '../../assets/images/p7.webp'
import p8 from '../../assets/images/p8.webp'
import p9 from '../../assets/images/p9.webp'
import p10 from '../../assets/images/p10.webp'
import p11 from '../../assets/images/p11.webp'
import p12 from '../../assets/images/p12.webp'
import p13 from '../../assets/images/p13.webp'
import p14 from '../../assets/images/p14.webp'
import p15 from '../../assets/images/p15.webp'
import p16 from '../../assets/images/p16.webp'
import p17 from '../../assets/images/p17.webp'
import p18 from '../../assets/images/p18.webp'
import p19 from '../../assets/images/p19.webp'
import p20 from '../../assets/images/p20.webp'
import p21 from '../../assets/images/p21.webp'
import p22 from '../../assets/images/p22.webp'
import p23 from '../../assets/images/p23.webp'
import p24 from '../../assets/images/p24.webp'
import p25 from '../../assets/images/p25.webp'
import p26 from '../../assets/images/p26.webp'
import p27 from '../../assets/images/p27.webp'
import p28 from '../../assets/images/p28.webp'
import p29 from '../../assets/images/p29.webp'
import p30 from '../../assets/images/p30.webp'
import p31 from '../../assets/images/p31.webp'
import p32 from '../../assets/images/p32.webp'
import p33 from '../../assets/images/p33.webp'
import { BaseUrl } from '../../utils/BaseUrl'
import PageMetadata from '../../components/common/PageMetadata'

function Portfolio() {

    const portfolioData = [
        {img1:p1,img2:p2 },
        {img1:p3,img2:p3},
        {img1:p4,img2:p5 },
        {img1:p6,img2:p7},
        {img1:p8,img2:p9},
        {img1:p10,img2:p11},
        {img1:p12,img2:p13},
        {img1:p14,img2:p15},
        {img1:p16,img2:p17},
        {img1:p18,img2:p19},
        {img1:p20,img2:p21},
        {img1:p22,img2:p23},
        {img1:p24,img2:p25},
        {img1:p26,img2:p27},
        {img1:p28,img2:p29},
        {img1:p30,img2:p31},
        {img1:p32,img2:p33},

        
    ]


     const metadata = {
        title: "Portfolio - Umbrella Custom Packaging",
        description: "Our Portfolio Our portfolio highlights a range of custom packaging solutions, designed to protect, promote, and enhance your products with style.",
        keywords: "custom packaging, wholesale boxes, packaging solutions, affordable packaging, custom boxes, packaging design, eco-friendly packaging",
        author: "Umbrella Custom Packaging",
        ogUrl: `${BaseUrl}/portfolio`,
         canonicalUrl: `${BaseUrl}/portfolio`,
        ogTitle: "Portfolio - Umbrella Custom Packaging",
        ogDescription: "Our Portfolio Our portfolio highlights a range of custom packaging solutions, designed to protect, promote, and enhance your products with style.",
        modifiedTime: "2025-06-13T15:18:43+00:00",
        twitterTitle: "Portfolio - Umbrella Custom Packaging",
        twitterDescription: "Our Portfolio Our portfolio highlights a range of custom packaging solutions, designed to protect, promote, and enhance your products with style.",
        robots: "index, follow"
      };
    

  return (
    <>
    
      <PageMetadata {...metadata} />
      <div className='max-w-[1200px] mx-auto mt-10'>

        <div className='bg-[#2E2D2D] rounded-[8px] p-5 h-[230px] flex flex-col justify-center items-center space-y-5 m-2'>
        <h1 style={{color:'white'}} className='md:text-[43px] flex gap-2 items-center text-[30px] text-white font-semibold leading-10 text-center'>Our
        <h1 style={{color:'#ff931e'}} className='md:text-[43px] text-[30px] text-[#ff931e]'> Portfolio</h1></h1>
        <h5 className='text-white text-[17px] capitalize text-center'>
        Our portfolio highlights a range of custom packaging solutions, designed to protect, promote, and enhance your products with style.
        </h5>


        </div>
        <div className='grid md:grid-cols-3 grid-cols-2 gap-5 m-2'>
            {portfolioData.map((data,index)=>{
                return <PortfolioCard img1={data.img1} img2={data.img2}/>
            })}

        </div>
      
      
    </div>
    </>
    
  )
}

export default Portfolio
