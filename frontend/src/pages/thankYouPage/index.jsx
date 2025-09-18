
import { Link } from "react-router-dom";
import {FaArrowAltCircleLeft, FaWhatsapp } from "react-icons/fa";
import Button from "../../components/common/Button";
import Lottie from "lottie-react";
import { success } from "../../assets";
export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center  py-8 bg-gray-100">
      <div className="bg-[#2E2D2D] custom-shadow  hover:shadow-xl text-white rounded-lg shadow-lg p-8 w-[90%] sm:w-[560px] text-center">
        {/* Success Icon */}
         <Lottie
            animationData={success}
            // loop={false}
            // autoplay={true}
            className="w-56 mx-auto h-56"
          />
        <h2 className="text-xl font-semibold mt-4">Success!</h2>
        <h2 className="mt-4 text-2xl text-white font-bold">
          Thank You for Reaching Out to Us!
        </h2>

        <ul className='mt-6 flex flex-col sm:flex-row justify-center gap-4 text-sm'>
          <li>
            <Link 
              to="https://wa.me/17472470456" 
              target="_blank" 
              rel="noopener noreferrer" 
              className='flex gap-2 items-center justify-center sm:justify-start'
            >
              <FaWhatsapp color="#5A56E9" size={22} />
              <h2 className='text-white text-base whitespace-nowrap'>747-247-0456</h2>
            </Link>
          </li>
          <li>
            <Link 
              to="https://join.skype.com/invite/umbrellapackaging"
              target="_blank" 
              rel="noopener noreferrer" 
              className='flex gap-2 items-center justify-center sm:justify-start'
            >
              <svg width={20} aria-hidden="true" className="e-font-icon-svg e-fab-skype" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                <path fill="#5A56E9" d="M424.7 299.8c2.9-14 4.7-28.9 4.7-43.8 0-113.5-91.9-205.3-205.3-205.3-14.9 0-29.7 1.7-43.8 4.7C161.3 40.7 137.7 32 112 32 50.2 32 0 82.2 0 144c0 25.7 8.7 49.3 23.3 68.2-2.9 14-4.7 28.9-4.7 43.8 0 113.5 91.9 205.3 205.3 205.3 14.9 0 29.7-1.7 43.8-4.7 19 14.6 42.6 23.3 68.2 23.3 61.8 0 112-50.2 112-112 .1-25.6-8.6-49.2-23.2-68.1zm-194.6 91.5c-65.6 0-120.5-29.2-120.5-65 0-16 9-30.6 29.5-30.6 31.2 0 34.1 44.9 88.1 44.9 25.7 0 42.3-11.4 42.3-26.3 0-18.7-16-21.6-42-28-62.5-15.4-117.8-22-117.8-87.2 0-59.2 58.6-81.1 109.1-81.1 55.1 0 110.8 21.9 110.8 55.4 0 16.9-11.4 31.8-30.3 31.8-28.3 0-29.2-33.5-75-33.5-25.7 0-42 7-42 22.5 0 19.8 20.8 21.8 69.1 33 41.4 9.3 90.7 26.8 90.7 77.6 0 59.1-57.1 86.5-112 86.5z"></path>
              </svg>
              <h2 className='text-white text-base whitespace-nowrap'>747-247-0456</h2>
            </Link>
          </li>
          <li className='flex text-white gap-2 items-center justify-center sm:justify-start'>
            <Link 
              to={'mailto:sales@umbrellapackaging.com'} 
              className='flex gap-1.5'
            >
              <svg  width={22} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 122.88 81.51">
                <path fill="#5A56E9" className="" d="M122.88,58.27l-23,23.24V69.93c-14.54-3-26,.31-34.76,11.37,1.51-22.75,17.06-33.73,34.76-34.46V35l23,23.23ZM6.68,0h93.6a6.54,6.54,0,0,1,2.54.51A6.72,6.72,0,0,1,105,2a6.65,6.65,0,0,1,2,4.72V26.4a.62.62,0,0,1-.62.62.66.66,0,0,1-.48-.22,9.31,9.31,0,0,0-2-1.61,9.77,9.77,0,0,0-2.36-1,.63.63,0,0,1-.45-.59V9.86L70.92,35.55l5.49,5.76a.63.63,0,0,1,0,.87l-.16.1c-.68.37-1.36.75-2,1.15s-1.32.82-2,1.26a.61.61,0,0,1-.82-.12l-5-5.21-10.21,8.7a2.92,2.92,0,0,1-3.76,0L41.72,39.34,9.35,71.8H52.93a.61.61,0,0,1,.62.61l0,.19c-.17.74-.33,1.48-.47,2.22v0c-.14.73-.27,1.51-.39,2.32a.62.62,0,0,1-.61.52H6.68a6.59,6.59,0,0,1-2.55-.51A6.83,6.83,0,0,1,2,75.72,6.72,6.72,0,0,1,.51,73.55v0A6.57,6.57,0,0,1,0,71V6.68A6.63,6.63,0,0,1,.51,4.13,6.83,6.83,0,0,1,2,2,6.94,6.94,0,0,1,4.13.51,6.59,6.59,0,0,1,6.68,0ZM5.89,67,37.15,35.61,5.89,10.12V67ZM10,5.89,54.29,42,96.69,5.89Z"></path>
              </svg>
              <h2 className='text-white text-base whitespace-nowrap'>sales@umbrellapackaging.com</h2>
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <Link
          to="/"
         
        >
         <Button Icons={<FaArrowAltCircleLeft  color="white" />} className=" bg-[#5A56E9] text-white" label={' Go To Home'}/>
        </Link>
      </div>
    </div>
  );
}