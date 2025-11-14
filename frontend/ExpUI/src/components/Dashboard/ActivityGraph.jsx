import React from "react";
import {FiUser} from "react-icons/fi";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: 'Week A',
    Income: 4000,
    Expenses: 2400,
    amt: 2400,
  },
  {
    name: 'Week B',
    Income: 3000,
    Expenses: 1398,
    amt: 2210,
  },
  {
    name: 'Week C',
    Income: 2000,
    Expenses: 9800,
    amt: 2290,
  },
  {
    name: 'Week D',
    Income: 2780,
    Expenses: 3908,
    amt: 2000,
  },
  {
    name: 'Week E',
    Income: 1890,
    Expenses: 4800,
    amt: 2181,
  },
  {
    name: 'Week F',
    Income: 2390,
    Expenses: 3800,
    amt: 2500,
  },
  {
    name: 'Week G',
    Income: 3490,
    Expenses: 4300,
    amt: 2100,
  },
];





export const ActivityGraph  = () => {
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
      data={data}
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