import React from 'react';
import { AccountToggle } from './AccountToggle.jsx';
import { Search } from './Search.jsx';
import { RouteSelect } from './RouteSelect.jsx';
export const Sidebar = () => {
  return (
    <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
      <AccountToggle />
      <Search />
      <RouteSelect/>
    </div>

  );
};
