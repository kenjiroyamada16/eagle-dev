import React from 'react';
import './App.css';
import { Route, Routes,  } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
    </Routes>
  );
}

export default App;
