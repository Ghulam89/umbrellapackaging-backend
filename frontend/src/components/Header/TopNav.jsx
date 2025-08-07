import "tailwindcss";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import usa from "../../assets/images/flag/us.svg";
import uk from "../../assets/images/flag/uk.svg";
import canada from "../../assets/images/flag/canada.svg";
import { Link } from "react-router-dom";

const TopNav = () => {
  return (
    <div className=" bg-[#F7F7F7]">
      <div className="sm:max-w-6xl max-w-[95%] mx-auto">
        <div className="flex sm:justify-between justify-center flex-wrap items-center px-6 sm:py-4 py-2 border-b border-gray-200 text-sm text-gray-700">
          {/* Left Side: Country Flags */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center  space-x-1.5">
              <img src={usa} alt="USA" className="w-8 h-8" />
              <span>USA</span>
            </div>
            <div className="flex items-center space-x-1">
              <img src={uk} alt="UK" className="w-8 h-8" />
              <span>UK</span>
            </div>
            <div className="flex items-center space-x-1">
              <img src={canada} alt="Canada" className="w-8 h-8" />
              <span>Canada</span>
            </div>
          </div>



          {/* Right Side: Account & Social Media */}
          <div className="flex flex-wrap  justify-center items-center space-x-4 space-y-1">
            <Link to={'mailto:sales@umbrellapackaging.com'} className="flex items-center space-x-2">
              <MdEmail size={15} />
              <span>sales@umbrellapackaging.com</span>
            </Link>
            <Link to={'tel:747-247-0456'} className="flex items-center space-x-2">
              <FiPhone size={15} />
              <span>747-247-0456</span>
            </Link>
            <div className="flex items-center space-x-2">
              <AiOutlineUser size={18} />
              <span>My Account</span>
            </div>
           <div className="  hidden sm:block">
             <div className="flex space-x-3 mb-1 text-gray-600">
              <Link target="_blank" to={'https://www.facebook.com/umbrellapackaging'}>
                <FaFacebook size={17} />
              </Link>
              <Link target="_blank" to={'https://twitter.com/umbrellapack'}>
                <FaTwitter size={17} />
              </Link>
              <Link target="_blank" to={'https://www.youtube.com/channel/UCkxeWyAJqxjFSzlbnSoIVLQ'}>
                <FaYoutube size={17} />
              </Link>
              <Link target="_blank" to={'https://www.instagram.com/umbrellacustompackaging/'}>
                <FaInstagram size={17} />
              </Link>
              <Link target="_blank" to={'https://www.linkedin.com/company/umbrellacustompackaging/'}>
                <FaLinkedin size={17} />
              </Link>
              <Link target="_blank" to={'https://wa.me/message/JTJTB4YWJYNQP1'}>
                <FaWhatsapp size={17} />
              </Link>

            </div>
           </div>
          </div>
        </div>
      </div>


   <div className="block sm:hidden">
  <div className="flex fixed top-[50%] right-0 z-50">
    <div className="flex flex-col space-y-3 bg-white p-2 rounded-l-md shadow-md text-gray-600">
      <Link target="_blank" to="https://www.facebook.com/umbrellapackaging" className="hover:text-blue-600 transition transform hover:scale-110 duration-300">
        <FaFacebook size={20} />
      </Link>
      <Link target="_blank" to="https://twitter.com/umbrellapack" className="hover:text-blue-400 transition transform hover:scale-110 duration-300">
        <FaTwitter size={20} />
      </Link>
      <Link target="_blank" to="https://www.youtube.com/channel/UCkxeWyAJqxjFSzlbnSoIVLQ" className="hover:text-red-600 transition transform hover:scale-110 duration-300">
        <FaYoutube size={20} />
      </Link>
      <Link target="_blank" to="https://www.instagram.com/umbrellacustompackaging/" className="hover:text-pink-500 transition transform hover:scale-110 duration-300">
        <FaInstagram size={20} />
      </Link>
      <Link target="_blank" to="https://www.linkedin.com/company/umbrellacustompackaging/" className="hover:text-blue-800 transition transform hover:scale-110 duration-300">
        <FaLinkedin size={20} />
      </Link>
      <Link target="_blank" to="https://wa.me/message/JTJTB4YWJYNQP1" className="hover:text-green-500 transition transform hover:scale-110 duration-300">
        <FaWhatsapp size={20} />
      </Link>
    </div>
  </div>
</div>

    </div>
  );
};

export default TopNav;
