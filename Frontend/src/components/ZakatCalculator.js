import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ZakatCalculator({ onZakatCalculated }) {
  const [zakatType, setZakatType] = useState('cash');
  const [cashAmount, setCashAmount] = useState('');
  const [goldQty, setGoldQty] = useState('');
  const [goldPrice, setGoldPrice] = useState('');
  const [silverQty, setSilverQty] = useState('');
  const [silverPrice, setSilverPrice] = useState('');
  const [businessAmount, setBusinessAmount] = useState('');
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const GOLD_NISAB = 7.5;
  const SILVER_NISAB = 52.5;
  const FIXED_NISAB_PKR = 61236;

  const calculateZakat = () => {
    let totalValue = 0;
    let zakatAmount = 0;
    let calculationText = '';

    switch (zakatType) {
      case 'cash':
        const cash = parseFloat(cashAmount);
        if (isNaN(cash) || cash <= 0) {
          alert('Please enter a valid cash amount');
          return;
        }
        totalValue = cash;
        calculationText = `Total Cash/Bank Balance: PKR ${cash.toLocaleString()}\nNisab: PKR ${FIXED_NISAB_PKR.toLocaleString()}`;
        if (cash >= FIXED_NISAB_PKR) {
          zakatAmount = cash * 0.025;
          calculationText += `\n✅ Nisab Reached\nZakat (2.5%): PKR ${zakatAmount.toLocaleString()}`;
        } else {
          zakatAmount = 0;
          calculationText += `\n❌ Nisab Not Reached\nZakat: PKR 0`;
          calculationText += `\n\nYou need PKR ${(FIXED_NISAB_PKR - cash).toLocaleString()} more to reach nisab`;
        }
        break;

      case 'gold':
        const qty = parseFloat(goldQty);
        const price = parseFloat(goldPrice);
        if (isNaN(qty) || qty <= 0 || isNaN(price) || price <= 0) {
          alert('Please enter valid quantity and price');
          return;
        }
        totalValue = qty * price;
        calculationText = `Gold Quantity: ${qty} Tola\nPrice per Tola: PKR ${price.toLocaleString()}\nTotal Value: PKR ${totalValue.toLocaleString()}\nNisab: ${GOLD_NISAB} Tola`;
        if (qty >= GOLD_NISAB) {
          zakatAmount = totalValue * 0.025;
          calculationText += `\n✅ Nisab Reached\nZakat (2.5%): PKR ${zakatAmount.toLocaleString()}`;
        } else {
          zakatAmount = 0;
          calculationText += `\n❌ Nisab Not Reached\nZakat: PKR 0`;
          calculationText += `\n\nYou need ${(GOLD_NISAB - qty).toFixed(1)} more tola to reach nisab`;
        }
        break;

      case 'silver':
        const silverQ = parseFloat(silverQty);
        const silverP = parseFloat(silverPrice);
        if (isNaN(silverQ) || silverQ <= 0 || isNaN(silverP) || silverP <= 0) {
          alert('Please enter valid quantity and price');
          return;
        }
        totalValue = silverQ * silverP;
        calculationText = `Silver Quantity: ${silverQ} Tola\nPrice per Tola: PKR ${silverP.toLocaleString()}\nTotal Value: PKR ${totalValue.toLocaleString()}\nNisab: ${SILVER_NISAB} Tola`;
        if (silverQ >= SILVER_NISAB) {
          zakatAmount = totalValue * 0.025;
          calculationText += `\n✅ Nisab Reached\nZakat (2.5%): PKR ${zakatAmount.toLocaleString()}`;
        } else {
          zakatAmount = 0;
          calculationText += `\n❌ Nisab Not Reached\nZakat: PKR 0`;
          calculationText += `\n\nYou need ${(SILVER_NISAB - silverQ).toFixed(1)} more tola to reach nisab`;
        }
        break;

      case 'business':
        const bizAmount = parseFloat(businessAmount);
        if (isNaN(bizAmount) || bizAmount <= 0) {
          alert('Please enter a valid amount');
          return;
        }
        totalValue = bizAmount;
        calculationText = `Business Goods Value: PKR ${bizAmount.toLocaleString()}\nNisab (Silver Equivalent): PKR ${FIXED_NISAB_PKR.toLocaleString()}`;
        if (bizAmount >= FIXED_NISAB_PKR) {
          zakatAmount = bizAmount * 0.025;
          calculationText += `\n✅ Nisab Reached\nZakat (2.5%): PKR ${zakatAmount.toLocaleString()}`;
        } else {
          zakatAmount = 0;
          calculationText += `\n❌ Nisab Not Reached\nZakat: PKR 0`;
          calculationText += `\n\nYou need PKR ${(FIXED_NISAB_PKR - bizAmount).toLocaleString()} more to reach nisab`;
        }
        break;

      default:
        break;
    }

    setResult({ amount: zakatAmount, text: calculationText });
    
    if (onZakatCalculated) {
      onZakatCalculated(zakatAmount);
    }
  };

  const handleNext = () => {
    if (!result) {
      alert('Please calculate Zakat first by clicking "Calculate Zakat" button.');
      return;
    }
    
    if (result.amount > 0) {
      if (onZakatCalculated) {
        onZakatCalculated(result.amount);
      }
      // Navigate to City & Area selection page (pehle donation page nahi)
      navigate('/city-area');
    } else {
      alert('Zakat is not wajib as nisab was not reached.\nPlease add more assets to reach nisab.');
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Zakat Calculator</h2>
      
      <div className="form-group">
        <label>Select Zakat Type</label>
        <select value={zakatType} onChange={(e) => setZakatType(e.target.value)}>
          <option value="cash">💰 Naqdi Raqam (Cash/Bank)</option>
          <option value="gold">✨ Sona (Gold)</option>
          <option value="silver">🥈 Chandi (Silver)</option>
          <option value="business">📦 Maal-e-Tijarat (Business)</option>
        </select>
      </div>

      {zakatType === 'cash' && (
        <div className="form-group">
          <label>Total Cash/Bank Balance (PKR)</label>
          <input
            type="number"
            value={cashAmount}
            onChange={(e) => setCashAmount(e.target.value)}
            placeholder="Enter amount in PKR"
          />
          <small style={{ color: '#a9b4d6', display: 'block', marginTop: '5px' }}>
            Nisab: PKR {FIXED_NISAB_PKR.toLocaleString()} (52.5 Tola Silver)
          </small>
        </div>
      )}

      {zakatType === 'gold' && (
        <>
          <div className="form-group">
            <label>Gold Quantity (Tola)</label>
            <input
              type="number"
              step="0.1"
              value={goldQty}
              onChange={(e) => setGoldQty(e.target.value)}
              placeholder="Enter gold in Tola"
            />
          </div>
          <div className="form-group">
            <label>Gold Price per Tola (PKR)</label>
            <input
              type="number"
              value={goldPrice}
              onChange={(e) => setGoldPrice(e.target.value)}
              placeholder="Current market price"
            />
          </div>
        </>
      )}

      {zakatType === 'silver' && (
        <>
          <div className="form-group">
            <label>Silver Quantity (Tola)</label>
            <input
              type="number"
              step="0.1"
              value={silverQty}
              onChange={(e) => setSilverQty(e.target.value)}
              placeholder="Enter silver in Tola"
            />
          </div>
          <div className="form-group">
            <label>Silver Price per Tola (PKR)</label>
            <input
              type="number"
              value={silverPrice}
              onChange={(e) => setSilverPrice(e.target.value)}
              placeholder="Current market price"
            />
          </div>
        </>
      )}

      {zakatType === 'business' && (
        <div className="form-group">
          <label>Total Business Goods Value (PKR)</label>
          <input
            type="number"
            value={businessAmount}
            onChange={(e) => setBusinessAmount(e.target.value)}
            placeholder="Enter value in PKR"
          />
          <small style={{ color: '#a9b4d6', display: 'block', marginTop: '5px' }}>
            Nisab: PKR {FIXED_NISAB_PKR.toLocaleString()} (52.5 Tola Silver)
          </small>
        </div>
      )}

      <button className="btn btn-primary" onClick={calculateZakat}>
        Calculate Zakat
      </button>

      {result && (
        <div className="results-box">
          <h3>Calculation Result</h3>
          <div style={{ whiteSpace: 'pre-line' }}>{result.text}</div>
        </div>
      )}

      <button className="btn btn-secondary" onClick={handleNext} style={{ marginTop: '1rem' }}>
        Next → Select City & Area
      </button>
    </div>
  );
}

export default ZakatCalculator;