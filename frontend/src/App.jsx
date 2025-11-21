import React from 'react';
import { Dashboard } from './components/Dashboard/Dashboard.jsx';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import { About } from './components/About.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import DashboardLayout from './components/Dashboard/DasboardLayout.jsx';
import PublicLayout from './components/PublicLayout.jsx';
import Home from './components/Home.jsx';
import Logout from './components/Logout.jsx';

export default function App() {
  return (
    
  <BrowserRouter>
      <Routes>

        {/* All main pages share the public layout + navbar */}
        <Route element={<PublicLayout />}>
          {/* Animated homepage */}
          <Route path="/" element={<Home />} />

          {/* Public auth + info pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />

          {/* Protected Dashboard with sidebar layout */}
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
          </Route>

          {/* Logout helper route */}
          <Route path="/logout" element={<Logout />} />
        </Route>

        {/* Default → redirect to homepage */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}
