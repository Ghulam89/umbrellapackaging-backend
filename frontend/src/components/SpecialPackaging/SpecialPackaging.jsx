import Tabs from "../common/Tabs";
import SpecialCard from "../common/SpecialCard";
import { special1, special10, special11, special12, special13, special14, special15, special16, special17, special18, special2, special3, special4, special5, special6, special7, special8, special9 } from "../../assets";
const SpecialPackaging = () => {
  const customBox = [
    {
      id: 1,
      title: "Embossing",
      
      images:[
        special1,
        special2,
        special3
      ]
    },
    {
      id: 2,
      title: "Debossing",
      images:[
        special4,
        special5,
        special6
      ]
    },
    {
        id: 2,
        title: "Silver Foiling",
        images:[
          special7,
        special8,
        special9
        ]
      },
      {
        id: 2,
        title: "Gold Foiling",
        images:[
           special10,
        special11,
        special12
        ]
      },
      {
        id: 2,
        title: "Spot UV",
        images:[
           special13,
        special14,
        special15
        ]
      },
      {
        id: 2,
        title: "Holographic",
        images:[
          special16,
        special17,
        special18
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
          <h2 className="sm:text-[35px] text-[25px]   leading-9     font-sans   font-[600] text-[#333333] ">
        Enhance Your Product Presentation with Our Special Packaging Features

        </h2>
       
      </div >
      <div className=" pt-2">
        <Tabs defaultTab={"Embossing"} className={' bg-white'} tabs={data} />
      </div>
    </div>
  );
};

export default SpecialPackaging;
