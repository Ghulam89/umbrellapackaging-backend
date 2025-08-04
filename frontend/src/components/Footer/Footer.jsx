import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import logo from '../../assets/images/umbrella-logo.svg';
import { FaWhatsapp } from 'react-icons/fa';
import { IoCallOutline, IoLocationOutline } from 'react-icons/io5';
import google from '../../assets/images/footer/google-reviws-logo.webp';
import trust from '../../assets/images/footer/trust-index.jpg';
import trustpilot from '../../assets/images/footer/Trustpilot_logo.png';
import sitejabber from '../../assets/images/footer/sitejabber.jpg';
import social from '../../assets/images/footer/bank-icons.webp';
import Input from '../common/Input';
import Button from '../common/Button';
import Partners from './Partners';
import { BaseUrl } from '../../utils/BaseUrl';
import { toast } from 'react-toastify';
import axios from 'axios';
const Footer = () => {


    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${BaseUrl}/subscribe/create`, {
                email: email
            });

            if (response.data.status === "success") {
                toast.success(response.data.message);
                setEmail('');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {

            toast.error(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className=' bg-[#F7F7F7] pt-4'>

            <div className=' sm:max-w-6xl max-w-[95%] mx-auto'>
                <div className=''>
                    <div className=' flex sm:flex-row   flex-col border-b gap-1.5 border-gray-500 justify-between pb-10 sm:pt-10 pt-0'>
                        <div className=' sm:w-4/12 w-12/12'>
                            <Link to={'/'}>
                                <img src={logo} alt='' className=' w-36' />
                            </Link>

                            <p className=' text-[#213554] pt-1.5'>We offer Packaging Boxes delivered to your door. Secure, professional, and affordable, our custom made packaging boxes are guaranteed to protect and transport your valuable items. Our devoted team is always there to serve you.</p>
                        </div>
                        <div className=' sm:w-7/12 w-full text-center'>
                            <h2 className="sm:text-[38px] text-[25px]     font-sans   font-[700] text-[#333333]">Need Quick Assistance? Get In Touch</h2>
                            <Link className=' flex  pt-2 items-center justify-center'>
                                <IoCallOutline size={40} className='' />
                                <h2 className="sm:text-[50px] text-[25px]     font-sans   font-[800] text-[#333333]">747-247-0456</h2>
                            </Link>
                            <div className=' pt-5'>
                                <ul className=' flex flex-wrap gap-4 items-center justify-center '>
                                    <li >
                                        <Link to="https://wa.me/17472470456" target="_blank" rel="noopener noreferrer" className=' flex  gap-2 items-center'>
                                            <FaWhatsapp size={25} />
                                            <p className=' text-gray-700'>747-247-0456</p>
                                        </Link>

                                    </li>
                                    <li >
                                        <Link to="https://join.skype.com/invite/YOUR_SKYPE_ID" target="_blank" rel="noopener noreferrer" className=' flex  gap-2 items-center'>
                                            <svg width={20} aria-hidden="true" class="e-font-icon-svg e-fab-skype" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M424.7 299.8c2.9-14 4.7-28.9 4.7-43.8 0-113.5-91.9-205.3-205.3-205.3-14.9 0-29.7 1.7-43.8 4.7C161.3 40.7 137.7 32 112 32 50.2 32 0 82.2 0 144c0 25.7 8.7 49.3 23.3 68.2-2.9 14-4.7 28.9-4.7 43.8 0 113.5 91.9 205.3 205.3 205.3 14.9 0 29.7-1.7 43.8-4.7 19 14.6 42.6 23.3 68.2 23.3 61.8 0 112-50.2 112-112 .1-25.6-8.6-49.2-23.2-68.1zm-194.6 91.5c-65.6 0-120.5-29.2-120.5-65 0-16 9-30.6 29.5-30.6 31.2 0 34.1 44.9 88.1 44.9 25.7 0 42.3-11.4 42.3-26.3 0-18.7-16-21.6-42-28-62.5-15.4-117.8-22-117.8-87.2 0-59.2 58.6-81.1 109.1-81.1 55.1 0 110.8 21.9 110.8 55.4 0 16.9-11.4 31.8-30.3 31.8-28.3 0-29.2-33.5-75-33.5-25.7 0-42 7-42 22.5 0 19.8 20.8 21.8 69.1 33 41.4 9.3 90.7 26.8 90.7 77.6 0 59.1-57.1 86.5-112 86.5z"></path></svg>
                                            <p className=' text-gray-700'>747-247-0456</p>
                                        </Link>

                                    </li>
                                    <li className=' flex  gap-2 items-center'>
                                        <Link to={'mailto:sales@umbrellapackaging.com'} className=' flex gap-1.5'>
                                            <svg width={25} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 122.88 81.51"><path class="cls-1" d="M122.88,58.27l-23,23.24V69.93c-14.54-3-26,.31-34.76,11.37,1.51-22.75,17.06-33.73,34.76-34.46V35l23,23.23ZM6.68,0h93.6a6.54,6.54,0,0,1,2.54.51A6.72,6.72,0,0,1,105,2a6.65,6.65,0,0,1,2,4.72V26.4a.62.62,0,0,1-.62.62.66.66,0,0,1-.48-.22,9.31,9.31,0,0,0-2-1.61,9.77,9.77,0,0,0-2.36-1,.63.63,0,0,1-.45-.59V9.86L70.92,35.55l5.49,5.76a.63.63,0,0,1,0,.87l-.16.1c-.68.37-1.36.75-2,1.15s-1.32.82-2,1.26a.61.61,0,0,1-.82-.12l-5-5.21-10.21,8.7a2.92,2.92,0,0,1-3.76,0L41.72,39.34,9.35,71.8H52.93a.61.61,0,0,1,.62.61l0,.19c-.17.74-.33,1.48-.47,2.22v0c-.14.73-.27,1.51-.39,2.32a.62.62,0,0,1-.61.52H6.68a6.59,6.59,0,0,1-2.55-.51A6.83,6.83,0,0,1,2,75.72,6.72,6.72,0,0,1,.51,73.55v0A6.57,6.57,0,0,1,0,71V6.68A6.63,6.63,0,0,1,.51,4.13,6.83,6.83,0,0,1,2,2,6.94,6.94,0,0,1,4.13.51,6.59,6.59,0,0,1,6.68,0ZM5.89,67,37.15,35.61,5.89,10.12V67ZM10,5.89,54.29,42,96.69,5.89Z"></path></svg>
                                            <p className=' text-gray-700'>sales@umbrellapackaging.com</p>
                                        </Link>

                                    </li>
                                </ul>
                                <li className=' flex  gap-2 justify-center pt-2.5 items-center'>
                                    <Link className=' flex   items-center gap-1.5'>
                                        <IoLocationOutline size={20} />
                                        <p className=' text-gray-700'>9854 National Blvd # 1042 Los Angeles, CA 90034 USA</p>
                                    </Link>

                                </li>
                            </div>

                        </div>
                        <div>

                        </div>
                    </div>
                    <div className=' sm:pt-8 sm:gap-12  gap-7  pt-4 grid md:grid-cols-5 grid-cols-2'>
                        <div className=' col-span-2'>
                            <Partners />
                            <div className=' bg-white h-56  rounded-md flex   justify-center w-full items-center' >
                                <div className=' grid   py-5 grid-cols-2 gap-6 w-full'>
                                    <Link to={'https://www.google.com/search?q=Umbrella+Packaging&sca_esv=595745443&rlz=1C1CHBD_enPK1075PK1075&sxsrf=AM9HkKnBl0W9ivYXDrDVqm1eeUaJMzvaUQ%3A1704396144882&ei=cAWXZdq9NZDii-gPp4yrgAE&ved=0ahUKEwjatZa2usSDAxUQ8QIHHSfGChAQ4dUDCBA&uact=5&oq=Umbrella+Packaging&gs_lp=Egxnd3Mtd2l6LXNlcnAiElVtYnJlbGxhIFBhY2thZ2luZzIHECMYsAIYJzIHECMYsAIYJzIHECMYsAIYJzIHEAAYgAQYDTIHEAAYgAQYDTIGEAAYHhgNMggQABgFGB4YDTIIEAAYBRgeGA0yCBAAGAgYHhgNMggQABgIGB4YDUiZQVDqBVjyPnACeAGQAQCYAb8DoAGrEKoBBTMtNS4xuAEDyAEA-AEBwgIKEAAYRxjWBBiwA8ICChAAGAgYHhgNGA_CAgsQABiABBiKBRiGA8ICBBAjGCfCAgoQIxiABBiKBRgnwgIGEAAYBxgewgIFEAAYgATCAgQQABgewgIGEAAYBRgewgIGEAAYCBge4gMEGAAgQYgGAZAGCA&sclient=gws-wiz-serp'} className=' flex justify-center w-full items-center'>
                                        <img src={google} alt='' className=' w-28' />
                                    </Link>
                                    <Link to={'https://www.trustindex.io/reviews/www.umbrellapackaging.com?lang=ko'} className=' flex justify-center items-center'>
                                        <img src={trust} alt='' className=' w-36' />
                                    </Link>
                                    <Link to={'https://www.trustpilot.com/review/umbrellapackaging.com?utm_medium=trustbox&utm_source=MicroReviewCount'} className=' flex justify-center items-center'>
                                        <img src={trustpilot} alt='' className=' w-36' />
                                    </Link>
                                    <Link to={'https://www.sitejabber.com/reviews/umbrellapackaging.com'} className=' flex justify-center items-center'>
                                        <img src={sitejabber} alt='' className=' w-36' />
                                    </Link>
                                </div>

                            </div>
                        </div>
                        <div className=''>
                            <strong className='  text-lg '>Quick Links</strong>
                            <ul className=' pt-3 leading-8'>
                                <li>
                                    <Link to={'/'} className='  text-[#2e2d2d]'>Home</Link>
                                </li>
                                <li>
                                    <Link to={'/shop'} className='  text-[#2e2d2d]'>Shop</Link>
                                </li>
                                <li>
                                    <Link to={'/get-custom-quote'} className='  text-[#2e2d2d]'>Get A Quote</Link>
                                </li>
                                <li>
                                    <Link to={'/contact-us'} className='  text-[#2e2d2d]'>Order Sample Kit</Link>
                                </li>
                                <li>
                                    <Link to={'#'} className='  text-[#2e2d2d]'>Get Custom Template</Link>
                                </li>
                                <li>
                                    <Link to={'/reviews'} className='  text-[#2e2d2d]'>Customer Reviews</Link>
                                </li>
                                <li>
                                    <Link to={'/target-price'} className='  text-[#2e2d2d]'>Beat My Quote</Link>
                                </li>
                            </ul>
                        </div>
                        <div className=''>
                            <strong className='  text-lg '>Useful Links</strong>
                            <ul className=' pt-3 leading-8'>
                                <li>
                                    <Link to={'/sub-category/custom-cardboard-boxes/'} className='  text-[#2e2d2d]'>Cardboard Boxes</Link>
                                </li>
                                <li>
                                    <Link to={'/sub-category/custom-corrugated-boxes/'} className='  text-[#2e2d2d]'>Corrugated Boxes</Link>
                                </li>
                                <li>
                                    <Link to={'/sub-category/kraft-packaging-boxes/'} className='  text-[#2e2d2d]'>Karft Boxes</Link>
                                </li>
                                <li>
                                    <Link to={'/sub-category/custom-rigid-boxes/'} className='  text-[#2e2d2d]'>Rigid Boxes</Link>
                                </li>
                                <li>
                                    <Link to={'/sub-category/custom-laminated-boxes/'} className='  text-[#2e2d2d]'>Laminated Boxes</Link>
                                </li>
                                <li>
                                    <Link to={'/sub-category/custom-textured-boxes/'} className='  text-[#2e2d2d]'>Textured Boxes</Link>
                                </li>
                                <li>
                                    <Link to={'/sub-category/cbd-packaging-boxes/'} className='  text-[#2e2d2d] '>CBD Packaging</Link>
                                </li>
                            </ul>
                        </div>
                        <div className=''>
                            <strong className='  text-lg '>About</strong>
                            <ul className=' pt-3 leading-8'>
                                <li>
                                    <Link to={'/about-us'} className='  text-[#2e2d2d]'>About us</Link>
                                </li>
                                <li>
                                    <Link to={'/privacy-policy'} className='  text-[#2e2d2d]'>Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link to={'/terms-and-conditions'} className='  text-[#2e2d2d]'>Terms And Conditions</Link>
                                </li>
                                <li>
                                    <Link to={'/returns-refunds'} className='  text-[#2e2d2d]'>RETURNS & REFUNDS</Link>
                                </li>
                                <li>
                                    <Link to={'/shipping-policy'} className='  text-[#2e2d2d]'>Shipping Policy</Link>
                                </li>
                                <li>
                                    <Link to={'/blogs'} className='  text-[#2e2d2d]'>Blog</Link>
                                </li>
                                <li>
                                    <Link to={'/faqs'} className='  text-[#2e2d2d] '>FAQs</Link>
                                </li>
                                <li>
                                    <Link to={'/contact-us'} className='  text-[#2e2d2d] '>Contact us</Link>
                                </li>
                            </ul>
                        </div>

                    </div>


                    <div className=' flex sm:flex-row flex-col py-5 justify-between items-end'>

                        <div className=' sm:w-4/12 w-full'>
                            <label className=''>Get More Update Join Our Newsletters:</label>

                            <form onSubmit={handleSubscribe}>
                                <div className='pt-3 flex sm:flex-row flex-col gap-3'>
                                    <Input
                                        placeholder={'Enter Your Email Here'}
                                        className={'border border-black w-full py-1.5 rounded-sm bg-white placeholder:text-gray-600'}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        required
                                    />
                                    <Button
                                        label={loading ? 'Submitting...' : 'Submit'}
                                        className='text-white rounded-md bg-[#4440E6]'
                                        type="submit"
                                        disabled={loading}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className=' sm:w-6/12 w-full'>
                            <div className=' flex sm:flex-row items-center flex-col  justify-between'>
                                <img src={social} className=' w-96' alt='' />
                                <p className=' text-sm font-semibold'>Our Secure Payment Modes</p>
                            </div>

                        </div>
                    </div>

                </div>


            </div>
            <div className=' bg-white flex justify-center py-1'>
                <p className=' text-gray-800'>© 2025 Umbrella Packaging All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer