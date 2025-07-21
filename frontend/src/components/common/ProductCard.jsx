import React from "react";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../utils/BaseUrl";

const ProductCard = ({data}) => {

  console.log(data);
  
  return (
    <>
      <Link state={{ productSlug: data._id}} to={`/${data?.slug}`}>
        <div className="">
          <div className="  sm:h-64 h-44">
          <img src={`${BaseUrl}/${data?.images?.[0]?.url}`} alt="" className=" w-full h-full  rounded-xl" />
          </div>
          <h5 className="  text-center font-semibold text-[#333] text-base   py-5">{data?.name}</h5>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
