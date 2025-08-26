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
              <img src={usa} alt="USA" className="w-8 object-contain" />
              <span>USA</span>
            </div>
            <div className="flex items-center space-x-1">
              <img src={uk} alt="UK" className="w-8 object-contain" />
              <span>UK</span>
            </div>
            <div className="flex items-center space-x-1">
              <img src={canada} alt="Canada" className="w-8 object-contain" />
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
           <div className=" ">
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



    </div>
  );
};

export default TopNav;
