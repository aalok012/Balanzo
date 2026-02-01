import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiHome, FiShoppingCart, FiActivity } from "react-icons/fi";
import { TfiBarChartAlt } from "react-icons/tfi";
import { MdInsights } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

const Route = ({ Icon, active, title, onClick, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = React.Children.count(children) > 0;

  return (
    <div>
      <button
        type="button"
        className={`flex w-full items-center justify-start gap-2 rounded-xl px-2.5 py-1.5 text-xs font-medium transition-[background,box-shadow,color,transform] ${
          active
            ? "bg-white/10 text-[#E8EAED] shadow-[0_0_0_1px_rgba(48,120,255,0.7)]"
            : "text-slate-400 hover:bg-white/5 hover:text-[#E8EAED]"
        }`}
        onClick={() => {
          if (onClick) onClick();
          if (hasChildren) setIsOpen((prev) => !prev);
        }}
      >
        <Icon className="h-3.5 w-3.5" />
        <span>{title}</span>
        {hasChildren && (
          <span className="ml-auto text-[10px]">{isOpen ? "▴" : "▾"}</span>
        )}
      </button>
      {hasChildren && isOpen && (
        <div className="ml-6 mt-1 space-y-1">{children}</div>
      )}
    </div>
  );
};

export const RouteSelect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const detailsActive = path.startsWith("/Dashboard/details");
  const monthlyActive = path.startsWith("/Dashboard/monthly-breakdowns");

  return (
    <div className="space-y-1 text-[11px]">
      <Route
        Icon={FiHome}
        title="Dashboard"
        active={path.startsWith("/Dashboard")}
        onClick={() => navigate("/Dashboard")}
      />

      <Route Icon={FiShoppingCart} title="Add Expense" active={path === "/expenses/new"}>
        <button
          onClick={() => navigate("/expenses/new")}
          className="block w-full text-left text-[10px] text-slate-400 transition hover:text-[#E8EAED]"
        >
          Add new expense
        </button>
      </Route>

      <Route Icon={TbListDetails} title="Details" active={detailsActive}>
        <button
          onClick={() => navigate("/Dashboard/details/date")}
          className="block w-full text-left text-[10px] text-slate-400 transition hover:text-[#E8EAED]"
        >
          By date
        </button>
        <button
          onClick={() => navigate("/Dashboard/details/category")}
          className="block w-full text-left text-[10px] text-slate-400 transition hover:text-[#E8EAED]"
        >
          By category
        </button>
      </Route>

      <Route
        Icon={TfiBarChartAlt}
        title="Monthly breakdowns"
        active={monthlyActive}
        onClick={() => navigate("/Dashboard/monthly-breakdowns")}
      />
      <Route Icon={FiActivity} title="Activity" active={false} />
      <Route Icon={MdInsights} title="Insights" active={false} />
    </div>
  );
};
