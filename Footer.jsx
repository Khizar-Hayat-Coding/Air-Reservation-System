import React from 'react';
import './Footer.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const Footer = () => {
  return (
    <footer className="footer mt-auto">
      <div className="container py-3 text-center">
        <p className="mb-2">&copy; 2025 Khizar Airways. All rights reserved.</p>
        <div className="d-flex justify-content-center gap-3">
          <a
            href="https://github.com/Khizar-Hayat-Coding"
            className="text-black fs-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/khizar-hayat-ab2a89277/"
            className="text-black fs-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
