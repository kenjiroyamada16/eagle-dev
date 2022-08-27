import React from 'react';
import './App.css';
import { Route, Routes,  } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'
import Create from './pages/Create'
import Edit from './pages/Edit';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/register" element={<Create />}/>
      <Route path='/edit/user/:email' element = {<Edit />}/>
    </Routes>
  );
}

export default App;
