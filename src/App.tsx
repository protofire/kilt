import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connect from './pages/connect/Connect';
import SelectProfile from './pages/select-profile/SelectProfile';
import Claimer from './pages/Claimer';
import Attester from './pages/Attester';

function App() {

  const connect = () => {};
  
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connect />}></Route>
        <Route path="/select-profile" element={<SelectProfile />}> </Route>
        <Route path="/claimer" element={<Claimer />}> </Route>
        <Route path="/attester" element={<Attester />}> </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
