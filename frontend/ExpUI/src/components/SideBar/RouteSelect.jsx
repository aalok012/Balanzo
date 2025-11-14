import React from "react";
import { FiHome } from "react-icons/fi";

const Route = ({ Icon, selected, title }) => {
    return (
        <div className={`flex items-center gap-2 p-2 rounded ${selected ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}>
            <Icon />
            <span>{title}</span>
        </div>
    );
};

export const RouteSelect = () => {
    return (
        <div className="space-y-1">
            <Route Icon={FiHome} selected={true} title="Dashboard" />
           
        </div>
    );
};
