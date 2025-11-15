import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import './index.css'
import App from './App.jsx'

import ReactDOM from "react-dom/client"
// import {BrowserRouter, browserRouter} from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <App />

  </StrictMode>
);