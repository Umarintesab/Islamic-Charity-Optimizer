

import React, { useState } from 'react';

function DonationPage({ zakatAmount, city, area, povertyCluster, categories }) {
  const [donationAmount, setDonationAmount] = useState(zakatAmount);
  const [receipt, setReceipt] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    bankAccount: '',
    bankName: '',
    phoneNumber: '',
    cnic: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Donor details for receipt
  const [donorDetails, setDonorDetails] = useState({
    fullName: user.firstName + ' ' + (user.lastName || ''),
    email: user.email || '',
    phone: '',
    cnic: '',
    address: ''
  });

  const bankInfo = {
    bankName: 'MEEZAN BANK LIMITED',
    accountTitle: 'ISLAMIC CHARITY OPTIMIZER',
    iban: 'PK78MEZN0000300112090353',
    accountNumber: '00300112090353',
    branchCode: '0030',
    swiftCode: 'MEZNPKKA'
  };

  // Handle payment form input changes
  const handlePaymentInputChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value
    });
  };

  // Handle donor details change
  const handleDonorDetailsChange = (e) => {
    setDonorDetails({
      ...donorDetails,
      [e.target.name]: e.target.value
    });
  };

  // Handle Donate Now button click
  const handleDonateNow = () => {
    setShowPaymentForm(true);
  };

  // Handle final confirmation
  const handleConfirmDonation = () => {
    // Validate donor details
    if (!donorDetails.fullName) {
      alert('Please enter your full name');
      return;
    }
    if (!donorDetails.phone) {
      alert('Please enter your phone number');
      return;
    }
    if (!donorDetails.cnic) {
      alert('Please enter your CNIC number');
      return;
    }

    // Validate payment details
    if (paymentMethod === 'card') {
      if (!paymentDetails.cardNumber || !paymentDetails.cardName || !paymentDetails.expiryDate || !paymentDetails.cvv) {
        alert('Please fill all card details');
        return;
      }
      if (paymentDetails.cardNumber.length < 16) {
        alert('Please enter valid card number');
        return;
      }
      if (paymentDetails.cvv.length < 3) {
        alert('Please enter valid CVV');
        return;
      }
    } else {
      if (!paymentDetails.bankAccount) {
        alert('Please enter bank account number');
        return;
      }
    }

    const today = new Date();
    const receiptData = {
      // Donor Information
      donorName: donorDetails.fullName,
      donorEmail: donorDetails.email || user.email,
      donorPhone: donorDetails.phone,
      donorCNIC: donorDetails.cnic,
      donorAddress: donorDetails.address,
      
      // Transaction Details
      transactionId: 'TXN' + Date.now() + Math.floor(Math.random() * 1000),
      transactionDate: today.toLocaleDateString('en-PK'),
      transactionTime: today.toLocaleTimeString('en-PK'),
      
      // Donation Details
      donationAmount: donationAmount,
      donationAmountWords: numberToWords(donationAmount),
      city: city,
      area: area,
      povertyCluster: povertyCluster,
      categories: categories,
      paymentMethod: paymentMethod,
      
      // Bank Details
      bankName: bankInfo.bankName,
      bankAccountTitle: bankInfo.accountTitle,
      bankIBAN: bankInfo.iban,
      bankAccountNumber: bankInfo.accountNumber,
      
      // Status
      status: 'COMPLETED'
    };
    setReceipt(receiptData);
    setShowPaymentForm(false);
    alert('✅ Donation successful! Thank you for your generosity.');
  };

  // Number to words conversion for receipt
  const numberToWords = (num) => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    
    if (num === 0) return 'Zero';
    
    const convertHundreds = (n) => {
      if (n === 0) return '';
      if (n < 10) return ones[n];
      if (n < 20) return teens[n - 10];
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
      return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + convertHundreds(n % 100) : '');
    };
    
    const crore = Math.floor(num / 10000000);
    const lakh = Math.floor((num % 10000000) / 100000);
    const thousand = Math.floor((num % 100000) / 1000);
    const hundred = num % 1000;
    
    let result = '';
    if (crore > 0) result += convertHundreds(crore) + ' Crore ';
    if (lakh > 0) result += convertHundreds(lakh) + ' Lakh ';
    if (thousand > 0) result += convertHundreds(thousand) + ' Thousand ';
    if (hundred > 0) result += convertHundreds(hundred);
    
    return result.trim() + ' Rupees Only';
  };

 const handlePrintReceipt = () => {
    const receiptWindow = window.open('', '_blank');
    receiptWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Donation Receipt - Islamic Charity Optimizer</title>
          <meta charset="UTF-8">
          
          // For responsive view 

          <style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Segoe UI', Arial, sans-serif;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .receipt-container {
    max-width: ${document.querySelector('.app')?.style.maxWidth === '480px' ? '450px' : 
                 document.querySelector('.app')?.style.maxWidth === '768px' ? '700px' : '800px'};
    width: 100%;
    background: linear-gradient(135deg, rgba(15, 12, 41, 0.95), rgba(48, 43, 99, 0.95));
    backdrop-filter: blur(10px);
    border-radius: 20px;
    box-shadow: 0 25px 50px rgba(0,0,0,0.4);
    overflow: hidden;
    border: 1px solid rgba(102, 126, 234, 0.4);
  }
  .receipt-header {
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    padding: 35px;
    text-align: center;
    border-bottom: 1px solid rgba(102, 126, 234, 0.3);
    position: relative;
    overflow: hidden;
  }
  .receipt-header::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.1), transparent);
    animation: rotate 20s linear infinite;
  }
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .logo-icon {
    font-size: 48px;
    margin-bottom: 10px;
    animation: pulse 2s ease infinite;
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  .receipt-header h1 {
    font-size: 28px;
    margin-bottom: 8px;
    letter-spacing: 1px;
    background: linear-gradient(135deg, #fff, #667eea);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .receipt-header p {
    opacity: 0.85;
    font-size: 14px;
    margin-bottom: 15px;
    color: #a9b4d6;
  }
  .status-badge {
    display: inline-block;
    background: linear-gradient(135deg, #4cd964, #2d8f3a);
    color: #0f0c29;
    padding: 6px 20px;
    border-radius: 30px;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 1px;
    box-shadow: 0 2px 10px rgba(76, 217, 100, 0.3);
  }
  .receipt-body {
    padding: 35px;
  }
  .receipt-title {
    text-align: center;
    margin-bottom: 35px;
  }
  .receipt-title h2 {
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-size: 26px;
    border-bottom: 2px solid #667eea;
    display: inline-block;
    padding-bottom: 8px;
  }
  .info-section {
    margin-bottom: 25px;
    background: rgba(0, 0, 0, 0.35);
    border-radius: 16px;
    padding: 18px;
    border: 1px solid rgba(102, 126, 234, 0.2);
  }
  .info-section h3 {
    color: #667eea;
    font-size: 18px;
    margin-bottom: 15px;
    border-left: 4px solid #667eea;
    padding-left: 12px;
  }
  .info-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
  }
  .info-row:last-child {
    border-bottom: none;
  }
  .info-label {
    font-weight: 600;
    color: #a9b4d6;
    width: 35%;
  }
  .info-value {
    color: #ffffff;
    width: 65%;
    word-break: break-word;
    font-weight: 500;
  }
  .amount-box {
    background: rgba(76, 217, 100, 0.08);
    border-radius: 16px;
    padding: 25px;
    margin: 25px 0;
    text-align: center;
    border: 1px solid rgba(76, 217, 100, 0.3);
  }
  .amount-box .amount {
    font-size: 36px;
    font-weight: bold;
    color: #4cd964;
  }
  .amount-box .amount-words {
    font-size: 13px;
    color: #a9b4d6;
    margin-top: 8px;
  }
  .footer {
    background: rgba(0, 0, 0, 0.4);
    padding: 20px;
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
  .footer p {
    font-size: 12px;
    color: #a9b4d6;
    margin: 5px 0;
  }
  .signature {
    margin-top: 35px;
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
  }
  .signature-line {
    text-align: center;
    width: 45%;
  }
  .signature-line hr {
    width: 80%;
    margin: 0 auto;
    border: none;
    border-top: 1px solid rgba(102, 126, 234, 0.5);
  }
  .signature-line p {
    margin-top: 10px;
    font-size: 12px;
    color: #a9b4d6;
  }

  /* Mobile Responsive */
  @media (max-width: 600px) {
    body {
      padding: 10px;
    }
    .receipt-container {
      margin: 0;
      border-radius: 12px;
    }
    .receipt-header {
      padding: 20px;
    }
    .receipt-header h1 {
      font-size: 18px;
    }
    .logo-icon {
      font-size: 32px;
    }
    .receipt-body {
      padding: 16px;
    }
    .receipt-title h2 {
      font-size: 18px;
    }
    .info-section {
      padding: 12px;
    }
    .info-section h3 {
      font-size: 14px;
    }
    .info-row {
      flex-direction: column;
      padding: 8px 0;
    }
    .info-label {
      width: 100%;
      margin-bottom: 5px;
    }
    .info-value {
      width: 100%;
    }
    .amount-box .amount {
      font-size: 22px;
    }
    .amount-box .amount-words {
      font-size: 10px;
    }
    .footer p {
      font-size: 9px;
    }
    .signature-line p {
      font-size: 9px;
    }
  }

  @media print {
    body {
      background: white;
      padding: 0;
    }
    .receipt-container {
      box-shadow: none;
      background: white;
      border: 1px solid #ddd;
    }
    .receipt-header {
      background: linear-gradient(135deg, #0f0c29, #302b63);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .receipt-header h1, .receipt-header p {
      color: white;
    }
    .receipt-body {
      background: white;
    }
    .receipt-title h2 {
      color: #2d5a27;
      background: none;
      -webkit-background-clip: unset;
    }
    .info-section {
      background: #f5f5f5;
      border: 1px solid #ddd;
    }
    .info-section h3 {
      color: #2d5a27;
    }
    .info-label {
      color: #555;
    }
    .info-value {
      color: #333;
    }
    .amount-box {
      background: #e8f5e9;
    }
    .amount-box .amount {
      color: #2d5a27;
    }
    .footer {
      background: #f5f5f5;
    }
    .footer p {
      color: #666;
    }
    .status-badge {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .no-print {
      display: none;
    }
  }
</style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="receipt-header">
              <div class="logo-icon">🕌</div>
              <h1>Islamic Charity Optimizer</h1>
              <p>Official Donation Receipt</p>
              <div class="status-wrapper">
                <span class="status-badge">✔ COMPLETED</span>
              </div>
            </div>
            
            <div class="receipt-body">
              <div class="receipt-title">
                <h2>DONATION RECEIPT</h2>
              </div>
              
              <!-- Transaction Info -->
              <div class="info-section">
                <h3>📋 Transaction Information</h3>
                <div class="info-row">
                  <span class="info-label">Transaction ID:</span>
                  <span class="info-value">${receipt.transactionId}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Date & Time:</span>
                  <span class="info-value">${receipt.transactionDate} at ${receipt.transactionTime}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Payment Method:</span>
                  <span class="info-value">${receipt.paymentMethod === 'card' ? '💳 Credit/Debit Card' : '🏦 Bank Transfer'}</span>
                </div>
              </div>
              
              <!-- Donor Information -->
              <div class="info-section">
                <h3>👤 Donor Information</h3>
                <div class="info-row">
                  <span class="info-label">Full Name:</span>
                  <span class="info-value">${receipt.donorName}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Email Address:</span>
                  <span class="info-value">${receipt.donorEmail}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Phone Number:</span>
                  <span class="info-value">${receipt.donorPhone}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">CNIC Number:</span>
                  <span class="info-value">${receipt.donorCNIC}</span>
                </div>
                ${receipt.donorAddress ? `
                <div class="info-row">
                  <span class="info-label">Address:</span>
                  <span class="info-value">${receipt.donorAddress}</span>
                </div>
                ` : ''}
              </div>
              
              <!-- Donation Details -->
              <div class="info-section">
                <h3>🤲 Donation Details</h3>
                <div class="info-row">
                  <span class="info-label">Donation For:</span>
                  <span class="info-value">${receipt.categories.join(', ')}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Location:</span>
                  <span class="info-value">${receipt.city}, ${receipt.area}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Poverty Level:</span>
                  <span class="info-value">${receipt.povertyCluster}</span>
                </div>
              </div>
              
              <!-- Amount -->
              <div class="amount-box">
                <div class="amount">PKR ${receipt.donationAmount.toLocaleString()}</div>
                <div class="amount-words">${receipt.donationAmountWords}</div>
              </div>
              
              <!-- Bank Information -->
              <div class="info-section">
                <h3>🏦 Bank Account Details (Receiver)</h3>
                <div class="info-row">
                  <span class="info-label">Bank Name:</span>
                  <span class="info-value">${receipt.bankName}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Account Title:</span>
                  <span class="info-value">${receipt.bankAccountTitle}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Account Number:</span>
                  <span class="info-value">${receipt.bankAccountNumber}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">IBAN:</span>
                  <span class="info-value">${receipt.bankIBAN}</span>
                </div>
              </div>
              
              <!-- Signature Area -->
              <div class="signature">
                <div class="signature-line">
                  <hr>
                  <p>Donor Signature</p>
                </div>
                <div class="signature-line">
                  <hr>
                  <p>Authorized Signature</p>
                </div>
              </div>
            </div>
            
            <div class="footer">
              <p>✨ Thank you for your generous donation! May Allah bless you. ✨</p>
              <p>📄 This is a computer generated receipt - No signature required.</p>
              <p>📞 For any queries, contact: islamiccharityoptimizer@gmail.com | +92 3171115465 OR +92 3042607530</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px;" class="no-print">
            <button onclick="window.print();" style="padding: 12px 30px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: bold; margin: 0 5px;">
              🖨️ Print Receipt
            </button>
            <button onclick="window.close();" style="padding: 12px 30px; background: #2d2d44; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; margin: 0 5px;">
              ✖ Close
            </button>
          </div>
        </body>
      </html>
    `);
    receiptWindow.document.close();
  };

  // Currency converter state
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', flag: '🇰🇼' },
  { code: 'IRR', name: 'Iranian Rial', symbol: '﷼', flag: '🇮🇷' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' }
];

  const fetchExchangeRates = async () => {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/PKR');
      const data = await response.json();
      setExchangeRates(data.rates);
    } catch (err) {
      setExchangeRates({
         USD: 0.0036, EUR: 0.0033, GBP: 0.0028, AED: 0.0132, SAR: 0.0135,
  INR: 0.30, BDT: 0.43, KWD: 0.0011, IRR: 152, CAD: 0.0049,
  AUD: 0.0054, MYR: 0.017, TRY: 0.12, CNY: 0.026, JPY: 0.54
      });
    }
  };

  React.useEffect(() => {
    fetchExchangeRates();
  }, []);

  React.useEffect(() => {
    if (exchangeRates && donationAmount) {
      const rate = exchangeRates[selectedCurrency];
      if (rate) {
        setConvertedAmount(donationAmount * rate);
      }
    }
  }, [selectedCurrency, donationAmount, exchangeRates]);

  const getCurrencySymbol = (code) => {
    const currency = currencies.find(c => c.code === code);
    return currency ? currency.symbol : code;
  };

  return (
    <div className="card">
      <h2 className="card-title">Donation Page</h2>

      {/* Zakat Information */}
      <div className="results-box">
        <h3>Your Zakat Information</h3>
        <p><strong>City:</strong> {city}</p>
        <p><strong>Area:</strong> {area}</p>
        <p><strong>Poverty Level:</strong> {povertyCluster}</p>
        <p><strong>Categories:</strong> {categories?.join(', ')}</p>
        <p><strong>Calculated Zakat:</strong> PKR {zakatAmount?.toLocaleString()}</p>
      </div>

      {/* Currency Converter */}
      <div className="currency-converter" style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '1rem', margin: '1rem 0' }}>
        <h4 style={{ marginBottom: '1rem', color: '#667eea' }}>💱 Currency Converter</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Amount in PKR</label>
            <input type="number" value={donationAmount} disabled style={{ background: 'rgba(255,255,255,0.2)' }} />
          </div>
          <div className="form-group">
            <label>Select Currency</label>
            <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
              <option value="USD">🇺🇸 US Dollar (USD)</option>
              <option value="EUR">🇪🇺 Euro (EUR)</option>
              <option value="GBP">🇬🇧 British Pound (GBP)</option>
              <option value="AED">🇦🇪 UAE Dirham (AED)</option>
              <option value="SAR">🇸🇦 Saudi Riyal (SAR)</option>
              <option value="INR">🇮🇳 Indian Rupee (INR)</option>
              <option value="BDT">🇧🇩 Bangladeshi Taka (BDT)</option>
              <option value="KWD">🇰🇼 Kuwaiti Dinar (KWD)</option>
              <option value="IRR">🇮🇷 Iranian Rial (IRR)</option>
              <option value="CAD">🇨🇦 Canadian Dollar (CAD)</option>
              <option value="AUD">🇦🇺 Australian Dollar (AUD)</option>
              <option value="MYR">🇲🇾 Malaysian Ringgit (MYR)</option>
              <option value="TRY">🇹🇷 Turkish Lira (TRY)</option>
              <option value="CNY">🇨🇳 Chinese Yuan (CNY)</option>
              <option value="JPY">🇯🇵 Japanese Yen (JPY)</option>
            </select>
          </div>
        </div>
        
        {convertedAmount !== null && (
          <div className="conversion-result" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#4cd964', marginTop: '0.5rem' }}>
            <strong>Converted Amount:</strong> {getCurrencySymbol(selectedCurrency)} {convertedAmount.toFixed(2)} {selectedCurrency}
          </div>
        )}
        
        <p style={{ fontSize: '12px', color: '#a9b4d6', marginTop: '0.5rem' }}>
          * Exchange rates are updated hourly
        </p>
      </div>
  

      {/* View Toggle Buttons */}
      {/* <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <button style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white', cursor: 'pointer' }}
          onClick={() => { const container = document.querySelector('.app'); if(container) { container.style.maxWidth = '375px'; container.style.margin = '0 auto'; } }}>
          📱 Mobile View
        </button>
        <button style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white', cursor: 'pointer' }}
          onClick={() => { const container = document.querySelector('.app'); if(container) { container.style.maxWidth = '768px'; container.style.margin = '0 auto'; } }}>
          📟 Tablet View
        </button>
        <button style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white', cursor: 'pointer' }}
          onClick={() => { const container = document.querySelector('.app'); if(container) { container.style.maxWidth = '100%'; container.style.margin = '0'; } }}>
          💻 Desktop View
        </button>
      </div> */}

      {/* Donation Amount Input */}
      <div className="form-group">
        <label>Donation Amount (PKR)</label>
        <input
          type="number"
          value={donationAmount}
          onChange={(e) => setDonationAmount(parseFloat(e.target.value))}
        />
      </div>

      {/* Bank Transfer Details */}
      <div className="results-box">
        <h3>Bank Transfer Details</h3>
        <p><strong>Bank Name:</strong> {bankInfo.bankName}</p>
        <p><strong>Account Title:</strong> {bankInfo.accountTitle}</p>
        <p><strong>IBAN:</strong> {bankInfo.iban}</p>
        <p><strong>Account Number:</strong> {bankInfo.accountNumber}</p>
      </div>

      {/* DONATE NOW BUTTON */}
      <button className="btn btn-primary" onClick={handleDonateNow} style={{ width: '100%', marginTop: '1rem' }}>
        👐 Donate Now
      </button>

      {/* PAYMENT FORM - Shows after clicking Donate Now */}
      {showPaymentForm && (
        <div className="results-box" style={{ marginTop: '1.5rem' }}>
          <h3>Complete Your Donation</h3>
          
          {/* Donor Information Form */}
          <div className="info-section" style={{ marginBottom: '20px' }}>
            <h4 style={{ color: '#667eea', marginBottom: '10px' }}>👤 Donor Information</h4>
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="fullName" value={donorDetails.fullName} onChange={handleDonorDetailsChange} placeholder="Enter your full name" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" value={donorDetails.email} onChange={handleDonorDetailsChange} placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input type="tel" name="phone" value={donorDetails.phone} onChange={handleDonorDetailsChange} placeholder="03XX XXXXXXX" />
            </div>
            <div className="form-group">
              <label>CNIC Number *</label>
              <input type="text" name="cnic" value={donorDetails.cnic} onChange={handleDonorDetailsChange} placeholder="12345-1234567-1" />
            </div>
            <div className="form-group">
              <label>Address (Optional)</label>
              <input type="text" name="address" value={donorDetails.address} onChange={handleDonorDetailsChange} placeholder="Your full address" />
            </div>
          </div>
          
          {/* Payment Method Selection */}
          <div className="form-group">
            <label>Select Payment Method</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="card">💳 Credit / Debit Card</option>
              <option value="bank">🏦 Bank Transfer</option>
            </select>
          </div>

          {paymentMethod === 'card' ? (
            // Card Payment Form
            <>
              <div className="form-group">
                <label>Card Number</label>
                <input type="text" name="cardNumber" placeholder="1234 5678 9012 3456" maxLength="16" value={paymentDetails.cardNumber} onChange={handlePaymentInputChange} />
              </div>
              <div className="form-group">
                <label>Cardholder Name</label>
                <input type="text" name="cardName" placeholder="Name on card" value={paymentDetails.cardName} onChange={handlePaymentInputChange} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input type="text" name="expiryDate" placeholder="MM/YY" value={paymentDetails.expiryDate} onChange={handlePaymentInputChange} />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input type="password" name="cvv" placeholder="123" maxLength="3" value={paymentDetails.cvv} onChange={handlePaymentInputChange} />
                </div>
              </div>
            </>
          ) : (
            // Bank Transfer Form
            <>
              <div className="form-group">
                <label>Your Bank Account Number</label>
                <input type="text" name="bankAccount" placeholder="Enter your bank account number" value={paymentDetails.bankAccount} onChange={handlePaymentInputChange} />
              </div>
              <div className="form-group">
                <label>Your Bank Name</label>
                <input type="text" name="bankName" placeholder="Enter your bank name" value={paymentDetails.bankName} onChange={handlePaymentInputChange} />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Donation Amount</label>
            <input type="text" value={`PKR ${donationAmount.toLocaleString()}`} disabled />
          </div>

          {/* Confirm Donation Button */}
          <button className="btn btn-primary" onClick={handleConfirmDonation} style={{ width: '100%', marginTop: '1rem' }}>
            ✅ Confirm Donation
          </button>
          
          <button className="btn btn-secondary" onClick={() => setShowPaymentForm(false)} style={{ width: '100%', marginTop: '0.5rem' }}>
            Cancel
          </button>
        </div>
      )}

      {/* Receipt after successful donation */}
      {receipt && (
        <div className="results-box" style={{ marginTop: '1.5rem' }}>
          <h3>✅ Donation Successful!</h3>
          <p><strong>Transaction ID:</strong> {receipt.transactionId}</p>
          <p><strong>Amount:</strong> PKR {receipt.donationAmount.toLocaleString()}</p>
          <p><strong>Donor:</strong> {receipt.donorName}</p>
          <p><strong>Phone:</strong> {receipt.donorPhone}</p>
          <p><strong>Date:</strong> {receipt.transactionDate}</p>
          <button className="btn btn-primary" onClick={handlePrintReceipt} style={{ marginTop: '1rem' }}>
            🖨️ Print Receipt
          </button>
        </div>
      )}
    </div>
  );
}

export default DonationPage;