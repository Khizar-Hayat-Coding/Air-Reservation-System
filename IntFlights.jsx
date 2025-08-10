import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 for navigation

import './ScheduleTable.css';

const InternationalFlights = () => {
  const [flights] = useState([
    {
      flightNo: "KK-305",
      airline: "Khizar Airways",
      from: "Paris",
      to: "Bangkok",
      departure: "2:00 PM",
      arrival: "11:00 PM",
      date: "20-4-2025",
      status: "Delayed"
    },
    {
      flightNo: "KK-777",
      airline: "Khizar Airways",
      from: "Islamabad",
      to: "London",
      departure: "12:00 PM",
      arrival: "11:30 AM",
      date: "20-4-2025",
      status: "On-Time"
    },
    {
      flightNo: "KK-205",
      airline: "Khizar Airways",
      from: "Dubai",
      to: "Istanbul",
      departure: "5:30 PM",
      arrival: "8:00 PM",
      date: "20-4-2025",
      status: "On-Time"
    },
    {
      flightNo: "KK-612",
      airline: "Khizar Airways",
      from: "New York",
      to: "Melbourne",
      departure: "12:00 PM",
      arrival: "11:45 PM",
      date: "28-4-2025",
      status: "On-Time"
    },
    {
      flightNo: "KK-315",
      airline: "Khizar Airways",
      from: "Berlin",
      to: "Islamabad",
      departure: "2:30 PM",
      arrival: "11:00 PM",
      date: "24-4-2025",
      status: "On-Time"
    },
    {
      flightNo: "KK-707",
      airline: "Khizar Airways",
      from: "Dubai",
      to: "Paris",
      departure: "3:00 AM",
      arrival: "7:00 AM",
      date: "23-4-2025",
      status: "On-Time"
    },
    {
      flightNo: "KK-007",
      airline: "Khizar Airways",
      from: "Karachi",
      to: "London",
      departure: "1:00 PM",
      arrival: "11:30 PM",
      date: "27-4-2025",
      status: "On-Time"
    }
  ]);

const navigate = useNavigate();

const handleBookingClick = (flight) => {
  if (flight.status === "Delayed") {
    alert(" This flight is delayed and cannot be booked right now.");
    return;
  }

  navigate('/bookings', {
    state: {
      flight: flight.flightNo,
      from: flight.from,
      to: flight.to
    }
  });
};

  return (
    <section className="schedule">
      <h2 className="heading">International Flights</h2>
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
                <td id={flight.status === "Delayed" ? "delayed" : "ontime"}>
                  {flight.status}
                </td>
                <td>
<button id="book-btn" onClick={() => handleBookingClick(flight)}>Book Now</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default InternationalFlights;
