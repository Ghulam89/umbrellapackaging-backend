import React from "react";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../utils/BaseUrl";

const CategoryCard = ({ data }) => {
  const altText =
    data?.imageAltText?.trim()
      ? data.imageAltText
      : data?.title
        ? `${data.title} category illustration`
        : "Category illustration";

  return (
    <Link to={`/sub-category/${data?.slug}`} className="block">
      <div>
        <div>
          <img
            src={data?.image ? `${BaseUrl}/${data.image}` : ""}
            alt={altText}
            className="w-full sm:h-62 h-auto object-cover overflow-hidden rounded-lg"
            aria-label="Visit Umbrella Packaging"
          />
        </div>
        <h2 className="sm:text-base text-sm font-semibold text-[#333333] uppercase sm:py-5 py-2">
          {data?.title}
        </h2>
      </div>
    </Link>
  );
};

export default React.memo(CategoryCard);
