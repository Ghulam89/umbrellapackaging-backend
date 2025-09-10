import React, { useEffect, useState } from 'react';
import Accordion from '../common/Accordion';
import Button from '../common/Button';
import axios from 'axios';
import { BaseUrl } from '../../utils/BaseUrl';
import faq from '../../assets/images/faq.png';
import { Link } from 'react-router-dom';
import PageMetadata from '../common/PageMetadata';
const FAQ = () => {
  const [accordions, setAccordions] = useState([]);

  const toggleAccordion = (accordionKey) => {
    const updatedAccordions = accordions.map((accordion) => {
      if (accordion._id === accordionKey) {
        return { ...accordion, isOpen: !accordion.isOpen };
      } else {
        return { ...accordion, isOpen: false };
      }
    });

    setAccordions(updatedAccordions);
  };

  const fetchFaqs = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/faq/getAll`);
      // Map the API data to match your component's expected structure
      const formattedAccordions = response?.data?.data.map((faq, index) => ({
        ...faq,
        key: faq._id,
        isOpen: false,
        customKey: index < 9 ? `0${index + 1}` : `${index + 1}`
      }));
      setAccordions(formattedAccordions || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);


  const metadata = {
        title: "Faqs - Umbrella Custom Packaging",
        description: "Faqs Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes. Umbrella Custom Packaging facilitates your business by providing innovative styled boxes in extraordinary design. We use the finest paper material and high quality cardboard to ensure perfect Die Cut boxes. You will get guaranteed satisfaction with high quality printing.",
        keywords: "custom packaging, wholesale boxes, packaging solutions, affordable packaging, custom boxes, packaging design, eco-friendly packaging",
        author: "Umbrella Custom Packaging",
        ogUrl: `${BaseUrl}/faqs`,
        canonicalUrl: `${BaseUrl}/faqs`,
        ogTitle: "Faqs - Umbrella Custom Packaging",
        ogDescription: "Faqs Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes...",
        modifiedTime: "2025-06-13T15:18:43+00:00",
        twitterTitle: "Faqs - Umbrella Custom Packaging",
        twitterDescription: "Faqs Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes...",
        robots: "index, follow"
      };

  return (
    <>
      <PageMetadata {...metadata} />
      <div style={{ backgroundImage: `url(${faq})` }} className="">
      <div className="sm:max-w-6xl max-w-[95%] mx-auto">
        <div className="">
          <div className="text-center">
            <h2 className="sm:text-[35px] text-[25px]  pt-7    font-sans   font-[600] text-[#333333]">FAQ's</h2>
            <Link to={'/faqs'}><Button label={'View All'} className="bg-[#4440E6] mx-auto text-white mt-2 opacity-90" /></Link> 
          </div>
          
          <div className="flex sm:flex-row flex-col justify-between sm:gap-5 gap-0">
            <div className="sm:w-6/12 w-full">
              <div className="mt-12">
                {accordions.slice(0, Math.ceil(accordions.length / 2)).map((accordion) => (
                  <Accordion
                    key={accordion._id}
                    id={accordion._id}
                    title={accordion.question}
                    data={accordion.answer}
                    isOpen={accordion.isOpen}
                    toggleAccordion={() => toggleAccordion(accordion._id)}
                    customKey={accordion.customKey}
                  />
                ))}
              </div>
            </div>
            <div className="sm:w-6/12 w-full">
              <div className="sm:mt-12 mt-0">
                {accordions.slice(Math.ceil(accordions.length / 2)).map((accordion) => (
                  <Accordion
                    key={accordion._id}
                    id={accordion._id}
                    title={accordion.question}
                    data={accordion.answer}
                    isOpen={accordion.isOpen}
                    toggleAccordion={() => toggleAccordion(accordion._id)}
                    customKey={accordion.customKey}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  
  );
};

export default FAQ;