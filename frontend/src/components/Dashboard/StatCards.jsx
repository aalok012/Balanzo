import React from "react";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import api from "../../axiosApi.jsx";

export const StatCards = () => {
  const {
    data: totalData,
    isLoading: totalLoading,
    error: totalError,
  } = useQuery({
    queryKey: ["totalexpenses"],
    queryFn: async () => {
      const res = await api.get("/v1/expenses/sumAmount");
      return res.data.data; // array: [{ _id: null, totalAmt }]
    },
  });

  const {
    data: monthlyData,
    isLoading: monthlyLoading,
    error: monthlyError,
  } = useQuery({
    queryKey: ["monthlyAvg"],
    queryFn: async () => {
      const res = await api.get("/v1/expenses/monthlyAvg");
      return res.data.data; // array of { _id, avgAmt }
    },
  });

const mostRecentMonth = monthlyData?.[monthlyData.length - 1] ?? null;
const avgAmt = mostRecentMonth?.avgAmt || 0;
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dateString = mostRecentMonth 
  ? `${monthNames[mostRecentMonth._id.month - 1]} ${mostRecentMonth._id.year}`
  : "N/A";



    return (
        <>
            <Card 
                title="Total Expenses"
                value={totalData?.[0]?.totalAmt ?? 0}
                pillText="+12.5%"
                trend="up"
                period="From all time"
            />
            <Card 
            title="Monthly Expenses"
                value={avgAmt}
                pillText="+10.5%"
                trend="up"
                period={dateString}    
                 />
            <Card
            title="Total Income"
                value="$5,000"
                pillText="+0.5%"
                trend="up"
                period="Previous 30 days"/>
        </>
    );
};

const Card=({ //passing props for the card
    title,
    value,
    pillText,
    trend,
    period,
}) => {

    return(
        <div className=" col-span-4 p-4 rounded border border-stone-300  ">
            <div className="flex mb-8 items-start justify-between">
               <div>
                <h3 className="text-stone-500 mb-2 text-sm ">{title} </h3>
                <p className="text-3xl font-semibold">{value}</p>

            </div>
            
          <span
              className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${trend==="up "? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
               {trend==="up" ? <FiTrendingUp/> : <FiTrendingDown/> } {pillText}</span>
          
               </div>
            <p className="text-xs text-stone-500">{period}</p>

        </div>
    );
}
