import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';  // Popraw ścieżkę
import CryptoInfoPage from './components/CryptoInfoPage';  // Popraw ścieżkę

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/crypto/:id" element={<CryptoInfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
