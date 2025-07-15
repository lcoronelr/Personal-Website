import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <h3>Luis Coronel</h3>
              <p>Computer science student at Washington and Lee university.</p>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <nav className="footer-nav">
                <button onClick={() => scrollToSection('home')} style={{ background: 'none', border: 'none', color: 'var(--secondary-color)', textDecoration: 'none', transition: 'all 0.3s ease', padding: '0.5rem 0', fontWeight: '500', fontSize: '1rem', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
                  Home
                </button>
                <button onClick={() => scrollToSection('about')} style={{ background: 'none', border: 'none', color: 'var(--secondary-color)', textDecoration: 'none', transition: 'all 0.3s ease', padding: '0.5rem 0', fontWeight: '500', fontSize: '1rem', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
                  About
                </button>
                <button onClick={() => scrollToSection('projects')} style={{ background: 'none', border: 'none', color: 'var(--secondary-color)', textDecoration: 'none', transition: 'all 0.3s ease', padding: '0.5rem 0', fontWeight: '500', fontSize: '1rem', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
                  Projects
                </button>
                <button onClick={() => scrollToSection('contact')} style={{ background: 'none', border: 'none', color: 'var(--secondary-color)', textDecoration: 'none', transition: 'all 0.3s ease', padding: '0.5rem 0', fontWeight: '500', fontSize: '1rem', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
                  Contact
                </button>
              </nav>
            </div>

            <div className="footer-social">
              <h4>Connect</h4>
              <div className="social-links">
                <a href="https://github.com/Nytso2" target="_blank" rel="noopener noreferrer" className="social-link">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/luis-coronel-8776442ab" target="_blank" rel="noopener noreferrer" className="social-link">
                  LinkedIn
                </a>
                <a href="mailto:luiscoronel2500@gmail.com" className="social-link">
                  Email
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copyright">
              <p>© {currentYear} Made by Luis Coronel</p>
            </div>

            <button className="scroll-to-top" onClick={scrollToTop}>
              ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;