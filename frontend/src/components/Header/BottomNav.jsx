import React, { useEffect, useState } from "react";
import { FaAngleDown, FaTimes } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
import BrandsData from "../../api/BrandsData";
import { logo } from "../../assets";
import { prefetchSubCategory } from "../../utils/prefetchUtils";

const BottomNav = React.memo(({ Menu, OpenMenu, setCategoriesLoaded }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [allCategories, setAllCategories] = useState(BrandsData);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Static data - immediately set as loaded, no API call needed
    setCategoriesLoaded(true);
    
    // API call commented out temporarily - using static BrandsData only
    // const fetchCategories = async () => {
    //   try {
    //     const response = await axios.get(`${BaseUrl}/brands/getAll`, {
    //       timeout: 5000
    //     });
    //     if (response?.data?.data?.length) {
    //       setAllCategories(response.data.data);
    //     }
    //   } catch (error) {
    //     console.error('Category fetch failed, using fallback:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
  }, [setCategoriesLoaded]);
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
            <NavLink to="/" className="transition-colors text-[#333333] font-medium">
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
                className="flex items-center gap-1 text-[#333333] uppercase py-2.5 text-sm font-medium transition-colors"
              >
                {category.name}
                {category.midcategories?.length > 0 && (
                  <FaAngleDown className="ml-1" size={15} />
                )}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/portfolio" className="uppercase font-medium text-[#333333] transition-colors">
              Portfolio
            </NavLink>
          </li>
          <li>
            <Link to="/blogs" className="uppercase font-medium text-[#333333] transition-colors">
              Blog
            </Link>
          </li>
          <li>
            <NavLink to="/about-us" className="uppercase font-medium text-[#333333] transition-colors">
              About us
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact-us" className="uppercase font-medium text-[#333333] transition-colors">
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
                    key={submenu._id || index}
                    onClick={handleCategoryLeave}
                    to={`/sub-category/${submenu.slug}`}
                    className="flex font-semibold text-[#333333] capitalize gap-1 items-center transition-colors"
                    onMouseEnter={() => {
                      if (submenu?.slug) {
                        prefetchSubCategory(submenu.slug);
                      }
                    }}
                    onMouseDown={() => {
                      if (submenu?.slug) {
                        prefetchSubCategory(submenu.slug, true);
                      }
                    }}
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
      <div className={`sm:hidden fixed top-0 h-full left-0  z-50 bg-[#F7F7F7]  transform transition-transform duration-300 ease-in-out ${Menu ? "translate-x-0" : "-translate-x-full"} sm:w-80 w-64`}>
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <Link to={`/`} onClick={handleLinkClick}>
            <img src={logo} alt="" className="w-[100px]" />
          </Link>
          <div className="cursor-pointer bg-[#B8B6FA99] text-[#4440E6] p-2 rounded-sm" onClick={OpenMenu}>
            <FaTimes size={20} />
          </div>
        </div>
        
        <div className=" overflow-y-auto pb-20">
          {/* {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4440E6]"></div>
            </div>
          ) : ( */}
            <ul className="flex flex-col">
              <li className="border-b border-gray-200">
                <NavLink 
                  to="/" 
                  className="block py-3 px-4 text-[#333333] font-medium transition-colors hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  HOME
                </NavLink>
              </li>
              
              {BrandsData?.map((category, index) => (
                <li key={index} className="border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <NavLink
                      to={`/category/${category?.slug}`}
                      style={{fontSize:'13px'}}
                      className="block py-3 px-4  text-[#333333] font-medium flex-grow transition-colors hover:bg-gray-100"
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
                    <div className={`  overflow-y-auto  h-48 transition-all duration-500 ease-in-out ${mobileSubmenu === category.name ? 'max-h-[500px]' : 'max-h-0'}`}>
                      <ul className="pl-2 pb-2">
                        {category.midcategories.map((submenu, subIndex) => (
                          <li key={subIndex} className="border-t border-gray-100">
                            <NavLink
                              to={`/sub-category/${submenu.slug}`}
                              className="text-sm text-[#333333] font-medium flex items-center py-2 px-4 transition-colors hover:bg-gray-100"
                              onClick={handleLinkClick}
                              onMouseEnter={() => {
                                if (submenu?.slug) {
                                  prefetchSubCategory(submenu.slug);
                                }
                              }}
                              onMouseDown={() => {
                                if (submenu?.slug) {
                                  prefetchSubCategory(submenu.slug, true);
                                }
                              }}
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
              
              <li className="border-b border-gray-200">
                <NavLink 
                  to="/portfolio" 
                  className="block py-3 px-4 text-[#333333] font-medium transition-colors hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  Portfolio
                </NavLink>
              </li>
              
              <li className="border-b border-gray-200">
                <NavLink 
                  to="/blogs" 
                  className="block py-3 px-4 text-[#333333] font-medium transition-colors hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  Blog
                </NavLink>
              </li>
              
              <li className="border-b border-gray-200">
                <NavLink 
                  to="/about-us" 
                  className="block py-3 px-4 text-[#333333] font-medium transition-colors hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  About us
                </NavLink>
              </li>
              
              <li className="border-b border-gray-200">
                <NavLink 
                  to="/contact-us" 
                  className="block py-3 px-4 text-[#333333] font-medium transition-colors hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  Contact us
                </NavLink>
              </li>
            </ul>
          {/* )} */}
        </div>
      </div>
    </div>
  );
});

export default BottomNav;