import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormFlights.css';

const FlightsForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departure: '',
    travellers: ''
  });

  // Domestic flights
  const domesticFlights = [
    { flightNo: "KK-303", from: "Karachi", to: "Lahore", date: "2025-04-20" },
    { flightNo: "KK-101", from: "Lahore", to: "Islamabad", date: "2025-04-22" },
    { flightNo: "KK-111", from: "Peshawar", to: "Multan", date: "2025-04-22" },
    { flightNo: "KK-121", from: "Islamabad", to: "Quetta", date: "2025-04-21" }
  ];

  // International flights
  const internationalFlights = [
    { flightNo: "KK-305", from: "Paris", to: "Bangkok", date: "2025-04-20" },
    { flightNo: "KK-777", from: "Islamabad", to: "London", date: "2025-04-20" },
    { flightNo: "KK-205", from: "Dubai", to: "Istanbul", date: "2025-04-20" },
    { flightNo: "KK-612", from: "New York", to: "Melbourne", date: "2025-04-28" },
    { flightNo: "KK-315", from: "Berlin", to: "Islamabad", date: "2025-04-24" },
    { flightNo: "KK-707", from: "Dubai", to: "Paris", date: "2025-04-23" },
    { flightNo: "KK-007", from: "Karachi", to: "London", date: "2025-04-27" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check domestic flights
    const foundDomestic = domesticFlights.find(flight =>
      flight.from.toLowerCase() === formData.from.toLowerCase() &&
      flight.to.toLowerCase() === formData.to.toLowerCase() &&
      flight.date === formData.departure
    );

    // Check international flights
    const foundInternational = internationalFlights.find(flight =>
      flight.from.toLowerCase() === formData.from.toLowerCase() &&
      flight.to.toLowerCase() === formData.to.toLowerCase() &&
      flight.date === formData.departure
    );

    if (foundDomestic) {
      alert(`✅ Domestic Flight ${foundDomestic.flightNo} is available!`);
      navigate('/flights', { state: { searchData: formData } });
    } else if (foundInternational) {
      alert(`✅ International Flight ${foundInternational.flightNo} is available!`);
      navigate('/flights', { state: { searchData: formData } });
    } else {
      alert("❌ No flights available for your search.");
    }
  };

  return (
    <div className="flights">
      <div className="search-form">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="group">
              <label>From</label>
              <input
                type="text"
                name="from"
                placeholder="Enter departure city"
                value={formData.from}
                onChange={handleChange}
              />
            </div>
            <div className="group">
              <label>To</label>
              <input
                type="text"
                name="to"
                placeholder="Enter arrival city"
                value={formData.to}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="group">
              <label>Departure</label>
              <input
                type="date"
                name="departure"
                value={formData.departure}
                onChange={handleChange}
              />
            </div>
            <div className="group">
              <label>Travellers</label>
              <input
                type="number"
                name="travellers"
                placeholder="Enter Travellers"
                value={formData.travellers}
                onChange={handleChange}
              />
            </div>
          </div>
          <button id="btn" type="submit">Search Flights</button>
        </form>
      </div>
    </div>
  );
};

export default FlightsForm;
