import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Base API URL
const API_URL = "https://demohotelsapi.pythonanywhere.com/hotels/";

function HotelList() {
  // ===== State variables =====
  const [hotels, setHotels] = useState([]);
  const [statusMsg, setStatusMsg] = useState("Loading hotels...");
  const [searchInput, setSearchInput] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("");

  // ===== Function to fetch hotels from the API =====
  const fetchHotels = async () => {
    setStatusMsg("Loading hotels...");

    // Build query params dynamically
    const params = new URLSearchParams();
    if (searchInput.trim()) params.append("search", searchInput.trim());
    if (locationFilter) params.append("location", locationFilter);
    if (sortFilter) params.append("order_by", sortFilter);

    const finalUrl = API_URL + "?" + params.toString();

    try {
      const response = await fetch(finalUrl);
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        setHotels(data.data);
        setStatusMsg(`Showing ${data.data.length} hotel(s)`);
      } else {
        setHotels([]);
        setStatusMsg("No hotels found. Try a different search.");
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setStatusMsg("Something went wrong while fetching hotels. Please try again.");
    }
  };

  // ===== Load all hotels when the page first opens =====
  useEffect(() => {
    fetchHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ===== Handle "Enter" key press inside search box =====
  const handleKeyUp = (e) => {
    if (e.key === "Enter") fetchHotels();
  };

  // ===== Reset all filters =====
  const handleReset = () => {
    setSearchInput("");
    setLocationFilter("");
    setSortFilter("");
    // fetchHotels will be called manually since we reset state above
    setTimeout(fetchHotels, 0);
  };

  return (
    <>
      {/* ===== Hero Section ===== */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Discover Your Perfect Stay</h1>
          <p>Handpicked hotels across India — comfort, luxury and value, all in one place.</p>
          <a href="#search-section" className="hero-btn">Explore Hotels</a>
        </div>
      </section>

      {/* ===== Search & Filter Section ===== */}
      <section className="search-section" id="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by hotel name or city..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyUp={handleKeyUp}
          />
          <button onClick={fetchHotels}>Search</button>
        </div>

        <div className="filters">
          <select value={locationFilter} onChange={(e) => { setLocationFilter(e.target.value); }}>
            <option value="">All Locations</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Noida">Noida</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Pune">Pune</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Chennai">Chennai</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Goa">Goa</option>
          </select>

          <select value={sortFilter} onChange={(e) => { setSortFilter(e.target.value); }}>
            <option value="">Sort By</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="-rating">Rating: High to Low</option>
            <option value="rating">Rating: Low to High</option>
          </select>

          <button onClick={fetchHotels}>Apply</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </section>

      {/* ===== Status Message ===== */}
      <p className="status-msg">{statusMsg}</p>

      {/* ===== Hotel Cards Grid ===== */}
      <main className="hotel-grid">
        {hotels.map((hotel) => (
          <div className="hotel-card" key={hotel.id}>
            <img src={hotel.thumbnail} alt={hotel.name} />
            <div className="hotel-card-body">
              <h3>{hotel.name}</h3>
              <p className="hotel-location">📍 {hotel.location}</p>
              <p className="hotel-rating">⭐ {hotel.rating}</p>
              <p className="hotel-price">
                ₹{parseFloat(hotel.price).toLocaleString("en-IN")} / night
              </p>
              <Link to={`/hotel/${hotel.id}`} className="view-btn">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}

export default HotelList;