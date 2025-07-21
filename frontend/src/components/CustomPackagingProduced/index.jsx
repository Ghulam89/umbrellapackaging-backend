import React from "react";
import Tabs from "../common/Tabs";
import SpecialCard from "../common/SpecialCard";
import ProducedCard from "../common/ProducedCard";
const CustomPackagingProduced = () => {
  const customBox = [
    {
      id: 1,
      title: "Price Quote",
      data: [
        {
          title: "Get Price Quote",
          desc: "Submit a request for free custom quote first through our website or calling our customer service representative. You will have the prices in 30 minutes.",
        },
        {
          title: "Price Matching",
          desc: "Match the price with your budget line and ask the representative to beat that. We will try our best to give you the lowest possible prices here at Umbrella Custom Packaging.",
        },
        {
          title: "Price Approval",
          desc: "Give your approval on the prices to proceed with the order right away. We will be delighted to take you on board with Umbrella Custom Packaging throughout your packaging needs.",
        },
      ],
    },
    {
      id: 2,
      title: "Design Approval",
      data: [
        {
          title: "Mockup/design Creation",
          desc: "Share your artwork file to the dedicated representative so that our design department can create a 3D digital mockup for you. You can ask for the template to design it by your own as well.",
        },
        {
          title: "Design Suggestions",
          desc: "It’s a very important step. Our Creative design team can provide you some creative design suggestions if you ask for that. It’s a certain value addition to your packaging.",
        },
        {
          title: "Mockup/design Approval",
          desc: "After you receive a 3D digital Mockup for your packaging, you need to approve that in order to proceed ahead. You can ask for frequent changes until it satisfies you before you approve it.",
        },
      ],
    },
    {
      id: 2,
      title: "Payment",
      data: [
        {
          title: "Get Price Quote",
          desc: "Submit a request for free custom quote first through our website or calling our customer service representative. You will have the prices in 30 minutes.",
        },
        {
          title: "Price Matching",
          desc: "Match the price with your budget line and ask the representative to beat that. We will try our best to give you the lowest possible prices here at Umbrella Custom Packaging.",
        },
        {
          title: "Price Approval",
          desc: "Give your approval on the prices to proceed with the order right away. We will be delighted to take you on board with Umbrella Custom Packaging throughout your packaging needs.",
        },
      ],
    },
    {
      id: 2,
      title: "Production",
      data: [
        {
          title: "Get Price Quote",
          desc: "Submit a request for free custom quote first through our website or calling our customer service representative. You will have the prices in 30 minutes.",
        },
        {
          title: "Price Matching",
          desc: "Match the price with your budget line and ask the representative to beat that. We will try our best to give you the lowest possible prices here at Umbrella Custom Packaging.",
        },
        {
          title: "Price Approval",
          desc: "Give your approval on the prices to proceed with the order right away. We will be delighted to take you on board with Umbrella Custom Packaging throughout your packaging needs.",
        },
      ],
    },
    {
      id: 2,
      title: "Shipping",
      data: [
        {
          title: "Get Price Quote",
          desc: "Submit a request for free custom quote first through our website or calling our customer service representative. You will have the prices in 30 minutes.",
        },
        {
          title: "Price Matching",
          desc: "Match the price with your budget line and ask the representative to beat that. We will try our best to give you the lowest possible prices here at Umbrella Custom Packaging.",
        },
        {
          title: "Price Approval",
          desc: "Give your approval on the prices to proceed with the order right away. We will be delighted to take you on board with Umbrella Custom Packaging throughout your packaging needs.",
        },
      ],
    },
    {
      id: 2,
      title: "Recorders",
      data: [
        {
          title: "Get Price Quote",
          desc: "Submit a request for free custom quote first through our website or calling our customer service representative. You will have the prices in 30 minutes.",
        },
        {
          title: "Price Matching",
          desc: "Match the price with your budget line and ask the representative to beat that. We will try our best to give you the lowest possible prices here at Umbrella Custom Packaging.",
        },
        {
          title: "Price Approval",
          desc: "Give your approval on the prices to proceed with the order right away. We will be delighted to take you on board with Umbrella Custom Packaging throughout your packaging needs.",
        },
      ],
    },
  ];

  const data = customBox.map((box) => ({
    title: box.title,
    content: <ProducedCard {...box} />,
  }));

  return (
    <div className="sm:max-w-6xl bg-[#F7F7F7] p-3 py-9 rounded-xl max-w-[95%] mx-auto">
      <div className="text-center pb-3">
        <h1 className="text-[#333333] font-semibold">
          Simple Steps to get the Custom Packaging Produced
        </h1>
        <p className=" pt-3 text-gray-600">
          Following are few steps which provide the complete Guide.
        </p>
      </div>
      <div className="">
        <Tabs defaultTab={"Price Quote"} tabs={data} />
      </div>
    </div>
  );
};

export default CustomPackagingProduced;
