import React, { useState, useEffect } from 'react';
import './PopularRoutes.css';

const AdminPanel = () => {
  const [title, setTitle] = useState('');
  const [flights, setFlights] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [routes, setRoutes] = useState([]);

  // Fetch all routes
  const fetchRoutes = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/routes');
      if (!res.ok) throw new Error('Failed to fetch routes');
      const data = await res.json();
      setRoutes(data);
    } catch (error) {
      console.error("Error fetching routes:", error);
      alert("Failed to fetch routes");
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !flights || !price || !image) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('flights', flights);
    formData.append('price', price);
    formData.append('image', image);

    try {
      const res = await fetch('http://localhost:5000/api/admin/routes', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        alert('Route added successfully!');
        setTitle('');
        setFlights('');
        setPrice('');
        setImage(null);
        fetchRoutes();
      } else {
        alert(data.message || 'Failed to add route');
      }
    } catch (error) {
      console.error("Error:", error);
      alert('Something went wrong while adding the route');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/routes/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error('Not JSON:', text);
        throw new Error('Server did not return valid JSON');
      }

      if (res.ok) {
        alert('Route deleted!');
        fetchRoutes();
      } else {
        throw new Error(data.message || 'Delete failed');
      }

    } catch (error) {
      console.error('Delete error:', error.message);
      alert(`Error: ${error.message}`);
    }
  };


  return (
    <section className="routes">
      <h2 className="heading">Admin Panel: Add Popular Route</h2>
      <div className="routes-grid">
        <form className="card" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="info">
            <label>Route Title:</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. New York to Melbourne" required />
            <label>Flights per Week:</label>
            <input type="text" value={flights} onChange={e => setFlights(e.target.value)} placeholder="e.g. 6 Flights/Week" required />
            <label>Price:</label>
            <input type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. From 250,000 PKR" required />
            <label>Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} required />
            <button type="submit">Add Route</button>
          </div>
        </form>
      </div>
      <h3 style={{ marginTop: '40px' }}>All Routes</h3>
      <div className="routes-grid">
        {routes.map(route => (
          <div className="card" key={route._id}>
            <img src={`http://localhost:5000/${route.image}`} alt={route.title} />
            <div className="info">
              <h3>{route.title}</h3>
              <p>{route.flights}</p>
              <p>💰 {route.price}</p>
              <button onClick={() => handleDelete(route._id)} style={{ backgroundColor: 'red' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminPanel;