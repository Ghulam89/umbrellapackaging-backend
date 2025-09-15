import React, { useEffect, useState, lazy, Suspense } from 'react';
import Button from '../common/Button';
import axios from 'axios';
import { BaseUrl } from '../../utils/BaseUrl';
import { Link } from 'react-router-dom';
import { faq } from '../../assets';

const Accordion = lazy(() => import('../common/Accordion'));

const AccordionLoading = () => (
  <div className="animate-pulse mb-4">
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6 mt-1"></div>
  </div>
);

const FAQ = () => {
  const [accordions, setAccordions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <>
      <div style={{ backgroundImage: `url(${faq})` }} className="">
        <div className="sm:max-w-6xl max-w-[95%] mx-auto">
          <div className="">
            <div className="text-center">
              <h2 className="sm:text-[35px] text-[25px] pt-7 font-sans font-[600] text-[#333333]">FAQ's</h2>
              <Link to={'/faqs'}><Button label={'View All'} className="bg-[#4440E6] mx-auto text-white mt-2 opacity-90" /></Link> 
            </div>
            
            {isLoading ? (
              <div className="mt-12">
                {[...Array(6)].map((_, i) => (
                  <AccordionLoading key={i} />
                ))}
              </div>
            ) : (
              <div className="flex sm:flex-row flex-col justify-between sm:gap-5 gap-0">
                <div className="sm:w-6/12 w-full">
                  <div className="mt-12">
                    <Suspense fallback={<div>Loading...</div>}>
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
                    </Suspense>
                  </div>
                </div>
                <div className="sm:w-6/12 w-full">
                  <div className="sm:mt-12 mt-0">
                    <Suspense fallback={<div>Loading...</div>}>
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
                    </Suspense>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;