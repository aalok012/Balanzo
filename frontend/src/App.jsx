import React from 'react';
import {Dashboard} from './components/Dashboard/Dashboard.jsx';
import {Sidebar} from './components/Sidebar/Sidebar.jsx'
import axios from 'axios';

export default function App() {
  return (
    <main className='grid gap-4 p-4 grid-cols-[220px_1fr]'>
      <Sidebar />
      <Dashboard />
      
    </main>
  )
}
