// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import MapPage from './pages/MapPage';
import WheelPage from './pages/WheelPage';
import Header from './components/Header';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <main>
        <Routes>
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/" element={<WheelPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
