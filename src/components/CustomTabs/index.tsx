import React, { useState } from "react";

interface Tab {
  key: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeKey: string;
  onChange: (key: string) => void;
}

const CustomTabs: React.FC<TabsProps> = ({ tabs, activeKey, onChange }) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-wrap overflow-x-auto rounded-lg bg-[#f4f4f4] p-1 scrollbar-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`py-1 px-4 font-medium rounded-md transition-all duration-200
            ${activeKey === tab.key ? "text-[#ff004d] bg-white shadow-md" : "text-[#495057] bg-[#f4f4f4]"}      
          `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div></div>
    </div>
  );
};
export default CustomTabs;
