import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetailPage from './pages/ProjectDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:id" element={<ProjectDetailPage />} />
    </Routes>
  );
}

export default App;
