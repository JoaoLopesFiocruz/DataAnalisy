import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Importando páginas
import Login from './Routes/Login';
import SingIn from './Routes/SingIn';
import UpdateUser from './Routes/UpdateUser';
import Main from './Routes/main';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/UpdateUser/:id" element={<UpdateUser />} />
        <Route path="/SingIn" element={<SingIn />} />
      </Routes>
    </Router>
  </StrictMode>
);
