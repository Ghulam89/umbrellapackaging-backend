import React, { useEffect, useState, lazy, Suspense } from 'react';
import Button from '../common/Button';
import axios from 'axios';
import { BaseUrl } from '../../utils/BaseUrl';
import { Link } from 'react-router-dom';
import { faq } from '../../assets';
import { useIntersectionObserver } from '../../utils/useIntersectionObserver';

const Accordion = lazy(() => import('../common/Accordion'));

const AccordionLoading = React.memo(() => (
  <div className="animate-pulse mb-4">
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6 mt-1"></div>
  </div>
));

const FAQ = React.memo(() => {
  const [accordions, setAccordions] = useState([
    {
    "_id": "6878f39c8bbf42ef2173dd3f",
    "question": "Do you offer Free Samples?",
    "answer": "Yes, if you need any random samples to check the material and printing quality. If you need the samples of your customized box, we do not offer free samples or material kits.",
    "status": "pending",
    "createdAt": "2025-07-17T12:59:08.642Z",
    "__v": 0
    },
    {
    "_id": "6878f3c38bbf42ef2173dd42",
    "question": "How can I create my design?",
    "answer": "All you need send us your artwork and we would provide you a 3D digital Mockup of your box along with a template.",
    "status": "pending",
    "createdAt": "2025-07-17T12:59:47.233Z",
    "__v": 0
    },
    {
    "_id": "6878f4008bbf42ef2173dd59",
    "question": "Do you charge extra, based on the number of colors and ink coverage?",
    "answer": "No, all the products are printed in full color at no extra charge.",
    "status": "pending",
    "createdAt": "2025-07-17T13:00:48.715Z",
    "__v": 0
    },
    {
    "_id": "6878f4168bbf42ef2173dd5c",
    "question": "What kind of custom packaging do you offer?",
    "answer": "<p>Visit our Home Page to see the full range of what we are offering. Each custom packaging option has a free and easy-to-use online designer that’ll help you create attractive and unforgettable unboxing experiences. Don’t see what you’re looking for? Reach out to us at <a href=\"mailto:sales@umbrellapackaging.com\" rel=\"noopener noreferrer\" target=\"_blank\">sales@umbrellapackaging.com.</a></p>",
    "status": "pending",
    "createdAt": "2025-07-17T13:01:10.887Z",
    "__v": 0
    },
    {
    "_id": "6878f4318bbf42ef2173dd5f",
    "question": "Do you have a pick-up location?",
    "answer": "Yes, we do have a pick-up location but usually we ship the orders to the doorstep. please email us at sales@umbrellapackaging.com for more details.",
    "status": "pending",
    "createdAt": "2025-07-17T13:01:37.192Z",
    "__v": 0
    },
    {
    "_id": "6878f4498bbf42ef2173dd76",
    "question": "How can I reorder?",
    "answer": "Simply, contact to the same email you contacted last time and place your reorder.",
    "status": "pending",
    "createdAt": "2025-07-17T13:02:01.289Z",
    "__v": 0
    },
    {
    "_id": "6878f47e8bbf42ef2173dd93",
    "question": "What is the best way to contact you?",
    "answer": "<p>Contact us via email any time <a href=\"mailto:sales@umbrellapackaging.com\" rel=\"noopener noreferrer\" target=\"_blank\">sales@umbrellapackaging.com</a>. You can also DM us through Facebook or Instagram, where our team will get back to you within 24 – 48 business hours.</p>",
    "status": "pending",
    "createdAt": "2025-07-17T13:02:54.329Z",
    "__v": 0
    },
    {
    "_id": "6878f4978bbf42ef2173ddb2",
    "question": "What is your MOQ? Do you print small order quantities?",
    "answer": "Our MOQ is 100 boxes, yes we can offer less number of boxes for ordering.",
    "status": "pending",
    "createdAt": "2025-07-17T13:03:19.025Z",
    "__v": 0
    },
    {
    "_id": "6878f4a98bbf42ef2173ddc9",
    "question": "Do you print larger order quantities?",
    "answer": "Yes, we have the capability to print the orders as per client’s requirements. (100 – 500,000 – up to any number).",
    "status": "pending",
    "createdAt": "2025-07-17T13:03:37.008Z",
    "__v": 0
    },
    {
    "_id": "6878f4bc8bbf42ef2173ddcc",
    "question": "What if my artwork has gradients?",
    "answer": "Gradients are handled with care so to get the desired results in printing. Firstly, there are a few initial quick sample sheets are printed to verify so to move towards the bulk run.",
    "status": "pending",
    "createdAt": "2025-07-17T13:03:56.400Z",
    "__v": 0
    }
    ]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Use Intersection Observer to defer API call until component is visible
  const [faqRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '200px', // Start loading 200px before visible
    triggerOnce: true
  });

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

  // const fetchFaqs = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await axios.get(`${BaseUrl}/faq/getAll`);
  //     // Map the API data to match your component's expected structure
  //     const formattedAccordions = response?.data?.data.map((faq, index) => ({
  //       ...faq,
  //       key: faq._id,
  //       isOpen: false,
  //       customKey: index < 9 ? `0${index + 1}` : `${index + 1}`
  //     }));
  //     setAccordions(formattedAccordions || []);
  //   } catch (error) {
  //     console.error('Error fetching FAQs:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Only fetch FAQs when component is visible (deferred loading)
  // useEffect(() => {
  //   if (isVisible) {
  //     fetchFaqs();
  //   }
  // }, [isVisible]);

  return (
    <>
    {/* ref={faqRef} */}
      <div  style={{ backgroundImage: `url(${faq})` }} className="">
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
                    {/* <Suspense fallback={<div>Loading...</div>}> */}
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
                    {/* </Suspense> */}
                  </div>
                </div>
                <div className="sm:w-6/12 w-full">
                  <div className="sm:mt-12 mt-0">
                    {/* <Suspense fallback={<div>Loading...</div>}> */}
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
                    {/* </Suspense> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

export default FAQ;