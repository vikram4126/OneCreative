import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SlideDetailPage from './pages/SlideDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/slide/:id" element={<SlideDetailPage />} />
    </Routes>
  );
}

export default App;
