import React from "react";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../utils/BaseUrl";

const CategoryCard = ({data}) => {
  return (
    <>
      <Link to={`/sub-category/${data?.slug}`}>
        <div className="">
          <div className="  sm:h-64 h-44">
          <img src={`${BaseUrl}/${data?.image}`} alt={data?.imageAltText} className=" w-full h-full  rounded-xl" />
          </div>
          <h2 className="  text-base font-semibold text-[#333333]   uppercase py-5">{data?.title}</h2>
        </div>
      </Link>
    </>
  );
};

export default CategoryCard;
