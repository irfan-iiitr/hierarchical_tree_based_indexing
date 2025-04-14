import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/HomePage';
import CasesPage from './components/CasesPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cases" element={<CasesPage />} />
      </Routes>
    </Router>
  );
};

export default App;