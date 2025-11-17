import React from "react";
import {FiUser} from "react-icons/fi";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import api from "../../axiosApi.js";      // or "../../axiosApi"




export const ActivityGraph  = () => {


const { data, isLoading, error } = useQuery({
  queryKey: ["monthlyAvg"],
  queryFn: async () => {
    const res = await api.get("v1/expenses/monthlyAvg");
    return res.data.data; // array of months
  }
});
const incomeBase = 5000;
let getIncomeForMonth = (base, monthIndex) => {
  // monthIndex starts from 0 → 7 months → 0 to 6
  return base * Math.pow(1.05, monthIndex);
};


const last7Months = data?.slice(-7) ?? [];

const labelFor = (idx, fallback) => {
  const m = last7Months[idx];
  return m && m._id
    ? `${m._id.month}/${m._id.year}`
    : fallback;
};
const datas = [
  {
    name: labelFor(0, "Month 1"),
    Income: getIncomeForMonth = (incomeBase, 0),
    Expenses: last7Months[0] ? last7Months[0].avgAmt : "N/A",
    amt: 2400,
  },
  {
    name: labelFor(1, "Month 2"),
    Income: getIncomeForMonth = (incomeBase, 1),
    Expenses: last7Months[1] ? last7Months[1].avgAmt : "N/A",
    amt: 2210,
  },
  {
    name: labelFor(2, "Month 3"),
    Income: getIncomeForMonth = (incomeBase, 2),
    Expenses: last7Months[2] ? last7Months[2].avgAmt : "N/A",
    amt: 2290,
  },
  {
    name: labelFor(3, "Month 4"),
    Income: getIncomeForMonth = (incomeBase, 3),
    Expenses: last7Months[3] ? last7Months[3].avgAmt : "N/A",
    amt: 2000,
  },
  {
    name: labelFor(4, "Month 5"),
    Income: getIncomeForMonth = (incomeBase, 4),
    Expenses: last7Months[4] ? last7Months[4].avgAmt : "N/A",
    amt: 2181,
  },
  {
    name: labelFor(5, "Month 6"),
    Income: getIncomeForMonth = (incomeBase, 5),
    Expenses: last7Months[5] ? last7Months[5].avgAmt : "N/A",
    amt: 2500,
  },
  {
    name: labelFor(6, "Month 7"),
    Income: getIncomeForMonth = (incomeBase, 6),
    Expenses: last7Months[6] ? last7Months[6].avgAmt : "N/A",
    amt: 2100,
  },
];


  
  
  
  
  
  
  
  return (    
        <div className="col-span-8 overflow-hidden rounded border border-stone-300 ">
            <div className="p-4"> 
                <h3 className="flex gap-1.5 items-center font-medium">
                    <FiUser/> Activity
                </h3>

            </div>

 <div className="px-4">   
            <LineChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={datas}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Income" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="Expenses" stroke="#82ca9d" />
    </LineChart>

 </div>
        </div>
    );
}