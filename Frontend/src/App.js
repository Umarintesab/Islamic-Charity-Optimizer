

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ZakatCalculator from './components/ZakatCalculator';
import CityArea from './components/CityArea';
import DonationPage from './components/DonationPage';
import About from './components/About';
import ContactUs from './components/ContactUs';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const [zakatAmount, setZakatAmount] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [povertyCluster, setPovertyCluster] = useState(null);

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Navbar />}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard user={user} /> : <Navigate to="/login" />} />
            <Route path="/zakat" element={isAuthenticated ? <ZakatCalculator onZakatCalculated={setZakatAmount} /> : <Navigate to="/login" />} />
            
            {/* City & Area Selection Page - Pehle ye open hoga donation se pehle */}
            <Route path="/city-area" element={isAuthenticated && zakatAmount ? 
              <CityArea 
                onCityAreaSelected={(city, area, cluster, categories) => {
                  setSelectedCity(city);
                  setSelectedArea(area);
                  setPovertyCluster(cluster);
                  setSelectedCategories(categories);
                }} 
              /> : <Navigate to="/zakat" />} />
            
            {/* Donation Page - Sirf city/area select karne ke baad open hoga */}
            <Route path="/donate" element={isAuthenticated && zakatAmount && selectedCity ? 
              <DonationPage 
                zakatAmount={zakatAmount}
                city={selectedCity}
                area={selectedArea}
                povertyCluster={povertyCluster}
                categories={selectedCategories}
              /> : <Navigate to="/city-area" />} />
              
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>
        {!isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;