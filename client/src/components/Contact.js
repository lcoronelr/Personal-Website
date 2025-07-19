import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

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

  // Initialize EmailJS when component mounts
  useEffect(() => {
    emailjs.init('JoNJh2SGdLizd6T2q');
  }, []);

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
      console.log('Attempting to send email...', formData);

      const result = await emailjs.send(
        'service_k3rtbxk',
        'template_ypych7e',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Luis Coronel',
          reply_to: formData.email,
        }
      );

      console.log('Email sent successfully:', result);
      setSubmitStatus({ 
        type: 'success', 
        message: 'Message sent successfully! I\'ll get back to you soon.' 
      });
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (error) {
      console.error('Email error details:', error);

      let errorMessage = 'Failed to send message. ';

      if (error.status === 422) {
        errorMessage += 'Please check all fields are filled correctly.';
      } else if (error.status === 400) {
        errorMessage += 'Invalid email configuration.';
      } else if (error.text) {
        errorMessage += error.text;
      } else {
        errorMessage += 'Please try emailing me directly at luiscoronel2500@gmail.com';
      }

      setSubmitStatus({ 
        type: 'error', 
        message: errorMessage
      });
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
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#5865F2">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    <div className="icon-ring"></div>
                  </div>
                </div>
                <div className="contact-details">
                  <h4>Discord</h4>
                  <p>@Nytso</p>
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
                  <a href="https://www.linkedin.com/in/luis-coronel-8776442ab/" target="_blank" rel="noopener noreferrer" className="contact-link">
                    Connect →
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <div className="icon-wrapper">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#FF0000' }}>
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <div className="icon-ring"></div>
                  </div>
                </div>
                <div className="contact-details">
                  <h4>YouTube</h4>
                  <p>Tech content & cool gaming videos.</p>
                  <a href="https://youtube.com/@Nytso2" target="_blank" rel="noopener noreferrer" className="contact-link">
                    Subscribe →
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

            {/* Auto-Rotating 3D Cube */}
            <div className="cube-container">
              <div className="cube">
                <div className="cube-face front"></div>
                <div className="cube-face back"></div>
                <div className="cube-face right"></div>
                <div className="cube-face left"></div>
                <div className="cube-face top"></div>
                <div className="cube-face bottom"></div>
              </div>
            </div>
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
