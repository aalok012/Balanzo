import React from 'react';
import { Dashboard } from './components/Dashboard/Dashboard.jsx';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import { About } from './components/About.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PublicRoute from './components/PublicRoute.jsx';
import DashboardLayout from './components/Dashboard/DasboardLayout.jsx';
import PublicLayout from './components/PublicLayout.jsx';
import Home from './components/Home.jsx';
import Logout from './components/Logout.jsx';
import AddExpense from './components/AddExpense.jsx';

export default function App() {
  return (
    
  <BrowserRouter>
      <Routes>

        {/* All main pages share the public layout + navbar */}
        <Route element={<PublicLayout />}>
          {/* Animated homepage */}
          <Route path="/" element={<Home />} />

          {/* Public auth + info pages */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/expenses/new" element={<AddExpense />} />

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
