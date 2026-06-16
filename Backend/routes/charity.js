const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// City-Area mapping data
const cityAreaData = {
  cities: ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta'],
  areas: {
    Karachi: ['Gulshan-e-Iqbal', 'Clifton', 'North Nazimabad', 'Korangi', 'Malir', 'Gulistan-e-Johar', 'Shah Faisal'],
    Lahore: ['Gulberg', 'Model Town', 'DHA', 'Johar Town', 'Iqbal Town', 'Valencia Town'],
    Islamabad: ['F-6', 'F-7', 'F-8', 'G-9', 'G-10', 'E-7', 'DHA Phase 2'],
    Rawalpindi: ['Satellite Town', 'Westridge', 'Bahria Town', 'Gulshan Dadan Khan'],
    Faisalabad: ['People\'s Colony', 'Madina Town', 'Jinnah Colony', 'Ghulam Muhammadabad'],
    Multan: ['Cantt', 'Shah Rukn-e-Alam', 'Gulgasht', 'Bosan Road'],
    Peshawar: ['University Town', 'Cantt', 'Hayatabad', 'Phase 2 Hayatabad'],
    Quetta: ['Jinnah Town', 'Satellite Town', 'Airport Road', 'Mariabad']
  },
  povertyClusters: {
    'Karachi-Gulshan-e-Iqbal': 'High',
    'Karachi-Clifton': 'Low',
    'Karachi-North Nazimabad': 'Medium',
    'Karachi-Korangi': 'High',
    'Karachi-Malir': 'High',
    'Lahore-Gulberg': 'Low',
    'Lahore-Model Town': 'Medium',
    'Lahore-Johar Town': 'Medium',
    'Islamabad-F-6': 'Low',
    'Islamabad-F-7': 'Low',
    'Islamabad-G-9': 'Medium',
    'Rawalpindi-Satellite Town': 'Medium',
    'Rawalpindi-Bahria Town': 'Low'
  }
};

// Get cities
router.get('/cities', auth, (req, res) => {
  res.json({ cities: cityAreaData.cities });
});

// Get areas for a city
router.get('/areas/:city', auth, (req, res) => {
  const city = req.params.city;
  const areas = cityAreaData.areas[city] || [];
  res.json({ areas });
});

// Get poverty cluster
router.get('/cluster/:city/:area', auth, (req, res) => {
  const { city, area } = req.params;
  const key = `${city}-${area}`;
  const cluster = cityAreaData.povertyClusters[key] || 'Medium';
  res.json({ cluster });
});

// Get donation categories
router.get('/categories', auth, (req, res) => {
  res.json({ categories: ['Education', 'Food', 'Medicine', 'Poverty'] });
});

// Bank info
router.get('/bank-info', auth, (req, res) => {
  res.json({
    bankName: 'MEEZAN BANK LIMITED',
    accountTitle: 'ANEEQ SHAMS',
    iban: 'PK78MEZN0000300112090353',
    accountNumber: '00300112090353'
  });
});

module.exports = router;