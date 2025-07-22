import React, { useEffect, useRef } from 'react';

const About = ({ githubData, loading }) => {
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const skillProgressBars = document.querySelectorAll('.skill-progress');

    const animateSkillBars = () => {
      skillProgressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width && bar.closest('.skill-item') && bar.closest('.skill-item').classList.contains('animate-in')) {
          bar.style.setProperty('--target-width', width + '%');
          setTimeout(() => {
            bar.style.width = width + '%';
          }, 500);
        }
      });
    };

    const animateCounters = () => {
      document.querySelectorAll('.stat').forEach(stat => {
        if (stat.classList.contains('animate-in')) {
          const numberElement = stat.querySelector('.stat-number');
          const targetNumber = parseInt(stat.getAttribute('data-number')) || 0;

          if (numberElement && !numberElement.dataset.animated) {
            numberElement.dataset.animated = 'true';
            let currentNumber = 0;
            const increment = targetNumber / 60;

            const counter = () => {
              currentNumber += increment;
              if (currentNumber < targetNumber && numberElement) {
                numberElement.textContent = Math.floor(currentNumber);
                requestAnimationFrame(counter);
              } else if (numberElement) {
                numberElement.textContent = targetNumber;
              }
            };

            setTimeout(counter, 300);
          }
        }
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          animateSkillBars();
          animateCounters();
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-item, .stat').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [githubData]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const elementsToObserve = [
      aboutRef.current,
      skillsRef.current,
      statsRef.current,
      ...document.querySelectorAll('.skill-item'),
      ...document.querySelectorAll('.stat')
    ].filter(Boolean);

    elementsToObserve.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: 'Python', level: 95, iconClass: 'devicon-python-plain' },
    { name: 'C', level: 90, iconClass: 'devicon-c-plain' },
    { name: 'React', level: 80, iconClass: 'devicon-react-original' },
    { name: 'JavaScript', level: 80, iconClass: 'devicon-javascript-plain' },
    { name: 'C++', level: 80, iconClass: 'devicon-cplusplus-plain' },
    { name: 'CSS', level: 80, iconClass: 'devicon-css3-plain' },
    { name: 'R', level: 70, iconClass: 'devicon-rstudio-plain' }, 
    { name: 'Swift', level: 70, iconClass: 'devicon-swift-plain' },
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header fade-in-up">
          <h2>About <span className="text-gradient">Me</span></h2>
        </div>

        <div className="about-grid">
          <div className="about-text" ref={aboutRef}>
            <div className="about-intro">
              <h3 className="gradient-text">Hey! I'm Luis Coronel</h3>
              <div className="intro-decoration"></div>
            </div>

            <div className="about-content">
              <p className="highlight-paragraph">
                I'm a Computer Science and Business Administration student at Washington and Lee, focused on building useful, efficient tools. From web apps to terminal based programs. 
                I work across the stack, and I care about writing clean code, building intuitive interfaces, and solving problems in smart, practical ways.
              </p>
              <p>
                Over the past few years, I've worked on everything from terminal based tools and low level networking programs to full-stack web projects. I enjoy learning how systems work under the hood just as much as designing something clean and minimal on the front end.
              </p>
              <p> 
                When I'm not coding, I'm usually experimenting with new ideas, playing soccer, gaming, listening to music, streaming, goint out with friends, etc.....
              </p>
            </div>

            {!loading && githubData && (
              <div className="github-stats" ref={statsRef}>
                <div className="stat" data-number={githubData.user.public_repos || 0}>
                  <div className="stat-icon">📁</div>
                  <span className="stat-number">0</span>
                  <span className="stat-label">Public Repos</span>
                </div>
                <div className="stat" data-number={githubData.user.followers || 0}>
                  <div className="stat-icon">👥</div>
                  <span className="stat-number">0</span>
                  <span className="stat-label">Followers</span>
                </div>
                <div className="stat" data-number={githubData.repos ? githubData.repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0) : 0}>
                  <div className="stat-icon">⭐</div>
                  <span className="stat-number">0</span>
                  <span className="stat-label">Total Stars</span>
                </div>
              </div>
            )}
            <div className="more-skills-section">
              <h3>More Tools & Platforms</h3>
              <div className="skills-icons-container">
                <div className="skills-icons-wrapper">
                  <img
                    src="https://skillicons.dev/icons?i=github,aws,linux,docker,vim,vscode&perline=6"
                    alt="Development Tools: GitHub, AWS, Linux, Docker, Vim, VS Code"
                    className="skills-icons-row"
                  />
                  <img
                    src="https://skillicons.dev/icons?i=ps,pr,ae,au,blender,autocad&perline=6"
                    alt="Design Tools: Photoshop, Premiere Pro, After Effects, Audition, Blender, AutoCAD"
                    className="skills-icons-row"
                  />
                  <img
                    src="https://skillicons.dev/icons?i=swift,java,arduino,unreal,discord,arch&perline=6"
                    alt="Additional Skills: Swift, Java, Arduino, Unreal Engine, Discord, Arch Linux"
                    className="skills-icons-row"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="skills-section" ref={skillsRef}>
            <h3>Skills & Technologies</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={skill.name} className="skill-item" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="skill-header">
                    <div className="skill-info">
                      <span className="skill-icon">
                        <i className={`${skill.iconClass} colored`}></i>
                      </span>
                      <span className="skill-name">{skill.name}</span>
                    </div>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width={skill.level} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="about-graphics">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
        <div className="code-lines">
          <div className="code-line line-1"></div>
          <div className="code-line line-2"></div>
          <div className="code-line line-3"></div>
        </div>
      </div>
    </section>
  );
};

export default About;
