import React, { useEffect, useState, useRef, useCallback } from "react";
import CategoryCard from "../common/CategoryCard";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";

const CustomPackaging = () => {
  const [categories, setCategories] = useState([]);
  const [visibleItems, setVisibleItems] = useState(6); // Initially show 6 items
  const observer = useRef();
  const loadingRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        // Load more items when the loader becomes visible
        setVisibleItems(prev => prev + 6);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  const fetchData = async () => {
    const response = await axios.get(`${BaseUrl}/redis/category/getAll?categories=Rigid Boxes,Retail Boxes,Subscription Boxes,Custom Display Boxes​,Apparel and Fashion Boxes,Candle Boxes,Bakery Boxes,Cardboard boxes,CBD Boxes,Chocolate Boxes,Cosmetics and Beauty Boxes,Food Boxes,Gift Boxes,Jewelry Boxes,Kraft Packaging,Magnetic Closure Boxes,Mailer Boxes,Pillow Boxes, ​`);
    setCategories(response?.data?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="sm:max-w-6xl max-w-[95%] pt-2 mx-auto">
        <div className="bg-[#F7F7F7] text-center my-7 py-4 sm:px-9 px-2 rounded-md w-full">
          <h1 className="sm:text-[35px] text-[25px] font-sans font-[600] text-[#333333]">
            Discover Our Custom Packaging Variety
          </h1>
          <p className="pt-3 pb-6 text-sm">
            Check out all the different types of boxes we have at Umbrella
            Custom Packaging! We have special categories for boxes that you can
            customize just the way you like. You get to choose whether it's the
            size, the material, or how it looks. So, have a look and pick the
            perfect box for you!
          </p>

          <div className="grid sm:grid-cols-3 grid-cols-2 mx-auto gap-5 mt-3.5 justify-between">
            {categories?.slice(0, visibleItems).map((item, index) => (
              <div key={index} className="w-full">
                <CategoryCard data={item} />
              </div>
            ))}
          </div>
          
          {visibleItems < categories.length && (
            <div ref={loadingRef} className="flex justify-center py-4">
              <div className="animate-pulse text-gray-500">Loading more categories...</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomPackaging;