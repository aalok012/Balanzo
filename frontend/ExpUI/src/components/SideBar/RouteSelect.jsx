import React from "react";
import { FiHome, FiTrendingDown, FiShoppingCart, FiActivity } from "react-icons/fi";
import { TfiBarChartAlt } from "react-icons/tfi";
import { MdInsights } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

const Route = ({ Icon, selected, title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = React.Children.count(children) > 0;

  return (
    <div>
      <div
        className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] cursor-pointer ${
          selected
            ? "bg-white text-stone-950 shadow"
            : "hover:bg-stone-500 bg-transparent shadow-none"
        }`}
        onClick={() => hasChildren && setIsOpen((prev) => !prev)}
      >
        <Icon />
        <span>{title}</span>
        {hasChildren && (
          <span className="ml-auto">{isOpen ? "▼" : "▶"}</span>
        )}
      </div>
      {hasChildren && isOpen && (
        <div className="ml-6 mt-1 space-y-1">{children}</div>
      )}
    </div>
  );
};

export const RouteSelect = () => {
  return (
    <div className="space-y-1">
      <Route Icon={FiHome} selected={true} title="Dashboard" />

      <Route Icon={FiShoppingCart} selected={false} title="Add Expense">
        <button className="block w-full text-left text-xs text-stone-700 hover:text-stone-950">
          Add New
        </button>
      </Route>

      <Route Icon={TbListDetails} selected={false} title="Details">
        <button className="block w-full text-left text-xs text-stone-700 hover:text-stone-950">
          By Date
        </button>
        <button className="block w-full text-left text-xs text-stone-700 hover:text-stone-950">
          By Category
        </button>
      </Route>

      <Route Icon={TfiBarChartAlt} selected={false} title="Monthly Breakdowns" />
      <Route Icon={FiActivity} selected={false} title="Activity" />
      <Route Icon={MdInsights} selected={false} title="Insights" />
    </div>
  );
};
