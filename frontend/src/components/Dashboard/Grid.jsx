import React from "react";
import { StatCards } from "./StatCards.jsx";
import { ActivityGraph } from "./ActivityGraph.jsx";
import { UsageRadar } from "./UsageRadar.jsx";
import { RecentTransactions } from "./RecentTransactions.jsx";
import {useQuery} from "@tanstack/react-query";
import api from "../../axiosApi.jsx";      // or "../../axiosApi"


export const Grid = () => {
    return (    
        <div className="grid grid-cols-12 gap-4 px-4 sm:gap-5">
            <StatCards />
            <ActivityGraph />
            <UsageRadar/>
            <RecentTransactions/>
        </div>
    );
}
