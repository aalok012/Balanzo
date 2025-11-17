import React from 'react';
import {TopBar} from './TopBar.jsx';
import {Grid} from './Grid.jsx';
import {ActivityGraph} from './ActivityGraph.jsx';
import {UsageRadar} from './UsageRadar.jsx';
import {StatCards} from './StatCards.jsx';
import {RecentTransactions} from './RecentTransactions.jsx';
import {useQuery} from "@tanstack/react-query";
import api from "../../axiosApi.jsx";      // or "../../axiosApi"
  


export const Dashboard = () => {
  return (
    <div className="bg-white rounded-lg pb-4 shadow h-[200vh]">
      <TopBar />
      <Grid/>
  
    </div>
  );
};
