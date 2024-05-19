import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './Components/HomePage';
import AllScenerios from './Components/AllScenerios';
import AddScenerio from './Components/AddScenerio';
import AddVehicle from './Components/AddVehicle';
import Update from './Components/Update';
import UpdateVehicle from './Components/UpdateVehicle';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="addscenerio" element={<AddScenerio />} />
        <Route path="allscenerios" element={<AllScenerios />} />
        <Route path="addvehicle" element={<AddVehicle />} />
        <Route path="allscenerios/update/:id" element={<Update />} />
        <Route path="updateveh/:id" element={<UpdateVehicle />} />
      </Routes>
    </Router>
  );
}

export default App;



