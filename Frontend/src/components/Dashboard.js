

import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard({ user }) {
  // Quran Ayat about Zakat (Surah Taubah, Verse 60)
  const quranAyat = {
    arabic: "إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ",
    surah: "Surah At-Taubah (9:60)",
    urdu: "زکوٰۃ صرف فقیروں، مسکینوں، زکوٰۃ وصول کرنے والوں، جن کے دل اسلام سے لگائے جائیں، غلاموں کی آزادی میں، قرض داروں، اللہ کی راہ میں اور مسافروں کے لیے ہے۔",
    english: "Zakat is only for the poor, needy, collectors, and for freeing captives, debtors, in Allah's cause, and for travelers."
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.firstName || user?.email?.split('@')[0]}! 👋</h1>
        <p>Manage your Zakat and track your donations</p>
      </div>

      {/* Quran Ayat Box */}
      <div className="ayat-container-dashboard">
        <div className="ayat-arabic-dashboard">{quranAyat.arabic}</div>
        <div className="ayat-reference-dashboard">📖 {quranAyat.surah}</div>
        <div className="ayat-urdu-dashboard">🕌 {quranAyat.urdu}</div>
        <div className="ayat-english-dashboard">📝 {quranAyat.english}</div>
      </div>

      {/* Dashboard Cards - City & Area Box ADDED between Zakat and Donation */}
      <div className="dashboard-grid">
        <Link to="/zakat" className="dashboard-card">
          <div className="card-icon">💰</div>
          <h3>Zakat Calculator</h3>
          <p>Calculate how much Zakat you owe</p>
        </Link>

        {/* City & Area Selection Box */}
        <Link to="/city-area" className="dashboard-card city-card">
          <div className="card-icon">📍</div>
          <h3>Select City & Area</h3>
          <p>Choose location for donation</p>
        </Link>

        <Link to="/donate" className="dashboard-card donate-card">
          <div className="card-icon">🤲</div>
          <h3>Make Donation</h3>
          <p>Pay your calculated Zakat</p>
        </Link>

        <Link to="/about" className="dashboard-card">
          <div className="card-icon">ℹ️</div>
          <h3>About Zakat</h3>
          <p>Learn Islamic rulings</p>
        </Link>

        <Link to="/contact" className="dashboard-card">
          <div className="card-icon">📞</div>
          <h3>Contact Us</h3>
          <p>Get assistance</p>
        </Link>
      </div>

      {/* Quick Stats Box */}
      <div className="quick-stats-center">
        <div className="widget">
          <h3>📊 Quick Stats</h3>
          <div className="stat-item">
            <span>Nisab (Gold):</span>
            <strong>7.5 Tola</strong>
          </div>
          <div className="stat-item">
            <span>Nisab (Silver):</span>
            <strong>52.5 Tola</strong>
          </div>
          <div className="stat-item">
            <span>Zakat Rate:</span>
            <strong>2.5%</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;