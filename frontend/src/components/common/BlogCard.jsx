import { Link } from "react-router-dom";
import { BaseUrl } from "../../utils/BaseUrl";
import Button from "./Button";

const stripHtml = (html) => {
  if (!html) return "";
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

const BlogCard = ({ data }) => {
  const previewText = stripHtml(data?.content).slice(0, 150) + "...";

  return (
    <div className="group relative">
      <Link to={`/blog/${data?.slug}`}>
        <div className="p-3 rounded-[10px] h-96 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          {/* Blog Image */}
          <div className="w-full h-40 overflow-hidden rounded-[10px]">
            <picture>
              <source
                srcSet={`${BaseUrl}/images/${data?.image?.split('/').pop()?.replace(/\.[^/.]+$/, '')}_small.webp`}
                media="(max-width: 640px)"
                type="image/webp"
              />
              <source
                srcSet={`${BaseUrl}/images/${data?.image?.split('/').pop()?.replace(/\.[^/.]+$/, '')}_medium.webp`}
                media="(max-width: 1024px)"
                type="image/webp"
              />
              <source
                srcSet={`${BaseUrl}/images/${data?.image?.split('/').pop()?.replace(/\.[^/.]+$/, '')}_large.webp`}
                media="(min-width: 1025px)"
                type="image/webp"
              />
              <img
                src={`${BaseUrl}/${data?.image}`}
                alt={data?.title}
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
              />
            </picture>
          </div>

          {/* Blog Content */}
          <div className="p-4 text-center text-[#333333]">
            <h2 className="text-xl font-semibold text-gray-800 line-clamp-2 mb-2">
              {data?.title?.slice(0, 70)}
            </h2>

            <p className="text-gray-600 line-clamp-3 mb-4 text-sm">
              {previewText}
            </p>

            <div className="absolute bottom-4 left-0 flex justify-center items-center w-full">
              <Button
                className="bg-transparent border border-[#4440E6] text-[#4440E6] font-medium px-4 py-2 rounded-lg 
                           hover:bg-[#4440E6] hover:text-white transition-colors duration-300 uppercase"
                label="Continue Reading"
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};


export default BlogCard
