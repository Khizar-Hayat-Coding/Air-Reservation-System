import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import navigate
import './ScheduleTable.css';

const ScheduleTable = () => {
    const [flights] = useState([
        {
            flightNo: "KKK-303",
            route: "Karachi To Lahore",
            departure: "08:30 AM",
            arrival: "9:00 AM",
            status: "On Time",
        },
        {
            flightNo: "KKK-305",
            route: "Paris To Bangkok",
            departure: "02:00 PM",
            arrival: "11:00 PM",
            status: "Delayed",
        },
        {
            flightNo: "KKK-777",
            route: "Islamabad To London",
            departure: "12:00 PM",
            arrival: "11:30 AM",
            status: "On Time",
        },
        {
            flightNo: "KKK-205",
            route: "Dubai To Istanbul",
            departure: "05:30 PM",
            arrival: "08:00 PM",
            status: "On Time",
        },
    ]);

    const navigate = useNavigate();

   const handleBookingClick = (flight) => {
  if (flight.status === "Delayed") {
    alert(" This flight is delayed and cannot be booked right now.");
    return;
  }

  const [from, , to] = flight.route.split(" ");
  navigate("/bookings", {
    state: {
      flight: flight.flightNo,
      from,
      to
    }
  });
};


    return (
        <section className="schedule">
            <h2 className="heading">Today's Schedule</h2>
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Flight No</th>
                            <th>Route</th>
                            <th>Departure</th>
                            <th>Arrival</th>
                            <th>Status</th>
                            <th>Booking</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flights.map((flight, index) => (
                            <tr key={index}>
                                <td>{flight.flightNo}</td>
                                <td>{flight.route}</td>
                                <td>{flight.departure}</td>
                                <td>{flight.arrival}</td>
                                <td className={flight.status.toLowerCase().replace(' ', '-')}>
                                    {flight.status}
                                </td>
                                <td>
                                    <button
                                        className="book-btn"
                                        onClick={() => handleBookingClick(flight)}
                                    >
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

export default ScheduleTable;
