import React from "react";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";


export const StatCards = () => { 
    return (
        <>
            <Card 
                title="Total Expenses"
                value="$5,024"
                pillText="+12.5%"
                trend="up"
                period="From Aug 1 to May 1"
            />
            <Card 
            title="Monthly Expenses"
                value="$2,024"
                pillText="+10.5%"
                trend="up"
                period="From Aug 1 to May 1"/>
            <Card
            title="Total Income"
                value="$25,024"
                pillText="+10.5%"
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