import React from 'react'
import banner from '../../assets/images/main-static-banner.webp'
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';


function TermsAndConditions() {
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
            <h1 className=' font-semibold leading-10 sm:text-4xl  text-2xl  capitalize'>
                We are committed to <br/>
                <h1 style={{color:'#5A56E9'}} className='font-semibold leading-10 capitalize'>{text} <Cursor cursorStyle='|' /></h1>

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
                <div><Button className='   bg-[#4440E6] text-white'  label={"Get Intense Quote "}  /></div>

        </div>
        <div>
            <img src={banner} alt="main-banner" />
        </div>
    </div>
    <div>
        <p className='text-[#777777] text-[14px]  p-2'><b>LEGAL NOTICES </b> <br /> <br />

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

If you require design files with a higher resolution than 72 DPI, please contact <Link className='text-[#5A56E9]' to={"/contact"}> www.umbrellapackaging.com/contact/</Link> for a quote. Kindly note that Umbrella Custom Packaging only provides design files at 72 DPI (low resolution). <br /> <br />

<b>CUSTOMER SUBMITTED ARTWORK</b> <br />                                
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
  )
}

export default TermsAndConditions
