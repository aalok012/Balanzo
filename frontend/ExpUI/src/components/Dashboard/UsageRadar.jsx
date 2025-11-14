import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { FiEye } from "react-icons/fi";

const data = [
  {
    subject: 'Food',
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: 'House',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Maintainance',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'gas',
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: 'Entertainment',
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: 'Utilities',
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

export const UsageRadar = () => {
    return (
             <div className="col-span-4 overflow-hidden rounded border border-stone-300 ">
                    <div className="p-4"> 
                        <h3 className="flex items-center font-medium gap-1.5 py-1.5">
                            <FiEye/> Expense Area
                        </h3>
                    </div>
        <div className="h-64 px-4">
            <RadarChart
      style={{ width: '100%', height: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
      responsive
      outerRadius="80%"
      data={data}
      margin={{
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
      }}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis />
      <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
    </RadarChart>
        </div>
        </div>
    );
}