import React from 'react';
import {TopBar} from './TopBar.jsx';
import {Grid} from './Grid.jsx';
export const Dashboard = () => {
  return (
    <div className="bg-white rounded-lg pb-4 shadow h-[200vh]">
      <TopBar />
      <Grid/>
    </div>
  );
};
