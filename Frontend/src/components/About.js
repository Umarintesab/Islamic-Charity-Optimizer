

import React from 'react';

function About() {
  return (
    <div className="card">
      <h2 className="card-title">About Islamic Charity Optimizer</h2>
      
      <div className="about-content">
        
        {/* Mission Section */}
        <div className="results-box">
          <h3>📖 Our Mission</h3>
          <p>
            Islamic Charity Optimizer is a comprehensive Zakat management system designed to help Muslims 
            fulfill their Zakat obligation with accuracy and ease. Our platform combines Islamic principles 
            with modern technology to ensure your Zakat reaches those who need it most.
          </p>
          <p style={{ marginTop: '10px' }}>
            We believe that every Muslim should be able to calculate their Zakat correctly and distribute it 
            to the most deserving recipients. Our mission is to make Zakat calculation simple, transparent, 
            and impactful.
          </p>
        </div>

        {/* What is Zakat - Paragraph */}
        <div className="results-box">
          <h3>🕌 What is Zakat?</h3>
          <p>
            Zakat is the third pillar of Islam, representing a mandatory charitable contribution. 
            The word "Zakat" means purification and growth. It is an obligation upon every financially 
            able Muslim to give 2.5% of their surplus wealth to those in need.
          </p>
          <p style={{ marginTop: '10px' }}>
            The Quran mentions Zakat alongside prayer (Salah) in over 30 verses, emphasizing its 
            importance in Islamic faith. Zakat is not just a charitable donation; it is a right of the poor 
            and a means of purifying one's wealth.
          </p>
          <p style={{ marginTop: '10px', fontStyle: 'italic', color: '#ffd43b', textAlign: 'center' }}>
            "And establish prayer and give Zakat, and bow with those who bow" — Surah Al-Baqarah (2:43)
          </p>
        </div>

        {/* Who is Eligible - Point Based */}
        <div className="results-box">
          <h3>👥 Who is Eligible to Receive Zakat?</h3>
          <p>According to Surah At-Taubah (9:60), Zakat can be distributed among eight categories:</p>
          <ul>
            <li><strong>1. Al-Fuqara</strong> — The poor who have little to no wealth</li>
            <li><strong>2. Al-Masakin</strong> — The needy who are in difficult circumstances</li>
            <li><strong>3. Al-Amilina Alayha</strong> — Zakat collectors and administrators</li>
            <li><strong>4. Al-Mu'allafatu Qulubuhum</strong> — Those whose hearts are to be reconciled</li>
            <li><strong>5. Fi Al-Riqab</strong> — Freeing captives and slaves</li>
            <li><strong>6. Al-Gharimin</strong> — Those in debt</li>
            <li><strong>7. Fi Sabil Allah</strong> — In the cause of Allah (including students, travelers, etc.)</li>
            <li><strong>8. Ibn Al-Sabil</strong> — Stranded travelers</li>
          </ul>
        </div>

        {/* Nisab Threshold - Point Based */}
        <div className="results-box">
          <h3>💰 Nisab Threshold (Zakat Ka Darja)</h3>
          <p>Zakat becomes obligatory when your wealth exceeds the Nisab threshold:</p>
          <ul>
            <li><strong>Gold Nisab (Sona):</strong> 7.5 Tola (87.48 grams)</li>
            <li><strong>Silver Nisab (Chandi):</strong> 52.5 Tola (612.36 grams)</li>
          </ul>
          <p style={{ marginTop: '10px' }}>
            If your wealth equals or exceeds the value of either Nisab, and you have held it for one 
            lunar year (Hawl), you must pay 2.5% Zakat on your total eligible wealth.
          </p>
        </div>

        {/* Zakat Types - Point Based */}
        <div className="results-box">
          <h3>✨ Zakat Types Explained (Assets on Which Zakat is Due)</h3>
          <ul>
            <li><strong>💰 Naqdi Raqam (Cash/Bank):</strong> Cash in hand, bank savings, and current accounts — 2.5% Zakat due if wealth reaches Nisab</li>
            <li><strong>✨ Sona (Gold):</strong> Gold jewelry, coins, and bullion — Zakat wajib on 7.5 Tola or more</li>
            <li><strong>🥈 Chandi (Silver):</strong> Silver jewelry, coins, and bullion — Zakat wajib on 52.5 Tola or more</li>
            <li><strong>📦 Maal-e-Tijarat (Business):</strong> Business inventory and stock intended for trade — 2.5% Zakat on total value</li>
          </ul>
        </div>

        {/* How Our Platform Helps - Point Based */}
        <div className="results-box">
          <h3>⚡ How Islamic Charity Optimizer Helps You</h3>
          <ul>
            <li><strong>✅ Accurate Zakat Calculation</strong> — Calculate Zakat on Cash, Gold, Silver, and Business assets with automatic Nisab verification</li>
            <li><strong>📍 Location-Based Poverty Detection</strong> — Select your city and area to identify poverty levels (High/Medium/Low) and help those most in need</li>
            <li><strong>💱 Multi-Currency Support</strong> — Convert your donation to 15+ currencies including USD, INR, BDT, KWD, IRR, and more via live exchange rates</li>
            <li><strong>📄 Digital Donation Receipts</strong> — Generate and print professional donation receipts with transaction ID for your records</li>
            <li><strong>🔐 Secure User Authentication</strong> — Register and login to track your Zakat calculations and donation history</li>
            <li><strong>📊 Real Data Integration</strong> — Uses 357+ real locations across Pakistan with authentic poverty cluster data</li>
          </ul>
        </div>

        {/* Quick Facts - Point Based */}
        <div className="results-box">
          <h3>📊 Quick Facts About Zakat</h3>
          <ul>
            <li>📖 Zakat is mentioned in the Quran over 30 times alongside prayer (Salah)</li>
            <li>🌍 Approximately 1.8 billion Muslims worldwide are obligated to pay Zakat</li>
            <li>💰 The annual global Zakat collection is estimated at over $200 billion USD</li>
            <li>📅 Zakat is due once every lunar year (Hawl) — approximately 354 days</li>
            <li>📊 Zakat rate is fixed at 2.5% for all eligible assets</li>
            <li>🕌 Zakat can be paid at any time of the year, but many prefer to pay during Ramadan</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="results-box">
          <h3>📞 Need Help or Have Questions?</h3>
          <p>
            If you have any questions about Zakat calculation, Islamic rulings, or need assistance 
            with our platform, please don't hesitate to reach out:
          </p>
          <ul>
            <li>📧 <strong>Email:</strong> islamiccharityoptimizer@gmail.com</li>
            <li>📞 <strong>Phone:</strong> +92 3171115465 OR +92 3042607530</li>
            <li>📍 <strong>Address:</strong> Building number 3 , Khayaban-e-Bhukari, Karachi, Pakistan</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="results-box" style={{ borderLeftColor: '#ffc107' }}>
          <h3>⚠️ Important Note</h3>
          <p>
            This platform is designed to assist you in calculating your Zakat based on standard Islamic 
            principles (Hanafi school of thought). For complex financial situations or specific scholarly 
            opinions, we recommend consulting with a qualified Islamic scholar or your local imam.
          </p>
          <p style={{ marginTop: '10px' }}>
            All calculations are for informational purposes. Always verify with a trusted religious authority.
          </p>
        </div>

      </div>
    </div>
  );
}

export default About;