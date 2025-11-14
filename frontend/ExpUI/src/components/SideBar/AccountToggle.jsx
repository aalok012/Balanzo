import React, { useState } from "react";
import profileImg from "../../images/profile-img.jpeg";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export const AccountToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center"
      >
        <img
          src={profileImg}
          alt="avatar"
          className="size-8 rounded shrink-0 bg-violet-500 shadow"
        />
        <div className="text-start">
          <span className="text-sm font-bold block">Alok Kumar</span>
          <span className="text-xs text-stone-600 block">
            aalok@gmail.com
          </span>
        </div>
        {isOpen ? (
          <FiChevronUp className="absolute right-2 top-1/2 -translate-y-1/2 text-xs" />
        ) : (
          <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-xs" />
        )}
      </button>
      {/* Example content to show when open; adjust or remove as needed */}
      {isOpen && (
        <div className="mt-2 text-xs text-stone-600">
          Account menu goes here...
        </div>
      )}
    </div>
  );
};
