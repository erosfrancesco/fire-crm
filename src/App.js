import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GroceryScene } from './scenes';
import Login from './scenes/Login';

function App() {
  return <Router>
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/" element={<GroceryScene />} />
    </Routes>
  </Router>
}

export default App;
