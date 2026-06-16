import React, { useState } from 'react';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="card">
      <h2 className="card-title">Contact Us</h2>
      <p style={{ color: '#cfd8ff', marginBottom: '2rem' }}>
        Have questions about Zakat or need assistance? Reach out to us!
      </p>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="info-item">
            <span className="info-icon">📍</span>
            <div>
              <h4>Address</h4>
              <p>Building number 3 , Khayaban-e-Bhukari, Karachi, Pakistan</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">📧</span>
            <div>
              <h4>Email</h4>
              <p>islamiccharityoptimizer@gmail.com</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">📞</span>
            <div>
              <h4>Phone</h4>
              <p>+92 3171115465 OR +92 3042607530</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">⏰</span>
            <div>
              <h4>Hours</h4>
              <p>Mon-Fri: 9am - 6pm</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Send Message</button>
          {submitted && <div className="success-message">Message sent successfully!</div>}
        </form>
      </div>
    </div>
  );
}

export default ContactUs;