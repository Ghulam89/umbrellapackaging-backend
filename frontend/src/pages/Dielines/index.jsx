import React, { useState } from 'react';
import video from '../../assets/videos/dieline-video.mp4';
import dieImg1 from '../../assets/images/dielines/Auto-lock-Boxes.webp';
import dieImg2 from '../../assets/images/dielines/Bakery-Boxes_.webp';
import dieImg3 from '../../assets/images/dielines/Bookend-Boxes_-1.webp';
import dieImg4 from '../../assets/images/dielines/Burger-Boxes_-1.webp';
import dieImg5 from '../../assets/images/dielines/Child-Resistant.webp';
import dieImg7 from '../../assets/images/dielines/Face-Mask-Boxes-1-1.webp';
import dieImg8 from '../../assets/images/dielines/Gable-Boxes_-1.webp';
import dieImg9 from '../../assets/images/dielines/Gloves-Boxes_.webp';
import dieImg10 from '../../assets/images/dielines/Heart-Shaped-Boxes-2-1.webp';
import dieImg11 from '../../assets/images/dielines/Tuck-End-Boxes-3.webp';
import dieImg12 from '../../assets/images/dielines/Window-Boxes-1.webp';
import Button from '../../components/common/Button';
import SpecialPackaging from '../../components/SpecialPackaging/SpecialPackaging';
import InstantQuoteModal from '../../components/common/InstantQuoteModal';
import { BaseUrl } from '../../utils/BaseUrl';
import PageMetadata from '../../components/common/PageMetadata';
import { CustomCupsImage } from '../../assets';

const categories = [
  { title: 'Auto lock Boxes',img:dieImg1},
  { title: 'Bakery Boxes',img:dieImg2},
  { title: 'Bookend Boxes',img:dieImg3 },
  { title: 'Burger Boxes',img:dieImg4},
  { title: 'Child Resistant',img:dieImg5},
  { title: 'Custom Cups',img:CustomCupsImage},
  { title: 'Face Mask Boxes',img:dieImg7},
  { title: 'Gable Boxes',img:dieImg8},
  { title: 'Gloves Boxes',img:dieImg9},
  { title: 'Heart Shaped Boxes',img:dieImg10},
  { title: 'Tuck End Boxes',img:dieImg11},
  { title: 'Window Boxes',img:dieImg12},
];

function Dielines() {


   const metadata = {
      title: "dielines - Umbrella Custom Packaging",
      description: "Get In Touch Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes. Umbrella Custom Packaging facilitates your business by providing innovative styled boxes in extraordinary design. We use the finest paper material and high quality cardboard to ensure perfect Die Cut boxes. You will get guaranteed satisfaction with high quality printing.",
      keywords: "custom packaging, wholesale boxes, packaging solutions, affordable packaging, custom boxes, packaging design, eco-friendly packaging",
      author: "Umbrella Custom Packaging",
      ogUrl: `${BaseUrl}/dielines`,
      canonicalUrl: `${BaseUrl}/dielines`,
      ogTitle: "dielines - Umbrella Custom Packaging",
      ogDescription: "Get In Touch Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes...",
      modifiedTime: "2025-06-13T15:18:43+00:00",
      twitterTitle: "dielines - Umbrella Custom Packaging",
      twitterDescription: "Get In Touch Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes...",
      robots: "index, follow"
    };

  const [isModalOpen,setIsModalOpen] = useState(false)
  return (
<>
 <PageMetadata {...metadata} />

   <div  className='bg-[#F7F7F7]'>
<div className="  max-w-[95%] sm:max-w-6xl mx-auto   space-y-12">
      {/* Top section */}
      <div className="flex bg-[#F7F7F7] py-6  flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2 space-y-4">

          <h2 className="text-4xl  font-sans text-[#111111]  font-medium">Dielines</h2>
          <p className="text-gray-600">
            Check out all the different types of boxes we have at Umbrella Custom Packaging! We have special categories for boxes that you can customize just the way you like. You get to choose
            whether it’s the size, the material, or how it looks. So, have a look and pick the perfect box for you!
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <video
            width="500"
            height="300"
            autoPlay
            muted
            loop
            playsInline
            className=""
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
    
  </div>
  <div className="  max-w-[95%] sm:max-w-6xl mx-auto py-10   space-y-12">
  {/* Bottom Section */}
      <div className="text-center space-y-8">
        <h2 className="text-4xl font-medium text-[#111111] font-sans">
          Select Your Desired Box Style (Template)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 pt-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className=" rounded-2xl p-5  bg-[#F7F7F7] hover:shadow-md transition"
            >
             
              <img src={cat?.img} alt="template" className="w-full h-72 object-contain mb-4" />
              <h4 className="font-medium text-center mb-4">{cat.title}</h4>
              <div className="flex justify-center">
               
                  <Button

                    onClick={()=>setIsModalOpen(true)}
                  className="bg-[#4440E6] text-white"
                  label={"Get Template"}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
 <SpecialPackaging />
      <InstantQuoteModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />

  </div>
    

</>
 
  
  );
}

export default Dielines;
