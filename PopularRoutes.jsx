import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PopularRoutes.css';

const PopularRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/routes')
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Routes Data:", data);
        setRoutes(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleBook = (route) => {
    let from = '';
    let to = '';

    if (route.title.includes(' to ')) {
      [from, to] = route.title.split(' to ');
    } else if (route.title.includes('-')) {
      [from, to] = route.title.split('-');
    } else {
      from = route.title; 
    }

    navigate('/bookings', {
      state: {
        from: from?.trim(),
        to: to?.trim(),
        flight: route.flights || ''
      }
    });
  };

  return (
    <section className="routes">
      <h2 className="heading">Popular Avenues</h2>
      <div className="routes-grid">
        {Array.isArray(routes) && routes.length > 0 ? (
          routes.map((route, index) => (
            <div className="card" key={index}>
              <img
                src={`http://localhost:5000/${route.image?.replace(/\\/g, '/')}`}
                alt={route.title}
              />
              <div className="info">
                <h3>{route.title}</h3>
                <p>{route.flights}</p>
                <p>{route.price}</p>
                <button onClick={() => handleBook(route)}>Book Ticket</button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: 'red', fontWeight: 'bold' }}>No routes available</p>
        )}
      </div>
    </section>
  );
};

export default PopularRoutes;
