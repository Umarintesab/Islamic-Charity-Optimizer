// import React, { useState, useEffect } from 'react';

// function CurrencyConverter({ amount }) {
//   const [selectedCurrency, setSelectedCurrency] = useState('USD');
//   const [convertedAmount, setConvertedAmount] = useState(null);
//   const [exchangeRates, setExchangeRates] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const currencies = [
//     { code: 'USD', name: 'US Dollar', symbol: '$' },
//     { code: 'EUR', name: 'Euro', symbol: '€' },
//     { code: 'GBP', name: 'British Pound', symbol: '£' },
//     { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
//     { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼' },
//     { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
//     { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
//     { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' }
//   ];

//   // Free currency API (using exchangerate-api.com)
//   const fetchExchangeRates = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Using a free API - you can replace with your preferred API key
//       const response = await fetch('https://api.exchangerate-api.com/v4/latest/PKR');
//       const data = await response.json();
//       setExchangeRates(data.rates);
//     } catch (err) {
//       console.error('Error fetching exchange rates:', err);
//       setError('Unable to fetch exchange rates. Please try again later.');
//       // Fallback rates
//       setExchangeRates({
//         USD: 0.0036,
//         EUR: 0.0033,
//         GBP: 0.0028,
//         AED: 0.0132,
//         SAR: 0.0135,
//         CAD: 0.0049,
//         AUD: 0.0054,
//         MYR: 0.017
//       });
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchExchangeRates();
//     // Refresh rates every hour
//     const interval = setInterval(fetchExchangeRates, 3600000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (exchangeRates && amount) {
//       const rate = exchangeRates[selectedCurrency];
//       if (rate) {
//         setConvertedAmount(amount * rate);
//       }
//     }
//   }, [selectedCurrency, amount, exchangeRates]);

//   const handleCurrencyChange = (e) => {
//     setSelectedCurrency(e.target.value);
//   };

//   const getCurrencySymbol = (code) => {
//     const currency = currencies.find(c => c.code === code);
//     return currency ? currency.symbol : code;
//   };

//   return (
//     <div className="currency-converter">
//       <h4 style={{ marginBottom: '1rem', color: '#667eea' }}>💱 Currency Converter</h4>
//       <div className="form-row">
//         <div className="form-group">
//           <label>Amount in PKR</label>
//           <input type="number" value={amount} disabled style={{ background: 'rgba(255,255,255,0.2)' }} />
//         </div>
//         <div className="form-group">
//           <label>Convert to</label>
//           <select value={selectedCurrency} onChange={handleCurrencyChange}>
//             {currencies.map(curr => (
//               <option key={curr.code} value={curr.code}>{curr.name} ({curr.code})</option>
//             ))}
//           </select>
//         </div>
//       </div>
      
//       {loading && <p style={{ color: '#a9b4d6' }}>Loading exchange rates...</p>}
//       {error && <p style={{ color: '#ff4757' }}>{error}</p>}
      
//       {convertedAmount !== null && !loading && (
//         <div className="conversion-result">
//           <strong>Converted Amount:</strong> {getCurrencySymbol(selectedCurrency)} {convertedAmount.toFixed(2)} {selectedCurrency}
//         </div>
//       )}
      
//       <p style={{ fontSize: '12px', color: '#a9b4d6', marginTop: '0.5rem' }}>
//         * Exchange rates are updated hourly
//       </p>
//     </div>
//   );
// }

// export default CurrencyConverter;

import React, { useState, useEffect } from 'react';

function CurrencyConverter({ amount = 50000 }) {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRates, setExchangeRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userAmount, setUserAmount] = useState(amount);

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
    { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
    { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾' }
  ];

  const fetchExchangeRates = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/PKR');
      const data = await response.json();
      setExchangeRates(data.rates);
    } catch (err) {
      setExchangeRates({
        USD: 0.0036, EUR: 0.0033, GBP: 0.0028, AED: 0.0132,
        SAR: 0.0135, CAD: 0.0049, AUD: 0.0054, MYR: 0.017
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExchangeRates();
    const interval = setInterval(fetchExchangeRates, 3600000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (exchangeRates && userAmount) {
      const rate = exchangeRates[selectedCurrency];
      if (rate) setConvertedAmount(userAmount * rate);
    }
  }, [selectedCurrency, userAmount, exchangeRates]);

  const getCurrencyData = (code) => currencies.find(c => c.code === code);

  return (
    <div className="currency-converter">
      <div className="converter-header">
        <span>💱</span>
        <span>Live Currency Converter</span>
        {loading && <span className="loading-dot">...</span>}
      </div>
      
      <div className="converter-row">
        <div className="converter-input-group">
          <label>🇵🇰 PKR Amount</label>
          <input 
            type="number" 
            value={userAmount} 
            onChange={(e) => setUserAmount(parseFloat(e.target.value) || 0)}
          />
        </div>
        
        <div className="converter-arrow">→</div>
        
        <div className="converter-input-group">
          <label>Select Currency</label>
          <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
            {currencies.map(curr => (
              <option key={curr.code} value={curr.code}>
                {curr.flag} {curr.name} ({curr.code})
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {convertedAmount !== null && !loading && (
        <div className="conversion-result">
          <span className="result-label">Converted Amount:</span>
          <span className="result-value">
            {getCurrencyData(selectedCurrency)?.symbol} {convertedAmount.toFixed(2)} {selectedCurrency}
          </span>
        </div>
      )}
      
      <p className="update-note">🔄 Exchange rates updated hourly</p>
    </div>
  );
}

export default CurrencyConverter;
