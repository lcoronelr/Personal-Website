import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [typewriterText, setTypewriterText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const texts = ['Web Developer', 'CS & Business Undergrad', 'UI/UX Enthusiast', 'Problem Solver','Quick Learner'];
    
    const typeSpeed = isDeleting ? 50 : 100;
    const currentFullText = texts[textIndex];
    
    if (!isDeleting && typewriterText === currentFullText) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }
    
    if (isDeleting && typewriterText === '') {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
      return;
    }
    
    const timeout = setTimeout(() => {
      setTypewriterText(prev => 
        isDeleting 
          ? prev.slice(0, -1)
          : currentFullText.slice(0, prev.length + 1)
      );
    }, typeSpeed);
    
    return () => clearTimeout(timeout);
  }, [typewriterText, isDeleting, textIndex]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToGetInTouch = () => {
    document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})
  }

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="text-gradient">Luis Coronel</span>
            </h1>

            <div className="hero-subtitle">
              {typewriterText}<span className="cursor">|</span>
            </div>

            <p className="hero-description">
              I'm a Computer Science and Business Administration student at Washington and Lee University, focused on building clean, efficient tools and experiences that help others.
               Whether it's low-level code or intuitive design, I care about doing things right and making them useful.
            </p>

            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={scrollToProjects}>
                <span>View My Work</span>
              </button>
              
      <a href="/images/resume.pdf" className="btn btn-glass" download>
        <span>Resume</span>
      </a>
            </div>

            <div className="hero-social">
              <a href="https://github.com/Nytso2" target="_blank" rel="noopener noreferrer" className="social-link">
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/luis-coronel-8776442ab/" target="_blank" rel="noopener noreferrer" className="social-link">
                <span>LinkedIn</span>
              </a>
              <button className="social-link" onClick={scrollToGetInTouch}>
                <a target="_blank" rel="noopener noreferrer" className="social-link">
                <span>Email</span>
                </a>
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-avatar">
              <div className="avatar-ring ring-1"></div>
              <div className="avatar-ring ring-2"></div>
              <div className="avatar-ring ring-3"></div>
              
              <div className="avatar-image">
                <img 
                  src="/images/greyscalenytso.jpeg" 
                  alt="Luis Coronel" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
