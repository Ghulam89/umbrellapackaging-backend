import React from "react";
import Tabs from "../common/Tabs";
import CustomBoxCard from "../common/CustomBoxCard";
import SpecialCard from "../common/SpecialCard";

const SpecialPackaging = () => {
  const customBox = [
    {
      id: 1,
      title: "Embossing",
      
      images:[
        "https://umbrellapackaging.com/wp-content/uploads/elementor/thumbs/6-quqt8hn0u9cayaz2pi9d79guc2u4yaawfvjb2ogiw0.webp",
        "https://umbrellapackaging.com/wp-content/uploads/elementor/thumbs/emboss11-r2398elma9uxenc1izlzn5xwzw7hyftpxr9j7cpabs.webp",
        "https://umbrellapackaging.com/wp-content/uploads/elementor/thumbs/2-1-r235qri8rhv5j1u36oh8cvbuhrh92x1cnw11vuzq14.webp"
      ]
    },
    {
      id: 2,
      title: "Debossing",
      images:[
        "https://umbrellapackaging.com/wp-content/uploads/elementor/thumbs/deboseing3-r235qw7eht95j3hj0bn739asfcmghncagqpb4ubj4w.webp",
        "https://umbrellapackaging.com/wp-content/uploads/elementor/thumbs/DEBOSING1-qvca7u2mrlo3qmd0yxyi77hyudlt665dk8pa5r1zew.webp",
        "https://umbrellapackaging.com/wp-content/uploads/elementor/thumbs/emboss12-r235qy343c45sbkj49bmcbo2ngktksrh0slg8spytk.webp"
      ]
    },
    {
        id: 2,
        title: "Silver Foiling",
        images:[
          "https://umbrellapackaging.com/wp-content/uploads/elementor/thumbs/silver6-r235qi3tnapuoy20anjsjuuvikjya6sbesx0xowfq8.webp",
          "https://umbrellapackaging.com/wp-content/uploads/elementor/thumbs/silver4-r21ndlvyk2nzgcpplos9nr2ape1vyx9hkv6ywsvxqg.webp",
          "https://umbrellapackaging.com/wp-content/uploads/elementor/thumbs/silver2-r23c54s9qr80yl7mzraky8jroe0qkel3c3y347f72g.webp"
        ]
      },
      {
        id: 2,
        title: "Gold Foiling",
        images:[
          "https://umbrellapackaging.com/wp-content/uploads/elementor/thumbs/6-quqt8hn0u9cayaz2pi9d79guc2u4yaawfvjb2ogiw0.webp",
          "https://umbrellapackaging.com/wp-content/uploads/elementor/thumbs/emboss11-r2398elma9uxenc1izlzn5xwzw7hyftpxr9j7cpabs.webp",
          "https://umbrellapackaging.com/wp-content/uploads/elementor/thumbs/2-1-r235qri8rhv5j1u36oh8cvbuhrh92x1cnw11vuzq14.webp"
        ]
      },
      {
        id: 2,
        title: "Spot UV",
        images:[
          "https://umbrellapackaging.com/wp-content/uploads/elementor/thumbs/6-quqt8hn0u9cayaz2pi9d79guc2u4yaawfvjb2ogiw0.webp",
          "https://umbrellapackaging.com/wp-content/uploads/elementor/thumbs/emboss11-r2398elma9uxenc1izlzn5xwzw7hyftpxr9j7cpabs.webp",
          "https://umbrellapackaging.com/wp-content/uploads/elementor/thumbs/2-1-r235qri8rhv5j1u36oh8cvbuhrh92x1cnw11vuzq14.webp"
        ]
      },
      {
        id: 2,
        title: "Holographic",
        images:[
          "https://umbrellapackaging.com/wp-content/uploads/elementor/thumbs/6-quqt8hn0u9cayaz2pi9d79guc2u4yaawfvjb2ogiw0.webp",
          "https://umbrellapackaging.com/wp-content/uploads/elementor/thumbs/emboss11-r2398elma9uxenc1izlzn5xwzw7hyftpxr9j7cpabs.webp",
          "https://umbrellapackaging.com/wp-content/uploads/elementor/thumbs/2-1-r235qri8rhv5j1u36oh8cvbuhrh92x1cnw11vuzq14.webp"
        ]
      },
  ];

  const data = customBox.map((box) => ({
    title: box.title,
    content: <SpecialCard {...box} />,
  }));

  return (
    
    <div className="sm:max-w-6xl bg-[#F7F7F7] p-3 max-w-[95%] mx-auto">
      <div className="text-center pb-3">
        <h1 className="text-[#333333] font-semibold">
        Enhance Your Product Presentation with Our Special Packaging Features

        </h1>
       
      </div >
      <div className="">
        <Tabs defaultTab={"Embossing"} tabs={data} />
      </div>
    </div>
  );
};

export default SpecialPackaging;
