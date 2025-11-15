import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { FiEye } from "react-icons/fi";


const { data, isLoading, error } = useQuery({
    queryKey: ["expenseByCategory"],
    queryFn: async () => {
        const res = await api.get("/api/v1/AmountByCategory");
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
        subject: data?.[0]?._id || 'Rent',
        A: data?.[0]?.totalCat || 0,

        fullMark: 150,
    },
    {
        subject: data?.[0]?._id || 'Shopping',
        A: data?.[0]?.totalCat || 0,

        fullMark: 150,
    },
    {
        subject: data?.[0]?._id || 'Transport',
        A: data?.[0]?.totalCat || 0,

        fullMark: 150,
    },
    {
        subject: data?.[0]?._id || 'Entertainment',
        A: data?.[0]?.totalCat || 0,

        fullMark: 150,
    },
    {
        subject: data?.[0]?._id || 'Others',
        A: data?.[0]?.totalCat || 0,

        fullMark: 150,
    },
];

export const UsageRadar = () => {
    return (
        <div className="col-span-4 overflow-hidden rounded border border-stone-300 ">
            <div className="p-4">
                <h3 className="flex items-center font-medium gap-1.5 py-1.5">
                    <FiEye /> Expense Area
                </h3>
            </div>
            <div className="h-64 px-4">
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
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
            </div>
        </div>
    );
}