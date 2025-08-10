import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "./BookingForm.css";


function Bookings() {
  const location = useLocation();
  const prefill = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    flight: prefill.flight || "",
    from: prefill.from || "",
    to: prefill.to || "",
    date: "",
    seat: ""
  });

  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/booking");
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);


  const handleBooking = async () => {
    const { name, flight, from, to, date, seat } = formData;

    if (!name || !flight || !from || !to || !date || !seat) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    try {
      const url = editingId
        ? `http://localhost:5000/api/booking/${editingId}`
        : "http://localhost:5000/api/booking";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, flight, from, to, date, seat })
      });

      const data = await res.json();
      if (res.ok) {
        alert(editingId ? "Booking updated successfully" : "Booking submitted successfully");
        setFormData({ name: "", flight: "", from: "", to: "", date: "", seat: "" });
        setEditingId(null);
        fetchBookings();
      } else {
        alert("Failed: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting booking:", error.message);
      alert("Booking failed: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this booking?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/booking/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        alert("Booking deleted");
        fetchBookings();
      }
    } catch (err) {
      alert("Error deleting booking");
    }
  };

  const handleEdit = (booking) => {
    setFormData({
      name: booking.name,
      flight: booking.flight,
      from: booking.from,
      to: booking.to,
      date: booking.date,
      seat: booking.seat
    });
    setEditingId(booking._id);
  };

  

  return (
    <div>
      <h1 className="heading" style={{ marginTop: "20px" }}>
        Book a Flight
      </h1>

      <section className="schedule">
        <form id="booking-form">
          <label id="book-label" htmlFor="name">Passenger Name:</label>
          <input id="book-inp" type="text" name="name" placeholder="Enter your name"
            value={formData.name} onChange={handleChange} />

          <label id="book-label" htmlFor="flight">Flight No:</label>
          <input id="book-inp" type="text" name="flight" placeholder="Like: KK-001"
            value={formData.flight} onChange={handleChange} />

          <label id="book-label" htmlFor="from">From:</label>
          <input id="book-inp" type="text" name="from" placeholder="Like: Lahore"
            value={formData.from} onChange={handleChange} />

          <label id="book-label" htmlFor="to">To:</label>
          <input id="book-inp" type="text" name="to" placeholder="Like: Islamabad"
            value={formData.to} onChange={handleChange} />

          <label id="book-label" htmlFor="date">Departure Date:</label>
          <input id="book-inp" type="date" name="date"
            value={formData.date} onChange={handleChange} />

          <label id="book-label" htmlFor="seat">Seats:</label>
          <input id="book-inp" type="text" name="seat" placeholder="Like: 2"
            value={formData.seat} onChange={handleChange} />

          <button id="booking" type="button" onClick={handleBooking}>
            {editingId ? "Update Booking" : "Confirm Booking"}
          </button>
        </form>

        <h1 className="heading" style={{ marginTop: "50px" }}>
          Your Previous Bookings
        </h1>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Passenger Name</th>
                <th>Flight No</th>
                <th>From</th>
                <th>To</th>
                <th>Date</th>
                <th>Seats</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking._id.slice(-6).toUpperCase()}</td>
                  <td>{booking.name}</td>
                  <td>{booking.flight}</td>
                  <td>{booking.from}</td>
                  <td>{booking.to}</td>
                  <td>{booking.date}</td>
                  <td>{booking.seat}</td>
                  <td><span className="badge bg-success">Confirmed</span></td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(booking)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(booking._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Bookings;
