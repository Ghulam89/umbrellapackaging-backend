import React, { useEffect, useState } from "react";
import CategoryCard from "../common/CategoryCard";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";

const CustomPackaging = () => {

  const [categories, setCategories] = useState([])

  const fetchData = async() => {
    const response = await axios.get(`${BaseUrl}/category/getAll?categories=Apparel and Fashion Boxes,Candle Boxes,Bakery Boxes,Cardboard boxes,CBD Boxes
,Chocolate Boxes,Cosmetics and Beauty Boxes,Custom Display Boxes,Food Boxes,Gift Boxes,Jewelry Boxes,Kraft Packaging,Magnetic Closure Boxes,Mailer Boxes,Pillow Boxes,Retail Boxes,Rigid Boxes,Subscription Boxes​`)

    setCategories(response?.data?.data)
  }


  useEffect(() => {
    fetchData()
  }, [])


  return (
    <>
      <div className="   sm:max-w-6xl max-w-[95%] pt-2 mx-auto">
        <div className=" bg-[#F7F7F7] text-center  my-7 p-4 rounded-md w-full">
          <h1 className=" text-[#333333] font-semibold">
            Discover Our Custom Packaging Variety
          </h1>
          <p className="  pt-3 pb-6 text-sm">
            Check out all the different types of boxes we have at Umbrella
            Custom Packaging! We have special categories for boxes that you can
            customize just the way you like. You get to choose whether it’s the
            size, the material, or how it looks. So, have a look and pick the
            perfect box for you!
          </p>

          <div className=" grid sm:grid-cols-3 grid-cols-2  space-x-4 space-y-3 mt-3.5 justify-between">

            {categories?.map((item, index) => {
              return <div>
                <CategoryCard data={item} />
              </div>
            })}

          </div>
        </div>
      </div>
    </>
  );
};

export default CustomPackaging;
