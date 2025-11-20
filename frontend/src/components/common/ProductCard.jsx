import React from "react";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../utils/BaseUrl";
import { prefetchProduct } from "../../utils/prefetchUtils";

const ProductCard = ({data}) => {

  console.log(data);

  // Prefetch product data on hover
  const handleMouseEnter = () => {
    if (data?.slug) {
      prefetchProduct(data.slug);
    }
  };

  // Prefetch product data on mousedown (before click)
  const handleMouseDown = () => {
    if (data?.slug) {
      prefetchProduct(data.slug);
    }
  };
  
  return (
    <>
      <Link 
        state={{ productSlug: data._id}} 
        to={`/${data?.slug}`}
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleMouseDown}
      >
        <div className="">
          <div className="  ">
          <img src={`${BaseUrl}/${data?.images?.[0]?.url}`} alt="" className=" w-full sm:h-62 h-auto object-cover overflow-hidden  rounded-lg" />
          </div>
          <h3 className="  sm:text-base text-sm m-0 font-semibold text-[#333333]  text-center  uppercase sm:py-5 py-2">{data?.name}</h3>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
