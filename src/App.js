import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';



const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

function App() {
  return (
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
  );
}

export default App;