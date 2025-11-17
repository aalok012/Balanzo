import React from 'react';
import {Dashboard} from './components/Dashboard/Dashboard.jsx';
import {Sidebar} from './components/Sidebar/Sidebar.jsx'
import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
  return (
    
  <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard */}
        <Route 
          path="/Dashboard" 
          element={
            <ProtectedRoute>
                <Dashboard />
             
            </ProtectedRoute>
          }
        />

        {/* Default → redirect to dashboard or login */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}