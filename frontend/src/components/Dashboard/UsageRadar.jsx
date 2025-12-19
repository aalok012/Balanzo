import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { FiEye } from "react-icons/fi";
import {useQuery} from "@tanstack/react-query";
import api from "../../axiosApi.jsx";      // or "../../axiosApi"



export const UsageRadar = () => {
    
const { data, isLoading, error } = useQuery({
    queryKey: ["expenseByCategory"],
    queryFn: async () => {
        const res = await api.get("/expenses/amountByCategory");
        return res.data.data; // array of expenses by category
    }
});

const datas = [
    {
        subject: data?.[0]?._id || "Food",
        A: data?.[0]?.totalCat || 0,
        
        fullMark: 150,
    },
    {
        subject: data?.[1]?._id || 'Rent',
        A: data?.[1]?.totalCat || 0,

        fullMark: 150,
    },
    {
        subject: data?.[2]?._id || 'Shopping',
        A: data?.[2]?.totalCat || 0,

        fullMark: 150,
    },
    {
        subject: data?.[3]?._id || 'Transport',
        A: data?.[3]?.totalCat || 0,

        fullMark: 150,
    },
    {
        subject: data?.[4]?._id || 'Entertainment',
        A: data?.[4]?.totalCat || 0,

        fullMark: 150,
    },
    {
        subject: data?.[5]?._id || 'Others',
        A: data?.[5]?.totalCat || 0,

        fullMark: 150,
    },
];

    return (
        <div className="col-span-4 overflow-hidden rounded-2xl border border-[#3078FF40] bg-[#0B1120]/70 shadow-[0_14px_36px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            <div className="p-4">
                <h3 className="flex items-center gap-1.5 py-1.5 font-medium text-[#E8EAED]">
                    <FiEye /> Expense Area
                </h3>
            </div>
            <div className="h-64 px-4 text-slate-200">
                <RadarChart
                    style={{ width: '100%', height: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
                    responsive
                    outerRadius="80%"
                    data={datas}
                    margin={{
                        top: 20,
                        left: 20,
                        right: 20,
                        bottom: 20,
                    }}
                >
                    <PolarGrid stroke="#1b2942" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#7d8bb6", fontSize: 11 }} />
                    <PolarRadiusAxis tick={{ fill: "#7d8bb6", fontSize: 10 }} />
                    <Radar
                        name="Spending"
                        dataKey="A"
                        stroke="#8B4FFF"
                        fill="#8B4FFF"
                        fillOpacity={0.35}
                    />
                </RadarChart>
            </div>
        </div>
    );
}
