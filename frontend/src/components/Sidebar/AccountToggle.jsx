import React from "react";
import profileImg from "../../images/profile-img.jpeg";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export const AccountToggle = () => {
    return (
        <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
            <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
                <img
                    src={profileImg}
                    alt="avatar"
                    className="size-8 roundded shrink-0 bg-violet-500 shadow"
                />
                <div className="text-start">
                    <span className="text-sm font-bold block">Alok Kumar</span>
                    <span className="text-xs text-stone-600 block">
                        {" "}
                        aalok@gmail.com{" "}
                    </span>
                </div>

                <FiChevronDown className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xm" />

                <FiChevronUp className="absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xm" />
            </button>
        </div>
    );
};
