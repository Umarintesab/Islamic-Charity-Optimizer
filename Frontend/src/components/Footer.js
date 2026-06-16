import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Islamic Charity Optimizer</h3>
          <p>Helping Muslims calculate and distribute Zakat with wisdom.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: islamiccharityoptimizer@gmail.com</p>
          <p>Phone: +92 3171115465 OR +92 3042607530</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Islamic Charity Optimizer. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;