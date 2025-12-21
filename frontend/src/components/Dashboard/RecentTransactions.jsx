import React from "react";
import { FiDollarSign } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import api from "../../axiosApi.jsx";      // or "../../axiosApi"



export const RecentTransactions = () => {
    const { data: recentTransactions, isLoading, error } = useQuery({
        queryKey: ["recentTransactions"],
        queryFn: async () => {
            const res = await api.get("/v1/expenses/getAllExpenses");
            return res.data.data; // array of recent transactions
        }
    });


    return (
        <div className="col-span-12 rounded-2xl border border-[#3078FF40] bg-[#0B1120]/70 p-4 shadow-[0_14px_36px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-1.5 font-medium text-[#E8EAED]">
                    <FiDollarSign /> Recent Transactions

                </h3>
                <button className="text-sm text-sky-400 hover:underline">
                    View All
                </button>
            </div>

            <table className="w-full table-auto">
                <TableHead />

                        {recentTransactions?.map((tx) => (
                            <TableRow
                                key={tx._id}
                                date={tx.date}
                                description={tx.description}
                                category={tx.category}
                                amount={tx.amount}
                            />
                        ))} 

            </table>

        </div>
    );
}


const TableHead = () => {
    return (
        <thead>
            <tr className="border-b border-white/10 text-xs text-slate-300 ">
                <th className="text-start pb-2 pt-1">Date &amp; time</th>
                <th className="text-start pb-2 pt-1">Description</th>
                <th className="text-start pb-2 pt-1">Category</th>
                <th className="text-end pb-2 pt-1">Amount($)</th>
            </tr>
        </thead>
    );
}

const TableRow = ({ date, description, category, amount }) => {
    const d = new Date(date);
    const formatted =
        !date || Number.isNaN(d.getTime())
            ? date
            : d.toLocaleString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
              });

    return (
        <tr className="cursor-pointer border-b border-white/5 text-sm text-slate-100 transition-colors hover:bg-white/5">
            <td className="py-2">{formatted}</td>
            <td className="py-2">{description}</td>
            <td className="py-2">{category}</td>
            <td className="py-2 text-end">{amount}</td>
        </tr>
    );
}
