import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HotelList from "./components/HotelList";
import HotelDetails from "./components/HotelDetails";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* ===== Header (shown on every page) ===== */}
      <header className="navbar">
        <div className="logo">🏨 StayEase</div>
        <p className="tagline">Find the perfect stay, every time</p>
      </header>

      {/* ===== Page Routes ===== */}
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
      </Routes>

      {/* ===== Footer (shown on every page) ===== */}
      <footer className="footer">
        <p>Made with ❤️ by a beginner | StayEase &copy; 2026</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;