import React, { useState, useEffect } from 'react';
import './Projects.css';

const Projects = ({ projects, loading }) => {
  const [filter, setFilter] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [transitionDirection, setTransitionDirection] = useState('');

  const languages = ['all', ...new Set(projects.map(p => p.language).filter(Boolean))];
  const filteredProjects = filter === 'all' 
    ? projects.slice(0, 20)
    : projects.filter(p => p.language === filter).slice(0, 20);

  const goToNext = React.useCallback(() => {
    if (isTransitioning || filteredProjects.length <= 1) return;
    
    setIsTransitioning(true);
    setHoveredProject(null); // Clear hover state immediately
    
    // Add fade-out class to all projects
    const allSlides = document.querySelectorAll('.project-slide');
    allSlides.forEach(slide => slide.classList.add('fade-out'));
    
    // After SLOW fade-out completes, change project
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
      
      // Make new projects start invisible, then slowly fade in
      setTimeout(() => {
        const newSlides = document.querySelectorAll('.project-slide');
        newSlides.forEach(slide => {
          slide.classList.remove('fade-out');
          slide.style.opacity = '0';
          slide.style.transform = 'scale(0.9)';
          slide.style.filter = 'blur(2px)';
        });
        
        // Slowly fade them in
        setTimeout(() => {
          newSlides.forEach(slide => {
            slide.style.transition = 'all 0.8s ease-out';
            slide.style.opacity = '';
            slide.style.transform = '';
            slide.style.filter = '';
          });
        }, 50);
      }, 50);
    }, 650); // Wait longer for slow fade-out to complete
    
    // End transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1500);
  }, [isTransitioning, filteredProjects.length]);

  const goToPrev = React.useCallback(() => {
    if (isTransitioning || filteredProjects.length <= 1) return;
    
    setIsTransitioning(true);
    setHoveredProject(null); // Clear hover state immediately
    
    // Add fade-out class to all projects
    const allSlides = document.querySelectorAll('.project-slide');
    allSlides.forEach(slide => slide.classList.add('fade-out'));
    
    // After SLOW fade-out completes, change project
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
      
      // Make new projects start invisible, then slowly fade in
      setTimeout(() => {
        const newSlides = document.querySelectorAll('.project-slide');
        newSlides.forEach(slide => {
          slide.classList.remove('fade-out');
          slide.style.opacity = '0';
          slide.style.transform = 'scale(0.9)';
          slide.style.filter = 'blur(2px)';
        });
        
        // Slowly fade them in
        setTimeout(() => {
          newSlides.forEach(slide => {
            slide.style.transition = 'all 0.8s ease-out';
            slide.style.opacity = '';
            slide.style.transform = '';
            slide.style.filter = '';
          });
        }, 50);
      }, 50);
    }, 650); // Wait longer for slow fade-out to complete
    
    // End transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1500);
  }, [isTransitioning, filteredProjects.length]);

  const goToProject = React.useCallback((index) => {
    if (isTransitioning || index === currentIndex) return;
    
    setIsTransitioning(true);
    setHoveredProject(null); // Clear hover state immediately
    
    // Add fade-out class to all projects
    const allSlides = document.querySelectorAll('.project-slide');
    allSlides.forEach(slide => slide.classList.add('fade-out'));
    
    // After SLOW fade-out completes, change project
    setTimeout(() => {
      setCurrentIndex(index);
      
      // Make new projects start invisible, then slowly fade in
      setTimeout(() => {
        const newSlides = document.querySelectorAll('.project-slide');
        newSlides.forEach(slide => {
          slide.classList.remove('fade-out');
          slide.style.opacity = '0';
          slide.style.transform = 'scale(0.9)';
          slide.style.filter = 'blur(2px)';
        });
        
        // Slowly fade them in
        setTimeout(() => {
          newSlides.forEach(slide => {
            slide.style.transition = 'all 0.8s ease-out';
            slide.style.opacity = '';
            slide.style.transform = '';
            slide.style.filter = '';
          });
        }, 50);
      }, 50);
    }, 650); // Wait longer for slow fade-out to complete
    
    // End transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1500);
  }, [isTransitioning, currentIndex]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  useEffect(() => {
    if (filteredProjects.length > 1 && !hoveredProject && !isTransitioning) {
      const interval = setInterval(() => {
        goToNext();
      }, 5000); // Longer auto-advance interval
      return () => clearInterval(interval);
    }
  }, [currentIndex, filteredProjects.length, hoveredProject, goToNext, isTransitioning]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f7df1e',
      TypeScript: '#3178c6',
      Python: '#3776ab',
      React: '#61dafb',
      HTML: '#e34f26',
      CSS: '#1572b6',
      Java: '#ed8b00',
      Vue: '#4fc08d',
      Angular: '#dd0031',
      'C++': '#00599c',
      'C#': '#239120',
      Go: '#00add8',
      Rust: '#000000',
      PHP: '#777bb4'
    };
    return colors[language] || '#6b7280';
  };

  // Function to get project icon/image
  const getProjectIcon = (projectName) => {
    const name = projectName.toLowerCase();
    
    // Your specific projects with images
    if (name.includes('personal') || name.includes('portfolio') || name.includes('website')) {
      return <img src="images/website.png" alt="Personal Website" className="project-image-icon" />;
    }
    if (name.includes('interpreter') || name.includes('arduino')) {
      return <img src="images/arduino.png" alt="Arduino Interpreter" className="project-image-icon" />;
    }
    if (name.includes('packet') || name.includes('analyzer')) {
      return <img src="images/packetanalyzer.png" alt="Packet Analyzer" className="project-image-icon" />;
    }
    if (name.includes('whiteboard')) {
      return <img src="images/whiteboard.png" alt="Whiteboard" className="project-image-icon" />;
    }
    if (name.includes('keyauth') || name.includes('launcher')) {
      return <img src="images/keyauth.png" alt="KeyAuth Launcher" className="project-image-icon" />;
    }
    if (name.includes('crazyfile') || name.includes('opencv')) {
      return <img src="images/crazyflie.png" alt="CrazyFile OpenCV" className="project-image-icon" />;
    }
    if (name.includes('simulation')) {
      return <img src="images/crazyflie.png" alt="Simulation" className="project-image-icon" />;
    }
    if (name.includes('nemo')) {
      return <img src="images/nemp.png" alt="Nemo" className="project-image-icon" />;
    }
    if (name.includes('kernel') || name.includes('spy')) {
      return <img src="images/kernelspy.png" alt="Kernel Spy" className="project-image-icon" />;
    }
    if (name.includes('eduroam')) {
      return <img src="images/eduroam.png" alt="Eduroam" className="project-image-icon" />;
    }
    if (name.includes('phreeqc') || name.includes('inverse')){
      return <img src = "images/phreeqc.png" alt="Phreeqc" className='project-image-icon' />;
    }
    
    // Fallback to language-based emojis for other projects
    if (projectName.includes('JavaScript') || projectName.includes('JS')) return '🟨';
    if (projectName.includes('TypeScript') || projectName.includes('TS')) return '🔷';
    if (projectName.includes('Python') || projectName.includes('py')) return '🐍';
    if (projectName.includes('React')) return '⚛️';
    if (projectName.includes('HTML')) return '🌐';
    if (projectName.includes('CSS')) return '🎨';
    if (projectName.includes('Java')) return '☕';
    if (projectName.includes('Vue')) return '💚';
    if (projectName.includes('C++')) return '⚡';
    if (projectName.includes('C')) return '🔧';
    
    // Default fallback
    return '📁';
  };

  // Get ONLY 3 visible projects (prev, current, next) - No mirrors
  const getVisibleProjects = () => {
    if (filteredProjects.length === 0) return [];
    if (filteredProjects.length === 1) return [{ ...filteredProjects[0], position: 'current' }];
    
    const positions = [];
    const totalProjects = filteredProjects.length;
    
    // Simple 3-project layout
    const prevIndex = (currentIndex - 1 + totalProjects) % totalProjects;
    const nextIndex = (currentIndex + 1) % totalProjects;
    
    if (totalProjects >= 3) {
      positions.push(
        { ...filteredProjects[prevIndex], position: 'prev', key: `${prevIndex}-prev` },
        { ...filteredProjects[currentIndex], position: 'current', key: `${currentIndex}-current` },
        { ...filteredProjects[nextIndex], position: 'next', key: `${nextIndex}-next` }
      );
    } else if (totalProjects === 2) {
      positions.push(
        { ...filteredProjects[prevIndex], position: 'prev', key: `${prevIndex}-prev` },
        { ...filteredProjects[currentIndex], position: 'current', key: `${currentIndex}-current` }
      );
    } else {
      positions.push(
        { ...filteredProjects[currentIndex], position: 'current', key: `${currentIndex}-current` }
      );
    }
    
    return positions;
  };

  const visibleProjects = getVisibleProjects();

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <h2><span className="text-gradient">Projects</span></h2>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading projects...</p>
          </div>
        ) : (
          <>
            {/* Simple Filter Tabs */}
            <div className="filter-tabs">
              {languages.map((lang) => (
                <button
                  key={lang}
                  className={`filter-tab ${filter === lang ? 'active' : ''}`}
                  onClick={() => setFilter(lang)}
                >
                  {lang === 'all' ? 'All' : lang}
                </button>
              ))}
            </div>

            {/* Netflix-Style Smooth Carousel */}
            <div className="carousel-container">
              <div className="carousel-track">

                {/* Simple Clean Projects Display */}
                <div className={`projects-display ${isTransitioning ? 'transitioning' : ''}`}>
                  <div className="projects-carousel">
                    {visibleProjects.map((project) => (
                      <div
                        key={project.key}
                        className={`project-slide ${project.position}`}
                        onMouseEnter={() => {
                          // Allow hover immediately on current project, but prevent on transitioning side projects
                          if (project.position === 'current' || !isTransitioning) {
                            setHoveredProject(project.id);
                          }
                        }}
                        onMouseLeave={() => setHoveredProject(null)}
                        onClick={() => {
                          if (isTransitioning) return; // Prevent clicks during transition
                          if (project.position === 'prev') {
                            goToPrev();
                          } else if (project.position === 'next') {
                            goToNext();
                          } else if (project.position === 'current') {
                            // Current project click - maybe open in new tab or show more details
                            if (project.html_url) {
                              window.open(project.html_url, '_blank');
                            }
                          }
                        }}
                      >
                        {/* Enhanced Project Image Area */}
                        <div className="project-image">
                          <div className="image-placeholder">
                            <div className="placeholder-content">
                              <div className="project-icon">
                                {getProjectIcon(project.name)}
                              </div>
                              <span className="project-name">{project.name}</span>
                            </div>
                          </div>
                          
                          {/* Enhanced hover overlay for center project - Always available */}
                          {project.position === 'current' && (
                            <div className={`project-overlay ${hoveredProject === project.id ? 'visible' : ''}`}>
                              <div className="overlay-content">
                                <h3>{project.name}</h3>
                                <p>{project.description || 'A modern web application built with cutting-edge technologies.'}</p>
                                
                                <div className="project-meta">
                                  <span 
                                    className="lang-tag"
                                    style={{ backgroundColor: getLanguageColor(project.language) }}
                                  >
                                    {project.language || 'Code'}
                                  </span>
                                  <div className="project-stats">
                                    <span>⭐ {project.stargazers_count}</span>
                                    <span>🔀 {project.forks_count}</span>
                                    <span>📅 {formatDate(project.updated_at)}</span>
                                  </div>
                                </div>

                                {project.topics && project.topics.length > 0 && (
                                  <div className="topics">
                                    {project.topics.slice(0, 4).map((topic) => (
                                      <span key={topic} className="topic">{topic}</span>
                                    ))}
                                  </div>
                                )}

                                <div className="project-actions">
                                  <a 
                                    href={project.html_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                  >
                                    View Code
                                  </a>
                                  {project.homepage && (
                                    <a 
                                      href={project.homepage} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="btn-secondary"
                                    >
                                      Live Demo
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Dots Navigation */}
              <div className="dots-nav">
                {filteredProjects.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => goToProject(index)}
                    disabled={isTransitioning}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {filteredProjects.length === 0 && (
              <div className="empty-state">
                <p>No projects found for "{filter}"</p>
                <button 
                  className="btn-reset"
                  onClick={() => setFilter('all')}
                >
                  Show All
                </button>
              </div>
            )}

            {/* GitHub Link */}
            <div className="github-link">
              <a 
                href="https://github.com/Nytso2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-github"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                View More on GitHub
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;