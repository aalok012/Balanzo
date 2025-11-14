import React from "react";
import { SlCalender } from "react-icons/sl";
export const TopBar = () => {
  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-300">
      <div className="flex items-center justify-between p-0.5 ">
        <div>
          <span className="text-sm font-bold block "> Good Morning, Alok!</span>
          <span className="text-xs block text-stone-500">
            {" "}
            Friday, Nov 20, 2025
          </span>
        </div>

        <button className="flex text-sm items-center gap-2 bg-stone-100 hover:bg-violet-100  hover:text-violet-700 transition-colors px-3 py-1.5 rounded">
            <SlCalender />
            <span>Prev 1 month</span>
        </button>
      </div>
    </div>
  );
};
