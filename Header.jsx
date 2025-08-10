import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from './Visuals/Khizar Airways.png';

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem('user');
      navigate('/');
      window.location.reload(); // refresh to update header
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-blue">
        <div className="container-fluid justify-content-center">
          <Link className="navbar-brand text-white me-auto" to="/">
            <img src={logo} alt="Logo" style={{ width: 'auto', height: '100px' }} />
          </Link>

          <button
            className="navbar-toggler bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav text-center">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/flights">Flights</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/bookings">Bookings</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>

              {/* Mobile View: Show login/register if not logged in */}
              {!user && (
                <>
                  <li className="nav-item d-lg-none">
                    <Link className="nav-link text-warning text-decoration-underline" to="/login">Login</Link>
                  </li>
                  <li className="nav-item d-lg-none">
                    <Link className="nav-link text-warning text-decoration-underline" to="/register">Register</Link>
                  </li>
                </>
              )}

              {/* Mobile View: Show logout if logged in */}
              {user && (
                <li className="nav-item d-lg-none">
                  <button onClick={handleLogout} className="nav-link btn btn-link text-danger">Logout</button>
                </li>
              )}
            </ul>
          </div>

          {/* Desktop View Buttons */}
          <div className="d-none d-lg-flex gap-2 ms-auto">
            {!user ? (
              <>
                <Link to="/login" id="log" className="btn btn-outline-light">Login</Link>
                <Link to="/register" id="reg" className="btn btn-warning">Register</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
