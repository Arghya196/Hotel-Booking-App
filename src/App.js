import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HotelList from "./components/HotelList";
import HotelDetails from "./components/HotelDetails";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      { }
      <header className="navbar">
        <div className="logo">🏨 StayEase</div>
        <p className="tagline">Find the perfect stay, every time</p>
      </header>

      { }
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
      </Routes>

      { }
      <footer className="footer">
        <p>Made with ❤️ by a beginner | StayEase &copy; 2026</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;   