import React, { useState, useEffect, useRef } from "react";
import Button from "../common/Button";
import BottomNav from "./BottomNav";
import { Link } from "react-router-dom";
import axios from "axios";
import AddReviews from "../CustomerReviews/AddReviews";
import Input from "../common/Input";
import GetQuoteModal from "../common/GetQuoteModal";
import { BaseUrl } from "../../utils/BaseUrl";
import { logo } from "../../assets";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const searchRef = useRef(null);

  const OpenMenu = () => {
    // Only open menu if categories are loaded
    if (categoriesLoaded) {
      setMenu(!menu);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length < 2) {
      setShowResults(false);
      setSearchResults([]);
      return;
    }
    
    setIsSearchLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/products/search?name=${query}`);
      setSearchResults(response.data.data);
      setShowResults(true);
    } catch (error) {
      console.error("Error searching products:", error);
      setSearchResults([]);
    } finally {
      setIsSearchLoading(false);
    }
  };

  const handleResultClick = () => {
    setShowResults(false);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [IsModalOpen, setIsModalOpen] = useState(false)
  const [ReviewModalOpen, setReviewModalOpen] = useState(false)

  return (
    <div className="bg-[#F7F7F7] sticky top-0 z-50 sm:pb-2.5 pb-0">
      <div className="sm:max-w-6xl relative max-w-[95%] mx-auto">
        <div className="flex space-x-5 w-full justify-between h-20 items-center">
          <Link to={`/`} aria-label="Visit Umbrella Packaging">
            <img src={logo} alt="" className="sm:w-[135px] w-[135px]" />
          </Link>
          <div className="w-lg sm:relative search-container" ref={searchRef}>
            <Input
              placeholder={"Search For Products"}
              className={"rounded-full p-2.5 w-full border-2 bg-white border-gray-300"}
              value={searchQuery}
              onChange={handleSearch}
            />
            {showResults && (
              <div className="absolute z-50 mt-1 left-0 w-full max-w-2xl bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                {isSearchLoading ? (
                  <div className="flex justify-center items-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4440E6]"></div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 p-4">
                    {searchResults.map((product) => (
                      <Link
                        key={product._id}
                        to={`/${product.slug}`}
                        onClick={handleResultClick}
                        className="block"
                      >
                        <div className="bg-[#F7F7F7] p-3 rounded-xl hover:shadow-md transition-all h-full">
                          <div className="aspect-square mb-2">
                            <img
                              src={`${BaseUrl}/${product?.images?.[0]?.url}`}
                              alt={product.name}
                              className="w-full h-full object-contain rounded-xl"
                            />
                          </div>
                          <h6 className="text-center font-semibold text-[#333] line-clamp-2">
                            {product?.name}
                          </h6>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No products found
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="sm:block hidden">
            <div className="flex items-center justify-between gap-2.5">
              <Link to={'/reviews'} className=" ">
                <div style={{fontSize:'16px !important'}}>
                  <Button
                    className="text-[#4440E6]  bg-white border border-[#4440E6]"
                    label={"Reviews"}
                  />
                </div>
              </Link>
              <div>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#4440E6] text-white"
                  label={"Get Quote"}
                />
              </div>
            </div>
          </div>

          <div className="block sm:hidden cursor-pointer bg-[#B8B6FA99] text-[#4440E6] px-1.5 py-1.5 rounded-sm">
            {menu ? (
              <svg
                onClick={OpenMenu}
                width={25}
                aria-hidden="true"
                role="presentation"
                className="elementor-menu-toggle__icon--open e-font-icon-svg e-eicon-menu-bar"
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M104 333H896C929 333 958 304 958 271S929 208 896 208H104C71 208 42 237 42 271S71 333 104 333ZM104 583H896C929 583 958 554 958 521S929 458 896 458H104C71 458 42 487 42 521S71 583 104 583ZM104 833H896C929 833 958 804 958 771S929 708 896 708H104C71 708 42 737 42 771S71 833 104 833Z"></path>
              </svg>
            ) : (
              <svg
                onClick={OpenMenu}
                width={25}
                aria-hidden="true"
                role="presentation"
                className="elementor-menu-toggle__icon--open e-font-icon-svg e-eicon-menu-bar"
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M104 333H896C929 333 958 304 958 271S929 208 896 208H104C71 208 42 237 42 271S71 333 104 333ZM104 583H896C929 583 958 554 958 521S929 458 896 458H104C71 458 42 487 42 521S71 583 104 583ZM104 833H896C929 833 958 804 958 771S929 708 896 708H104C71 708 42 737 42 771S71 833 104 833Z"></path>
              </svg>
            )}
          </div>
        </div>
        
        <BottomNav 
          Menu={menu} 
          OpenMenu={OpenMenu} 
          setCategoriesLoaded={setCategoriesLoaded}
        />
      </div>

      <GetQuoteModal setIsModalOpen={setIsModalOpen} isModalOpen={IsModalOpen} />
      <AddReviews isModalOpen={ReviewModalOpen} setIsModalOpen={setReviewModalOpen} />
    </div>
  );
};

export default Navbar;