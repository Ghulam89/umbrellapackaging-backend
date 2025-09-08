import React, { useState } from "react";
import Button from "../common/Button";
import Hero1 from "../../assets/images/web-banner.webp";
import Icon1 from '../../assets/images/icon/free quote.svg';
import Icon3 from '../../assets/images/icon/Free Design support.svg';
import Icon2 from '../../assets/images/icon/Free Lamination.svg';
import Icon4 from '../../assets/images/icon/free shipping.svg';
import Icon5 from '../../assets/images/icon/FSC Certified.svg';
import Icon6 from '../../assets/images/icon/Quickest Turnaround.svg';
import InstantQuoteModal from "../common/InstantQuoteModal";
import { Link } from "react-router-dom";
const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="   sm:max-w-6xl max-w-[95%] pt-5 mx-auto">

      <div className=" bg-[#B8B6FA99] flex sm:flex-row   flex-col-reverse  my-3.5 pt-3 sm:px-9 px-4 pb-4 rounded-md w-full">

        <div className=" sm:w-7/12  w-full">
          <div className=" hidden sm:block">
            <strong className=" text-[38px]  text-[#333333]  font-medium font-sans">Umbrella Custom Packaging</strong>
            <h2 className=" sm:text-2xl text-base  font-medium  text-[#4440E6]">Customize Everything Under This Umbrella</h2>
          </div>
          <div className="  hidden sm:block">
            <div className=" flex  mt-7 gap-2 flex-wrap items-center">
              <Link to={'/sub-category/fashion-apparel-packaging-boxes'}>
                <Button
                  label={"Apparel Boxes"}
                  className="   py-1 border border-[#4440E6] hover:bg-[#4440E6] hover:text-white "
                />
              </Link>
              <Link to={'/sub-category/food-packaging-boxes'}>
                <Button
                  label={"Food Boxes"}
                  className="  py-1 border border-[#4440E6] hover:bg-[#4440E6] hover:text-white"
                />
              </Link>
              <Link to={'/sub-category/cbd-packaging-boxes'}>
                <Button
                  label={"CBD Boxes"}
                  className="   py-1 border border-[#4440E6] hover:bg-[#4440E6] hover:text-white"
                />
              </Link>
              <Link to={'/sub-category/custom-cardboard-boxes'}>
                <Button
                  label={"Cardboard Boxes"}
                  className="   py-1 border border-[#4440E6] hover:bg-[#4440E6] hover:text-white"
                />
              </Link>

            </div>
          </div>

          <div className=" flex flex-wrap   mt-10 gap-2.5 items-center">
            <Button
              onClick={() => setIsModalOpen(true)}
              label={"Get Instant Quote"}
              className=" bg-[#4440E6]  text-white"
            />
            <Link to={'/dielines'}>
              <Button
                label={"Get Custom Template"}
                className="bg-[#4440E6] text-white"
              />
            </Link>

            <Link to={'/contact-us'}>
              <Button
                label={"Order Sample Kit"}
                className="bg-[#4440E6]  text-white"
              />
            </Link>

          </div>
        </div>

        <div className=" sm:w-6/12 w-full">

          <img src={Hero1} className="w-full"  alt="Hero image" fetchpriority="high"/>
        </div>
        <div className=" block sm:hidden">
          <strong className=" sm:text-[38px] text-[20px] text-[#333333]  font-medium font-sans">Umbrella Custom Packaging</strong>
          <h2 className=" sm:text-2xl text-sm  font-medium  text-[#4440E6]">Customize Everything Under This Umbrella</h2>
        </div>
      </div>
      <div className="bg-[#B8B6FA99] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-8 py-2.5  px-3 rounded-md w-full">
        <div className="flex gap-1 justify-start items-center">
          <img src={Icon1}  className=" sm:w-10 w-8" alt="Free Quote" />
          <strong className="text-[15px]  font-light  opacity-80">Free Quote</strong>
        </div>
        <div className="flex justify-start gap-1 items-center">
          <img src={Icon3} className="  sm:w-10 w-8"  alt="Free Design support" />
          <strong className="text-[15px] sm:whitespace-nowrap whitespace-pre-wrap text-[#111111] font-light  opacity-80">Free Design support</strong>
        </div>
        <div className="flex justify-center  gap-1 items-center">
          <img src={Icon2}  className=" sm:w-10 w-8"  alt="Free Lamination" />
          <strong className="text-[15px] font-light  opacity-80">Free Lamination</strong>
        </div>
        <div className="flex justify-center gap-1 items-center">
          <img src={Icon4} className="  sm:w-10 w-8"   alt="Free Shipping" />
          <strong className="text-[15px] font-light  opacity-80">Free Shipping</strong>
        </div>
        <div className="flex justify-center gap-1 items-center">
          <img src={Icon5}  className="  sm:w-10 w-8"  alt="FSC Certified" />
          <strong className="text-[15px] font-light  opacity-80">FSC Certified</strong>
        </div>
        <div className="flex  justify-start gap-1 items-center">
          <img src={Icon6}  className=" sm:w-10 w-8"  alt="Quickest Turnaround" />
          <strong className="text-sm font-medium text-gray-700 whitespace-nowrap">Quickest Turnaround</strong>
        </div>
      </div>


      <InstantQuoteModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
    </div>
  );
};

export default Hero;
