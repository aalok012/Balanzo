import React from "react";
import { FiDollarSign } from "react-icons/fi";

export const RecentTransactions  = () => {
    return (    
        <div className="col-span-12 p-4 rounded border border-stone-300 ">
                            <div className="mb-4 flex items-center justify-between"> 
                                <h3 className="flex items-center font-medium gap-1.5">
                                    <FiDollarSign/> Recent Transactions

                                </h3>
                                <button className="text-sm text-violet-500 hover:underline">
                                    View All
                                </button>
                            </div>

                        <table className="w-full table-auto">
                            <TableHead/>
                            <tbody>
                                <TableRow/>
                                <TableRow date="2025-11-18" description="Grocery Shopping" category="Food" amount="-$150.00"/>
                                <TableRow date="2025-11-17" description="Salary" category="Income" amount="+$3,000.00"/>
                                <TableRow date="2025-11-16" description="Electricity Bill" category="Utilities" amount="-$75.00"/>
                                <TableRow date="2025-11-15" description="Dinner at Restaurant" category="Food" amount="-$60.00"/>
                                <TableRow date="2025-11-14" description="Gym Membership" category="Health" amount="-$45.00"/> 
                                <TableRow date="2025-11-18" description="Grocery Shopping" category="Food" amount="-$150.00"/>
                                <TableRow date="2025-11-17" description="Salary" category="Income" amount="+$3,000.00"/>
                                <TableRow date="2025-11-16" description="Electricity Bill" category="Utilities" amount="-$75.00"/>
                                <TableRow date="2025-11-15" description="Dinner at Restaurant" category="Food" amount="-$60.00"/>
                                <TableRow date="2025-11-14" description="Gym Membership" category="Health" amount="-$45.00"/>                 

                            </tbody>
                        </table>

        </div>
    );
}


const TableHead = () => {
    return(
        <thead>
            <tr className="text-stone-500 text-xs border-b border-stone-300 ">
                <th className="text-start pb-2 pt-1">Date</th>
                <th className="text-start pb-2 pt-1">Description</th>
                <th className="text-start pb-2 pt-1">Category</th>
                <th className="text-end pb-2 pt-1">Amount</th>
            </tr>
        </thead>
    );
}

const TableRow = ({date, description, category, amount}) => {
    return(
        <tr className="text-sm border-b border-stone-200 hover:bg-stone-100 transition-colors cursor-pointer">
            <td className="py-2">{date}</td>
            <td className="py-2">{description}</td>
            <td className="py-2">{category}</td>
            <td className="py-2 text-end">{amount}</td>
        </tr>
    );
}