import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './ScheduleTable.css';

const DomesticFlights = () => {
  const navigate = useNavigate();

  const [flights] = useState([
    {
      flightNo: "KK-303",
      airline: "Khizar Airways",
      from: "Karachi",
      to: "Lahore",
      departure: "8:30 AM",
      arrival: "9:00 AM",
      date: "20-4-2025",
      status: "On-Time"
    },
    {
      flightNo: "KK-101",
      airline: "Khizar Airways",
      from: "Lahore",
      to: "Islamabad",
      departure: "10:00 PM",
      arrival: "10:30 PM",
      date: "22-4-2025",
      status: "On-Time"
    },
    {
      flightNo: "KK-111",
      airline: "Khizar Airways",
      from: "Peshawar",
      to: "Multan",
      departure: "6:00 PM",
      arrival: "6:45 PM",
      date: "22-4-2025",
      status: "On-Time"
    },
    {
      flightNo: "KK-121",
      airline: "Khizar Airways",
      from: "Islamabad",
      to: "Quetta",
      departure: "10:00 AM",
      arrival: "11:30 AM",
      date: "21-4-2025",
      status: "On-Time"
    }
  ]);

  const handleBookingClick = (flight) => {
    navigate("/bookings", {
      state: {
        flight: flight.flightNo,
        from: flight.from,
        to: flight.to
      }
    });
  };

  return (
    <section className="schedule">
      <h1 className="heading" style={{ color: "rgb(0, 0, 0)" }}>Available Flights</h1>
      <h2 className="heading">Domestic Flights</h2>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Flight No</th>
              <th>Airline</th>
              <th>From</th>
              <th>To</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Date</th>
              <th>Status</th>
              <th>Booking</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight, index) => (
              <tr key={index}>
                <td>{flight.flightNo}</td>
                <td>{flight.airline}</td>
                <td>{flight.from}</td>
                <td>{flight.to}</td>
                <td>{flight.departure}</td>
                <td>{flight.arrival}</td>
                <td>{flight.date}</td>
                <td id="ontime">{flight.status}</td>
                <td>
                  <button id="book-btn" onClick={() => handleBookingClick(flight)}>
                    Book Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DomesticFlights;
