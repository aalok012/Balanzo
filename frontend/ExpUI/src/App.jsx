import LoginWithGoogleButton from './pages/Login.jsx';
import FormRegistration from './pages/Register.jsx';
import Layout from './Layout.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { About } from './pages/About.jsx';
import Dashboard from './pages/Dashboard.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}> 
          <Route index element={<LoginWithGoogleButton />} />
          <Route path="login" element={<LoginWithGoogleButton />} />
          <Route path="register" element={<FormRegistration />} />
          <Route path="About" element={<About />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
