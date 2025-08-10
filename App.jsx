import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';


import Home from './pages/Home';
import Flights from './pages/Flights';
import Bookings from './pages/Bookings';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminPanel />} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
