import React, { useEffect, useState } from "react";
import { FaAngleDown, FaBed, FaTimes } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/umbrella-logo.svg";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
import BrandsData from "../../api/BrandsData";
import Button from "../common/Button";

const BottomNav = ({ Menu, OpenMenu }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/brands/getAll`);
        setAllCategories(response?.data?.data?.length ? response.data.data : BrandsData);
      } catch (error) {
        setAllCategories(BrandsData);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setHoveredCategory(null);
    setSelectedCategory(null);
    setMobileSubmenu(null);
  }, [location.pathname]);

  const handleCategoryHover = (category) => {
    setHoveredCategory(category);
    setSelectedCategory(category.midcategories);
  };

  const handleCategoryLeave = () => {
    setHoveredCategory(null);
    setSelectedCategory(null);
  };

  const handleLinkClick = () => {
    if (OpenMenu) OpenMenu();
    handleCategoryLeave();
    setMobileSubmenu(null);
  };

  const toggleMobileSubmenu = (category) => {
    if (mobileSubmenu === category.name) {
      setMobileSubmenu(null);
    } else {
      setMobileSubmenu(category.name);
    }
  };

  return (
    <div className="relative">
      {/* Desktop Menu */}
      <div className="sm:block hidden pt-5">
        <ul className="flex justify-between items-center max-w-6xl mx-auto">
          <li>
            <NavLink to="/" className="transition-colors  text-[#333333] font-medium">
              HOME
            </NavLink>
          </li>
          {BrandsData.map((category, index) => (
            <li
              key={index}
              onMouseEnter={() => handleCategoryHover(category)}
              onMouseLeave={handleCategoryLeave}
              className="relative group"
            >
              <NavLink
                onClick={handleCategoryLeave}
                to={`/category/${category?.slug}`}
                className="flex items-center gap-1 text-[#333333]   uppercase py-2.5 text-sm  font-medium transition-colors"
              >
                {category.name}
                {category.midcategories?.length > 0 && (
                  <FaAngleDown className="ml-1" size={15} />
                )}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/portfolio" className=" uppercase  font-medium  text-[#333333]  transition-colors">
              Portfolio
            </NavLink>
          </li>
          <li>
            <Link to="/blogs" className=" uppercase   font-medium text-[#333333]  transition-colors">
              Blog
            </Link>
          </li>
          <li>
            <NavLink to="/about-us" className=" uppercase  font-medium   text-[#333333]  transition-colors">
              About us
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact-us" className=" uppercase  font-medium  text-[#333333]  transition-colors">
              Contact us
            </NavLink>
          </li>
        </ul>

        {/* Dropdown Menu */}
        {hoveredCategory && selectedCategory && (
          <div
            className="absolute top-12 pt-3 left-0 w-full z-50"
            onMouseEnter={() => handleCategoryHover(hoveredCategory)}
            onMouseLeave={handleCategoryLeave}
          >
            <div className="bg-[#F7F7F7] rounded-lg mt-5">
              <div className="max-w-8xl mx-auto px-4 py-3 grid grid-cols-4 gap-4">
                {selectedCategory.map((submenu, index) => (
                  <NavLink
                    key={submenu._id}
                    onClick={handleCategoryLeave}
                    to={`/sub-category/${submenu.slug}`}
                    className=" flex font-semibold text-[#333333]  capitalize gap-1 items-center transition-colors"
                  >
                    <img src={`${BaseUrl}/${submenu?.icon}`} alt="" className="w-8" />{" "}
                    {submenu.title}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {Menu && (
        <div 
          className="sm:hidden fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-40"
          onClick={OpenMenu}
        ></div>
      )}

      {/* Mobile Menu Sidebar */}
      <div className={`sm:hidden fixed top-0 left-0 h-full z-50 bg-[#F7F7F7] overflow-x-hidden transform transition-transform duration-300 ease-in-out ${Menu ? "translate-x-0" : "-translate-x-full"} `}>
        <div className="flex justify-between items-center p-2 border-b border-gray-200">
           <Link to={`/`}>
                      <img src={logo} alt="" className="sm:w-[100px] w-[100px]" />
                    </Link>
                   <div className=" cursor-pointer bg-[#B8B6FA99] text-[#4440E6] px-1.5 py-1.5 rounded-sm">
<svg
                onClick={OpenMenu}
                width={25}
                aria-hidden="true"
                role="presentation"
                className="elementor-menu-toggle__icon--close e-font-icon-svg e-eicon-close"
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M742 167L500 408 258 167C246 154 233 150 217 150 196 150 179 158 167 167 154 179 150 196 150 212 150 229 154 242 171 254L408 500 167 742C138 771 138 800 167 829 196 858 225 858 254 829L496 587 738 829C750 842 767 846 783 846 800 846 817 842 829 829 842 817 846 804 846 783 846 767 842 750 829 737L588 500 833 258C863 229 863 200 833 171 804 137 775 137 742 167Z"></path>
              </svg>
                   </div>

           
        </div>
        
        <div className="overflow-y-auto h-full pb-20">
          <ul className="flex flex-col space-y-0 ">
            <li>
              <NavLink 
                to="/" 
                className="block py-3 px-4 text-[#333333] font-medium rounded-md transition-colors hover:bg-gray-100"
                onClick={handleLinkClick}
              >
                HOME
              </NavLink>
            </li>
            
            {BrandsData?.map((category, index) => (
              <li key={index} className="border-b border-gray-200 last:border-b-0">
                <div className="flex justify-between items-center">
                  <NavLink
                    to={`/category/${category?.slug}`}
                    className="block py-3 px-4 text-[#333333] font-medium flex-grow transition-colors hover:bg-gray-100"
                    onClick={handleLinkClick}
                  >
                    {category.name}
                  </NavLink>
                  
                  {category.midcategories?.length > 0 && (
                    <button 
                      className="p-3 mr-2"
                      onClick={() => toggleMobileSubmenu(category)}
                    >
                      <FaAngleDown 
                        className={`transition-transform duration-300 ${mobileSubmenu === category.name ? 'rotate-180' : ''}`} 
                        size={15} 
                      />
                    </button>
                  )}
                </div>
                
                {category.midcategories?.length > 0 && (
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${mobileSubmenu === category.name ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="pl-6 pb-2">
                      {category.midcategories.map((submenu, subIndex) => (
                        <li key={subIndex}>
                          <NavLink
                            to={`/sub-category/${submenu.slug}`}
                            className="text-sm text-[#333333] font-medium flex items-center py-2 px-4 rounded-md transition-colors hover:bg-gray-100"
                            onClick={handleLinkClick}
                          >
                            <img src={`${BaseUrl}/${submenu?.icon}`} alt="" className="w-6 h-6 mr-2 object-contain" />
                            {submenu.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
            
            <li className="border-b border-gray-200 last:border-b-0">
              <NavLink 
                to="/portfolio" 
                className="block py-3 px-4 text-[#333333] font-medium rounded-md transition-colors hover:bg-gray-100"
                onClick={handleLinkClick}
              >
                Portfolio
              </NavLink>
            </li>
            
            <li className="border-b border-gray-200 last:border-b-0">
              <NavLink 
                to="/blog" 
                className="block py-3 px-4 text-[#333333] font-medium rounded-md transition-colors hover:bg-gray-100"
                onClick={handleLinkClick}
              >
                Blog
              </NavLink>
            </li>
            
            <li className="border-b border-gray-200 last:border-b-0">
              <NavLink 
                to="/about-us" 
                className="block py-3 px-4 text-[#333333] font-medium rounded-md transition-colors hover:bg-gray-100"
                onClick={handleLinkClick}
              >
                About us
              </NavLink>
            </li>
            
            <li className="border-b border-gray-200 last:border-b-0">
              <NavLink 
                to="/contact-us" 
                className="block py-3 px-4 text-[#333333] font-medium rounded-md transition-colors hover:bg-gray-100"
                onClick={handleLinkClick}
              >
                Contact us
              </NavLink>
            </li>
          </ul>

         
        </div>
      </div>
    </div>
  );
};

export default BottomNav;