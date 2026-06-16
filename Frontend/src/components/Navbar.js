
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// function Navbar() {
//   const { logout, user } = useAuth();
//   const navigate = useNavigate();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         <Link to="/dashboard" className="navbar-brand">
//           🕌 Islamic Charity Optimizer
//         </Link>
        
//         <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//           ☰
//         </button>

//         <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
//           <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>🏠 Home</Link>
//           <Link to="/zakat" onClick={() => setMobileMenuOpen(false)}>💰 Zakat Calculator</Link>
//           <Link to="/city-area" onClick={() => setMobileMenuOpen(false)}>📍 Select City & Area</Link>
//           <Link to="/donate" onClick={() => setMobileMenuOpen(false)}>🤲 Make Donation</Link>
//           <Link to="/about" onClick={() => setMobileMenuOpen(false)}>ℹ️ About</Link>
//           <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>📞 Contact</Link>
//           <span className="user-name">👤 {user?.firstName || user?.email?.split('@')[0]}</span>
//           <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewDropdownOpen, setViewDropdownOpen] = useState(false);
  const [activeView, setActiveView] = useState('desktop');
  const dropdownRef = useRef(null);

  // Auto detect screen size on load
  useEffect(() => {
    const checkView = () => {
      const width = window.innerWidth;
      if (width <= 480) setActiveView('mobile');
      else if (width <= 768) setActiveView('tablet');
      else setActiveView('desktop');
    };
    checkView();
    window.addEventListener('resize', checkView);
    return () => window.removeEventListener('resize', checkView);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setViewDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleViewChange = (view) => {
    setActiveView(view);
    const appContainer = document.querySelector('.app');
    const mainContent = document.querySelector('.main-content');
    
    if (view === 'mobile') {
      if (appContainer) {
        appContainer.style.maxWidth = '480px';
        appContainer.style.margin = '0 auto';
      }
      if (mainContent) mainContent.style.padding = '0.8rem';
    } else if (view === 'tablet') {
      if (appContainer) {
        appContainer.style.maxWidth = '768px';
        appContainer.style.margin = '0 auto';
      }
      if (mainContent) mainContent.style.padding = '1rem';
    } else {
      if (appContainer) {
        appContainer.style.maxWidth = '100%';
        appContainer.style.margin = '0';
      }
      if (mainContent) mainContent.style.padding = '2rem';
    }
    setViewDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/dashboard" className="navbar-brand">
          🕌 Islamic Charity Optimizer
        </Link>
        
        <div className="nav-right">
          {/* 3 Dots View Toggle Button */}
          <div className="view-dropdown" ref={dropdownRef}>
            <button 
              className="view-dropdown-btn"
              onClick={() => setViewDropdownOpen(!viewDropdownOpen)}
              title="Change View Mode"
            >
              <span className="dots-icon">⋮</span>
              <span className="view-label">View</span>
            </button>
            {viewDropdownOpen && (
              <div className="view-dropdown-menu">
                <div className="dropdown-header">
                  <span>📱 Display Mode</span>
                </div>
                <button 
                  className={`view-dropdown-item ${activeView === 'mobile' ? 'active' : ''}`}
                  onClick={() => handleViewChange('mobile')}
                >
                  <span className="item-icon">📱</span>
                  <span className="item-label">Mobile View</span>
                  {activeView === 'mobile' && <span className="check-icon">✓</span>}
                </button>
                <button 
                  className={`view-dropdown-item ${activeView === 'tablet' ? 'active' : ''}`}
                  onClick={() => handleViewChange('tablet')}
                >
                  <span className="item-icon">📟</span>
                  <span className="item-label">Tablet View</span>
                  {activeView === 'tablet' && <span className="check-icon">✓</span>}
                </button>
                <button 
                  className={`view-dropdown-item ${activeView === 'desktop' ? 'active' : ''}`}
                  onClick={() => handleViewChange('desktop')}
                >
                  <span className="item-icon">💻</span>
                  <span className="item-label">Desktop View</span>
                  {activeView === 'desktop' && <span className="check-icon">✓</span>}
                </button>
              </div>
            )}
          </div>

          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>🏠 Home</Link>
          <Link to="/zakat" onClick={() => setMobileMenuOpen(false)}>💰 Zakat Calculator</Link>
          <Link to="/city-area" onClick={() => setMobileMenuOpen(false)}>📍 Select City & Area</Link>
          <Link to="/donate" onClick={() => setMobileMenuOpen(false)}>🤲 Make Donation</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)}>ℹ️ About</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>📞 Contact</Link>
          <span className="user-name">👤 {user?.firstName || user?.email?.split('@')[0]}</span>
          <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;