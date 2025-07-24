import React, { useEffect, useState } from "react";
import { FaAngleDown, FaBed } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
const BottomNav = ({ Menu, OpenMenu }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const location = useLocation();

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/brands/getAll`);
      setAllCategories(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setAllCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setHoveredCategory(null);
    setSelectedCategory(null);
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
          {allCategories.map((category, index) => (
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
            className="absolute top-12 pt-1.5 left-0 w-full z-50"
            onMouseEnter={() => handleCategoryHover(hoveredCategory)}
            onMouseLeave={handleCategoryLeave}
          >
            <div className="bg-[#F7F7F7] mt-5">
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

      {/* Mobile Menu */}
      <div className={`sm:hidden ${Menu ? "block" : "hidden"} bg-[#F7F7F7]`}>
        <ul className="flex flex-col space-y-4 p-4">
          <li>
            <NavLink to="/" className="transition-colors  text-[#333333]  font-medium" onClick={OpenMenu}>
              HOME
            </NavLink>
          </li>
          {allCategories?.map((category, index) => (
            <li key={index}>
              <NavLink
                to={`/category/${category?.slug}`}
                className="flex items-center  font-sans gap-1 py-2.5 text-sm text-[#333333]  font-medium transition-colors"
                onClick={OpenMenu}
              >
                {category.name}
                {category.menu?.length > 0 && (
                  <FaAngleDown className="ml-1" size={15} />
                )}
              </NavLink>
              {category.midcategories?.length > 0 && (
                <ul className="pl-4">
                  {category.midcategories.map((submenu, subIndex) => (
                    <li key={subIndex}>
                      <NavLink
                        to={`/sub-category/${submenu.slug}`}
                        className="text-sm  text-[#333333]  font-medium flex gap-0.5 items-center transition-colors"
                        onClick={OpenMenu}
                      >
                        <img src={`${BaseUrl}/${submenu?.icon}`} alt="" className="w-7" />
                        {submenu.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li>
            <NavLink to="/portfolio" className="hover:text-orange-500 transition-colors  text-[#333333]  font-medium" onClick={OpenMenu}>
              Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className="hover:text-orange-500 transition-colors text-[#333333]  font-medium" onClick={OpenMenu}>
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/about-us" className="hover:text-orange-500 transition-colors text-[#333333]  font-medium" onClick={OpenMenu}>
              About us
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact-us" className="hover:text-orange-500 transition-colors  text-[#333333]  font-medium" onClick={OpenMenu}>
              Contact us
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BottomNav;