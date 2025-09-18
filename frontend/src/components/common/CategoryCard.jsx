import React from "react";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../utils/BaseUrl";

const CategoryCard = ({data}) => {
    // If no meaningful alt text is provided, fall back to descriptive or empty alt
  const altText = data?.imageAltText 
    ? data.imageAltText 
    : `${data?.title} category illustration`;
  return (
    <>
      <Link to={`/sub-category/${data?.slug}`} className=" ">
        <div className="">
          <div className="">
          <img src={`${BaseUrl}/${data?.image}`}   alt={altText} className=" w-full sm:h-62 h-auto object-cover overflow-hidden  rounded-lg" />
          </div>
          <h2 className="  sm:text-base text-sm font-semibold text-[#333333]   uppercase sm:py-5 py-2">{data?.title}</h2>
        </div>
      </Link>
    </>
  );
};

export default CategoryCard;
