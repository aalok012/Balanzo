import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import './index.css'
import App from './App.jsx'
import ReactDOM from "react-dom/client"
// import {BrowserRouter, browserRouter} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";




//create qery client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <App />

  </StrictMode>
);