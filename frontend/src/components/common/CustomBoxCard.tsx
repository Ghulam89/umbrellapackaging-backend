import React from "react";
import Button from "./Button";

const CustomBoxCard = ({ title, subTitle, description, image, buttonUrl }) => {
  return (
    <div className="bg-[#F7F7F7] rounded-md p-2">
      <div className="flex  sm:flex-row  flex-col items-center">
        <div className="sm:w-6/12 w-full">
          <div className="sm:p-5 p-3">
            <h1>{title}</h1>
            <h2 className="pt-4">{subTitle}</h2>
            <p className="pt-2.5">{description}</p>
            <Button
              label={"Get Quote"}
              className="bg-[#4440E6] text-white mt-2 opacity-90"
              onClick={() => window.location.href = buttonUrl}
            />
          </div>
        </div>
        <div className="sm:w-6/12 w-full">
          <img
            src={image}
            className="rounded-lg"
            alt={title}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomBoxCard;