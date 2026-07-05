import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// Base API URL
const API_URL = "https://demohotelsapi.pythonanywhere.com/hotels/";

function HotelDetails() {
  const { id } = useParams(); // gets the hotel id from the URL, e.g. /hotel/5
  const [hotel, setHotel] = useState(null);
  const [statusMsg, setStatusMsg] = useState("Loading hotel details...");
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(API_URL + id + "/");
        const result = await response.json();

        // API wraps the hotel object inside "data"
        // (handles both cases: data as a single object OR data as an array with one item)
        let hotelData = result.data;
        if (Array.isArray(hotelData)) {
          hotelData = hotelData[0];
        }

        if (hotelData) {
          setHotel(hotelData);
          setMainImage(hotelData.thumbnail);
          setStatusMsg("");
        } else {
          setStatusMsg("Hotel not found.");
        }
      } catch (error) {
        console.error("Error fetching hotel details:", error);
        setStatusMsg("Something went wrong while loading hotel details.");
      }
    };

    fetchHotelDetails();
  }, [id]);

  return (
    <main className="detail-container">
      <Link to="/" className="back-link">⬅ Back to all hotels</Link>

      {statusMsg && <p className="status-msg">{statusMsg}</p>}

      {hotel && (
        <>
          <img src={mainImage} alt={hotel.name} className="detail-main-img" />

          <div className="detail-gallery">
            {(hotel.photos && hotel.photos.length > 0 ? hotel.photos : [hotel.thumbnail]).map(
              (photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  onClick={() => setMainImage(photo)}
                />
              )
            )}
          </div>

          <div className="detail-info">
            <h1>{hotel.name}</h1>
            <div className="detail-meta">
              <span>📍 {hotel.location}</span>
              <span>⭐ {hotel.rating} Rating</span>
            </div>
            <p className="detail-price">
              ₹{parseFloat(hotel.price).toLocaleString("en-IN")} / night
            </p>
            <p className="detail-description">{hotel.description}</p>
            <button
              className="book-btn"
              onClick={() => alert("This is a demo project. Booking is not available.")}
            >
              Book Now
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default HotelDetails;