import React, { useState, useEffect } from 'react';

function ViewToggle() {
  const [view, setView] = useState('desktop');

  const handleViewChange = (newView) => {
    setView(newView);
    const container = document.querySelector('.app');
    if (container) {
      switch (newView) {
        case 'mobile':
          container.style.maxWidth = '375px';
          container.style.margin = '0 auto';
          break;
        case 'tablet':
          container.style.maxWidth = '768px';
          container.style.margin = '0 auto';
          break;
        case 'desktop':
          container.style.maxWidth = '100%';
          container.style.margin = '0';
          break;
        default:
          container.style.maxWidth = '100%';
          container.style.margin = '0';
      }
    }
  };

  useEffect(() => {
    // Check if user is on mobile device
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setView('mobile');
      document.querySelector('.app').style.maxWidth = '375px';
      document.querySelector('.app').style.margin = '0 auto';
    }
  }, []);

  return (
    <div className="view-toggle" style={{ marginBottom: '1rem' }}>
      <button 
        className={`view-btn ${view === 'mobile' ? 'active' : ''}`}
        onClick={() => handleViewChange('mobile')}
      >
        📱 Mobile View
      </button>
      <button 
        className={`view-btn ${view === 'tablet' ? 'active' : ''}`}
        onClick={() => handleViewChange('tablet')}
      >
        📟 Tablet View
      </button>
      <button 
        className={`view-btn ${view === 'desktop' ? 'active' : ''}`}
        onClick={() => handleViewChange('desktop')}
      >
        💻 Desktop View
      </button>
    </div>
  );
}

export default ViewToggle;