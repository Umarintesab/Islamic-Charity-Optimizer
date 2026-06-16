

import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  // Quran Ayat about Zakat (Surah Al-Baqarah, Verse 43)
  const quranAyat = {
    arabic: "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ",
    surah: "Surah Al-Baqarah (2:43)",
    urdu: "اور نماز قائم کرو اور زکوٰۃ دو اور رکوع کرنے والوں کے ساتھ رکوع کرو",
    english: "And establish prayer, give Zakat, and bow with those who bow"
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        
        {/* Sliding Bismillah Message */}
        <div className="sliding-message-container">
          <div className="sliding-message">
            <div className="arabic-text">
              🌙 بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <div className="translation-text">
              In the name of Allah, the Most Gracious, the Most Merciful
            </div>
          </div>
        </div>

        <h1>Islamic Charity Optimizer</h1>
        
        <div className="ayat-container">
          <div className="ayat-arabic">{quranAyat.arabic}</div>
          <div className="ayat-reference">📖 {quranAyat.surah}</div>
          <div className="ayat-urdu">🕌 {quranAyat.urdu}</div>
          <div className="ayat-english">📝 {quranAyat.english}</div>
        </div>

        <p className="hero-quote">"Charity does not decrease wealth" - Prophet Muhammad ﷺ</p>
        <p>Calculate and distribute your Zakat with wisdom and precision</p>

        {/* Sirf Get Started Button - Login Button Hatadia */}
        <div className="hero-buttons">
          <Link to="/register" className="btn btn-primary">✨ Get Started</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;