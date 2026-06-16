

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CityArea({ onCityAreaSelected }) {
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [allData, setAllData] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [povertyCluster, setPovertyCluster] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [overall, setOverall] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const categories = ['Education', 'Food', 'Medicine', 'Poverty'];

  // Load real data from JSON file
  useEffect(() => {
    fetch('/data/city_area_mapping.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('File not found');
        }
        return res.json();
      })
      .then(data => {
        console.log('Loaded data:', data); // Debug ke liye
        setAllData(data);
        // Get unique cities - check column name (City or city)
        const uniqueCities = [...new Set(data.map(item => item.City || item.city))];
        setCities(uniqueCities);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading city data:', err);
        setError('Failed to load city data. Please check if city_mapping.json exists.');
        setLoading(false);
      });
  }, []);

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedArea('');
    setPovertyCluster(null);
    
    // Filter areas for selected city - check column name
    const cityAreas = allData.filter(item => (item.City || item.city) === city);
    setAreas(cityAreas.map(item => item.Area || item.area));
  };

  const handleAreaChange = (area) => {
    setSelectedArea(area);
    // Find poverty cluster - check column names
    const record = allData.find(item => (item.City || item.city) === selectedCity && (item.Area || item.area) === area);
    setPovertyCluster(record?.Poverty_Cluster || record?.poverty_cluster || 'Medium');
  };

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleNext = () => {
    if (!selectedCity) {
      alert('Please select a city');
      return;
    }
    if (!selectedArea) {
      alert('Please select an area');
      return;
    }

    let finalCategories = [];
    if (overall) {
      finalCategories = ['Overall'];
    } else if (selectedCategories.length > 0) {
      finalCategories = selectedCategories;
    } else {
      finalCategories = categories;
    }

    onCityAreaSelected(selectedCity, selectedArea, povertyCluster, finalCategories);
    navigate('/donate');
  };

  if (loading) {
    return (
      <div className="card">
        <h2 className="card-title">Select City & Area</h2>
        <p>Loading cities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2 className="card-title">Select City & Area</h2>
        <div className="error-message">{error}</div>
        <p>Please make sure city_mapping.json file exists in public/data/ folder.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="card-title">Select City & Area</h2>
      
      <div className="form-group">
        <label>Select City</label>
        <select value={selectedCity} onChange={(e) => handleCityChange(e.target.value)}>
          <option value="">-- Select City --</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {selectedCity && (
        <div className="form-group">
          <label>Select Area</label>
          <select value={selectedArea} onChange={(e) => handleAreaChange(e.target.value)}>
            <option value="">-- Select Area --</option>
            {areas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>
      )}

      {povertyCluster && selectedArea && (
        <div className="results-box">
          <h3>📍 Location Info</h3>
          <p><strong>City:</strong> {selectedCity}</p>
          <p><strong>Area:</strong> {selectedArea}</p>
          <p><strong>Poverty Level:</strong> <span style={{color: povertyCluster === 'High' ? '#ff4757' : povertyCluster === 'Medium' ? '#ffd43b' : '#4cd964'}}>{povertyCluster}</span></p>
        </div>
      )}

      <div className="form-group">
        <label>Select Donation Categories</label>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input type="checkbox" checked={overall} onChange={(e) => setOverall(e.target.checked)} />
            🌍 Overall (All Categories)
          </label>
        </div>
        {!overall && (
          <div className="checkbox-group">
            {categories.map(cat => (
              <label key={cat} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                {cat === 'Education' && '📚'} {cat === 'Food' && '🍲'} {cat === 'Medicine' && '💊'} {cat === 'Poverty' && '🤲'} {cat}
              </label>
            ))}
          </div>
        )}
      </div>

      <button className="btn btn-primary" onClick={handleNext}>
        Next → Donation Page
      </button>
    </div>
  );
}

export default CityArea;