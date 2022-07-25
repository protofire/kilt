import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connect from './pages/connect/Connect';
import SelectProfile from './pages/select-profile/SelectProfile';
import Claimer from './pages/claimer/Claimer';
import Attester from './pages/attester/Attester';
import AttesterCtypes from './pages/attester/ctypes/AttesterCtypes';
import AttesterRequests from './pages/attester/requests/AttesterRequests';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connect />}></Route>
        <Route path="/select-profile" element={<SelectProfile />}> </Route>
        <Route path="/claimer" element={<Claimer />}> </Route>
        <Route path="/attester" element={<Attester />}> </Route>
        <Route path="/attester/ctypes" element={<AttesterCtypes />}> </Route>
        <Route path="/attester/requests" element={<AttesterRequests />}> </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
