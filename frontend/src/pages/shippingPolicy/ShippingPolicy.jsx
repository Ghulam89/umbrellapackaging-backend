import React from 'react'
import banner from '../../assets/images/main-static-banner.webp'
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import Button from '../../components/common/Button';
function ShippingPolicy() {
    const [ text]  = useTypewriter({
            words: ['Quality And Innovation.'],
            typeSpeed: 80,
            deleteSpeed: 80,
            loop:{},
        });
  return (
     <div className='max-w-[1200px] mx-auto'>
                <div className='grid md:grid-cols-2 grid-cols-1 bg-[#d2e0FB59] rounded-[8px] p-5 mt-10'>
                    <div className='flex flex-col justify-center gap-10'>
                        <h1 className='md:text-[40px] text-[20px] font-semibold leading-10  capitalize'>
                            We are committed to <br/>
                            <h5 className='md:text-[40px] text-[20px] font-semibold leading-10 capitalize text-[#5A56E9]'>{text} <Cursor cursorStyle='|' /></h5>
    
                        </h1>
                        <p className='text-[#777777] md:text-[16px] text-[14px] text-left'>Various Custom Packaging Styles With Perfect Solutions.</p>
                        
                            <ul className='grid grid-cols-3 gap-0'>
                                <li className='flex flex-row text-[#777777] md:text-[20px] capitalize text-[14px] gap-0 border-r-1 mr-3 ' >  <svg
            className="hover:fill-[#5A56E9]" // Tailwind hover effect to change fill color to red
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            enableBackground="new 0 0 48 48"
            height="30px"
            version="1.1"
            viewBox="0 0 48 48"
            width="30px"
            xmlSpace="preserve"
          >
            <g id="Expanded">
              <g>
                <path d="M44,48H4c-2.206,0-4-1.794-4-4V14c0-2.206,1.794-4,4-4h20c0.552,0,1,0.448,1,1s-0.448,1-1,1H4c-1.103,0-2,0.897-2,2v30c0,1.103,0.897,2,2,2h40c1.103,0,2-0.897,2-2V14c0-1.103-0.897-2-2-2c-0.552,0-1-0.448-1-1s0.448-1,1-1c2.206,0,4,1.794,4,4v30C48,46.206,46.206,48,44,48z"/>
                <path d="M44,44H10V14h10c0.552,0,1,0.448,1,1s-0.448,1-1,1h-8v26h30V16h-2c-0.552,0-1-0.448-1-1s0.448-1,1-1h4V44z"/>
                <path d="M8,42H0V16h8V42z M2,40h4V18H2V40z"/>
                <path d="M17.44,27.56l2.639-8.297L38.071,1.272c1.511-1.512,4.146-1.512,5.657,0c1.56,1.56,1.56,4.097,0,5.656L25.737,24.92L17.44,27.56z M21.838,20.333l-1.32,4.148l4.148-1.32L42.314,5.515c0.78-0.78,0.78-2.048,0-2.828c-0.756-0.756-2.073-0.756-2.829,0L21.838,20.333z"/>
                <rect height="2" width="6" x="1" y="24"/>
                <rect height="2" width="6" x="1" y="32"/>
                <path d="M41.606,8.636c-0.256,0-0.512-0.098-0.707-0.293l-4.243-4.243c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l4.243,4.243c0.391,0.391,0.391,1.023,0,1.414C42.118,8.539,41.862,8.636,41.606,8.636z"/>
                <path d="M35.95,14.293c-0.256,0-0.512-0.098-0.707-0.293L31,9.757c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l4.243,4.243c0.391,0.391,0.391,1.023,0,1.414C36.461,14.195,36.206,14.293,35.95,14.293z"/>
                <path d="M25.202,25.041c-0.256,0-0.512-0.098-0.707-0.293l-4.243-4.243c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l4.243,4.243c0.391,0.391,0.391,1.023,0,1.414C25.713,24.943,25.458,25.041,25.202,25.041z"/>
                <path d="M17,29c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l1.979-1.979c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-1.979,1.979C17.512,28.902,17.256,29,17,29z"/>
              </g>
            </g>
          </svg> Free Design</li>
                                <li className='flex flex-row text-[#777777] md:text-[20px] capitalize text-[14px] gap-3 border-r-1 mr-3' >  <svg
            className="hover:fill-[#5A56E9]" // Tailwind hover effect to change fill color to red
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            enableBackground="new 0 0 48 48"
            height="30px"
            version="1.1"
            viewBox="0 0 48 48"
            width="30px"
            xmlSpace="preserve"
          >
            <g id="Expanded">
              <g>
                <path d="M44,48H4c-2.206,0-4-1.794-4-4V14c0-2.206,1.794-4,4-4h20c0.552,0,1,0.448,1,1s-0.448,1-1,1H4c-1.103,0-2,0.897-2,2v30c0,1.103,0.897,2,2,2h40c1.103,0,2-0.897,2-2V14c0-1.103-0.897-2-2-2c-0.552,0-1-0.448-1-1s0.448-1,1-1c2.206,0,4,1.794,4,4v30C48,46.206,46.206,48,44,48z"/>
                <path d="M44,44H10V14h10c0.552,0,1,0.448,1,1s-0.448,1-1,1h-8v26h30V16h-2c-0.552,0-1-0.448-1-1s0.448-1,1-1h4V44z"/>
                <path d="M8,42H0V16h8V42z M2,40h4V18H2V40z"/>
                <path d="M17.44,27.56l2.639-8.297L38.071,1.272c1.511-1.512,4.146-1.512,5.657,0c1.56,1.56,1.56,4.097,0,5.656L25.737,24.92L17.44,27.56z M21.838,20.333l-1.32,4.148l4.148-1.32L42.314,5.515c0.78-0.78,0.78-2.048,0-2.828c-0.756-0.756-2.073-0.756-2.829,0L21.838,20.333z"/>
                <rect height="2" width="6" x="1" y="24"/>
                <rect height="2" width="6" x="1" y="32"/>
                <path d="M41.606,8.636c-0.256,0-0.512-0.098-0.707-0.293l-4.243-4.243c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l4.243,4.243c0.391,0.391,0.391,1.023,0,1.414C42.118,8.539,41.862,8.636,41.606,8.636z"/>
                <path d="M35.95,14.293c-0.256,0-0.512-0.098-0.707-0.293L31,9.757c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l4.243,4.243c0.391,0.391,0.391,1.023,0,1.414C36.461,14.195,36.206,14.293,35.95,14.293z"/>
                <path d="M25.202,25.041c-0.256,0-0.512-0.098-0.707-0.293l-4.243-4.243c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l4.243,4.243c0.391,0.391,0.391,1.023,0,1.414C25.713,24.943,25.458,25.041,25.202,25.041z"/>
                <path d="M17,29c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l1.979-1.979c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-1.979,1.979C17.512,28.902,17.256,29,17,29z"/>
              </g>
            </g>
          </svg> Cheapest</li>
                                <li className='flex flex-row text-[#777777] md:text-[20px] capitalize text-[14px] gap-3 no-w' >  <svg
            className="hover:fill-[#5A56E9]" // Tailwind hover effect to change fill color to red
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            enableBackground="new 0 0 48 48"
            height="30px"
            version="1.1"
            viewBox="0 0 48 48"
            width="30px"
            xmlSpace="preserve"
          >
            <g id="Expanded">
              <g>
                <path d="M44,48H4c-2.206,0-4-1.794-4-4V14c0-2.206,1.794-4,4-4h20c0.552,0,1,0.448,1,1s-0.448,1-1,1H4c-1.103,0-2,0.897-2,2v30c0,1.103,0.897,2,2,2h40c1.103,0,2-0.897,2-2V14c0-1.103-0.897-2-2-2c-0.552,0-1-0.448-1-1s0.448-1,1-1c2.206,0,4,1.794,4,4v30C48,46.206,46.206,48,44,48z"/>
                <path d="M44,44H10V14h10c0.552,0,1,0.448,1,1s-0.448,1-1,1h-8v26h30V16h-2c-0.552,0-1-0.448-1-1s0.448-1,1-1h4V44z"/>
                <path d="M8,42H0V16h8V42z M2,40h4V18H2V40z"/>
                <path d="M17.44,27.56l2.639-8.297L38.071,1.272c1.511-1.512,4.146-1.512,5.657,0c1.56,1.56,1.56,4.097,0,5.656L25.737,24.92L17.44,27.56z M21.838,20.333l-1.32,4.148l4.148-1.32L42.314,5.515c0.78-0.78,0.78-2.048,0-2.828c-0.756-0.756-2.073-0.756-2.829,0L21.838,20.333z"/>
                <rect height="2" width="6" x="1" y="24"/>
                <rect height="2" width="6" x="1" y="32"/>
                <path d="M41.606,8.636c-0.256,0-0.512-0.098-0.707-0.293l-4.243-4.243c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l4.243,4.243c0.391,0.391,0.391,1.023,0,1.414C42.118,8.539,41.862,8.636,41.606,8.636z"/>
                <path d="M35.95,14.293c-0.256,0-0.512-0.098-0.707-0.293L31,9.757c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l4.243,4.243c0.391,0.391,0.391,1.023,0,1.414C36.461,14.195,36.206,14.293,35.95,14.293z"/>
                <path d="M25.202,25.041c-0.256,0-0.512-0.098-0.707-0.293l-4.243-4.243c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l4.243,4.243c0.391,0.391,0.391,1.023,0,1.414C25.713,24.943,25.458,25.041,25.202,25.041z"/>
                <path d="M17,29c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l1.979-1.979c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-1.979,1.979C17.512,28.902,17.256,29,17,29z"/>
              </g>
            </g>
          </svg>Free Shipping</li>
                               
                            </ul>
                            <div><Button label={"Get Intense Quote "}/></div>
    
                    </div>
                    <div>
                        <img src={banner} alt="main-banner" />
                    </div>
                </div>
                <div>
    <p className='text-[#777777] text-[14px] p-2'>
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
