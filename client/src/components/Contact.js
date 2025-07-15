import React, { useState, useEffect, useRef } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          if (entry.target.classList.contains('contact-info')) {
            const items = entry.target.querySelectorAll('.contact-item');
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('slide-in');
              }, index * 150);
            });
          }
        }
      });
    }, observerOptions);

    const elementsToObserve = [
      contactRef.current,
      formRef.current,
      infoRef.current,
      ...document.querySelectorAll('.form-group')
    ].filter(Boolean);

    elementsToObserve.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header fade-in-up">
          <h2>Get In <span className="text-gradient">Touch</span></h2>
        </div>

        <div className="contact-layout" ref={contactRef}>
          <div className="contact-info" ref={infoRef}>
            <div className="info-header">
              <h3>Let's start a conversation</h3>
              <p>Ready to bring your ideas to life? I'm always excited to work on new projects and collaborate with innovative minds.</p>
            </div>

            <div className="contact-methods">
              <div className="contact-item">
                <div className="contact-icon">
                  <div className="icon-wrapper">
                    <span>📧</span>
                    <div className="icon-ring"></div>
                  </div>
                </div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <p>luiscoronel2500@gmail.com</p>
                  <span className="contact-note">Primary contact method</span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <div className="icon-wrapper">
                    <span>📍</span>
                    <div className="icon-ring"></div>
                  </div>
                </div>
                <div className="contact-details">
                  <h4>Location</h4>
                  <p>Lexington, VA</p>
                  <span className="contact-note">Eastern Daylight Time</span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <div className="icon-wrapper">
                    <span>💼</span>
                    <div className="icon-ring"></div>
                  </div>
                </div>
                <div className="contact-details">
                  <h4>LinkedIn</h4>
                  <p>Professional network</p>
                  <a href="https://linkedin.com/in/luis-coronel" target="_blank" rel="noopener noreferrer" className="contact-link">
                    Connect →
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper" ref={formRef}>
            <div className="form-header">
              <h3>Send me a message</h3>
              <p>Have a project in mind? Let's discuss how we can work together.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-decorations">
                <div className="form-particle particle-1"></div>
                <div className="form-particle particle-2"></div>
                <div className="form-particle particle-3"></div>
                <div className="form-particle particle-4"></div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                  />
                  <div className="input-focus-line"></div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                  <div className="input-focus-line"></div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="What's this about?"
                />
                <div className="input-focus-line"></div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Tell me about your project, ideas, or just say hello..."
                ></textarea>
                <div className="input-focus-line"></div>
              </div>

              {submitStatus && (
                <div className={`form-status ${submitStatus.type}`}>
                  <div className="status-icon">
                    {submitStatus.type === 'success' ? '✅' : '❌'}
                  </div>
                  <span>{submitStatus.message}</span>
                </div>
              )}

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                <span className="btn-content">
                  <span className="btn-text">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  <span className="btn-arrow">→</span>
                </span>
                <div className="btn-bg"></div>
                <div className="btn-shine"></div>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="geometric-shapes">
        <div className="geo-shape triangle-1"></div>
        <div className="geo-shape circle-1"></div>
        <div className="geo-shape square-1"></div>
        <div className="geo-shape triangle-2"></div>
        <div className="geo-shape circle-2"></div>
        <div className="geo-shape hexagon-1"></div>
        <div className="geo-shape square-2"></div>
        <div className="geo-shape triangle-3"></div>
      </div>

      <div className="contact-ambient">
        <div className="ambient-glow glow-1"></div>
        <div className="ambient-glow glow-2"></div>
        <div className="ambient-glow glow-3"></div>
        <div className="code-rain">
          <div className="rain-line"></div>
          <div className="rain-line"></div>
          <div className="rain-line"></div>
        </div>
      </div>
    </section>
  );
};

export default Contact;