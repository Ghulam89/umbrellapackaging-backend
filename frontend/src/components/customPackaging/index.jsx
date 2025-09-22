import React, { useEffect, useState } from "react";
import CategoryCard from "../common/CategoryCard";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";

const CustomPackaging = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BaseUrl}/redis/category/getAll?categories=Rigid Boxes,Retail Boxes,Subscription Boxes,Custom Display Boxes​,Apparel and Fashion Boxes,Candle Boxes,Bakery Boxes,Cardboard boxes,CBD Boxes,Chocolate Boxes,Cosmetics and Beauty Boxes,Food Boxes,Gift Boxes,Jewelry Boxes,Kraft Packaging,Magnetic Closure Boxes,Mailer Boxes,Pillow Boxes, `
      );
      setCategories(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const SkeletonLoader = () => (
    <div className="w-full bg-white rounded-lg overflow-hidden animate-pulse">
      <div className="h-44 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  );

  return (
    <div className="sm:max-w-6xl max-w-[95%] pt-2 mx-auto">
      <div className="bg-[#F7F7F7] text-center my-7 py-4 sm:px-5 px-2 rounded-md w-full">
        <h1 className="sm:text-[35px] text-[25px] font-sans font-[600] text-[#333333]">
          Discover Our Custom Packaging Variety
        </h1>
        <p className="pt-3 pb-6 text-sm">
          Check out all the different types of boxes we have at Umbrella Custom Packaging! 
          We have special categories for boxes that you can customize just the way you like. 
          Choose the size, the material, or how it looks. So, have a look and pick the perfect box for you!
        </p>

        <div className="grid sm:grid-cols-3 grid-cols-2 mx-auto gap-5 mt-3.5 justify-between">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <SkeletonLoader key={index} />
              ))
            : categories.length > 0
            ? categories.map((item) => (
                <CategoryCard key={item._id || item.slug} data={item} />
              ))
            : (
              <p className="col-span-full text-center text-gray-500">
                No categories available.
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default CustomPackaging;
