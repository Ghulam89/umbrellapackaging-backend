import React, { useState } from "react";

const Tabs = ({ tabs, defaultTab, className }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <div>
      <div className="flex   gap-3  overflow-x-auto whitespace-nowrap">
        {tabs.map((tab) => (
          <button
            key={tab.title}
            className={`px-4 cursor-pointer rounded-xl text-sm py-4 ${className} ${
              activeTab === tab.title
                ? "  bg-[#4440E6]     opacity-50  w-full text-white"
                : "  w-full border hover:bg-[#4440E6] hover:text-white hover:border-[#4440E6] opacity-90  border-gray-300"
            }`}
            onClick={() => setActiveTab(tab.title)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.map((tab) => (
          <div
            key={tab.title}
            className={activeTab === tab.title ? "" : "hidden"}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
