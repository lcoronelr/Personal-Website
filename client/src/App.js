import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  
  // Replace with your GitHub username
  const GITHUB_USERNAME = 'Nytso2';

  // Enhanced background shapes movement - VISIBLE WHITE SHAPES
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const shapes = document.querySelectorAll('.bg-shape');
      const heroText = document.querySelector('.hero-text');
      const meshes = document.querySelectorAll('.gradient-mesh');
      
      // Enhanced parallax for ALL FIVE geometric shapes - MORE VISIBLE
      if (shapes[0]) {
        shapes[0].style.transform = `rotate(-15deg) translateY(${scrolled * -0.4}px) translateX(${scrolled * 0.1}px) rotate(${scrolled * 0.05}deg)`;
        shapes[0].style.opacity = '0.8';
      }
      if (shapes[1]) {
        shapes[1].style.transform = `rotate(25deg) translateY(${scrolled * 0.3}px) translateX(${scrolled * -0.15}px) rotate(${scrolled * -0.08}deg)`;
        shapes[1].style.opacity = '0.7';
      }
      if (shapes[2]) {
        shapes[2].style.transform = `rotate(-10deg) translateY(${scrolled * -0.2}px) translateX(${scrolled * 0.05}px) rotate(${scrolled * 0.03}deg)`;
        shapes[2].style.opacity = '0.6';
      }
      if (shapes[3]) {
        shapes[3].style.transform = `rotate(45deg) translateY(${scrolled * 0.25}px) translateX(${scrolled * -0.1}px) rotate(${scrolled * 0.06}deg)`;
        shapes[3].style.opacity = '0.5';
      }
      if (shapes[4]) {
        shapes[4].style.transform = `rotate(-35deg) translateY(${scrolled * -0.35}px) translateX(${scrolled * 0.12}px) rotate(${scrolled * -0.04}deg)`;
        shapes[4].style.opacity = '0.6';
      }
      
      // Enhanced mesh movement
      meshes.forEach((mesh, index) => {
        const speed = 0.1 + (index * 0.05);
        const xMovement = Math.sin(scrolled * 0.001 + index) * 20;
        const yMovement = scrolled * -speed;
        mesh.style.transform = `translateY(${yMovement}px) translateX(${xMovement}px) scale(${1 + Math.sin(scrolled * 0.001) * 0.1})`;
      });
      
      // Enhanced hero text movement
      if (heroText) {
        const rate = scrolled * -0.5;
        const opacity = Math.max(1 - scrolled * 0.003, 0);
        const scale = Math.max(1 - scrolled * 0.0003, 0.7);
        
        heroText.style.transform = `translateY(${rate}px) scale(${scale})`;
        heroText.style.opacity = opacity;
      }
      
      // Enhanced progress bar with glow effect
      const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrolled / winHeight);
      const progressBar = document.querySelector('.progress-bar');
      if (progressBar) {
        progressBar.style.transform = `scaleX(${scrollPercent})`;
        progressBar.style.boxShadow = `
          0 0 ${20 + scrollPercent * 20}px rgba(0, 122, 255, ${0.5 + scrollPercent * 0.3}),
          0 0 ${40 + scrollPercent * 40}px rgba(0, 122, 255, ${0.2 + scrollPercent * 0.2})
        `;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch GitHub data - UPDATED TO CALL GITHUB API DIRECTLY
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch user info directly from GitHub
        const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await userResponse.json();

        // Fetch repositories directly from GitHub
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=50`);
        if (!reposResponse.ok) {
          throw new Error('Failed to fetch repos data');
        }
        const reposData = await reposResponse.json();
        
        // Filter and sort repos (same logic as your backend)
        const repos = reposData
          .filter(repo => !repo.fork && !repo.archived)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          .slice(0, 12)
          .map(repo => ({
            id: repo.id,
            name: repo.name,
            description: repo.description,
            html_url: repo.html_url,
            homepage: repo.homepage,
            language: repo.language,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            updated_at: repo.updated_at,
            topics: repo.topics || []
          }));

        const result = {
          user: {
            name: userData.name,
            bio: userData.bio,
            location: userData.location,
            public_repos: userData.public_repos,
            followers: userData.followers,
            following: userData.following,
            avatar_url: userData.avatar_url,
            html_url: userData.html_url
          },
          repos: repos
        };
        
        setGithubData(result);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        // Set some default data so the site still works
        setGithubData({
          user: {
            name: 'Luis Coronel',
            bio: 'Computer Science & Business Administration Student',
            location: 'Managua, Nicaragua',
            public_repos: 0,
            followers: 0,
            following: 0,
            avatar_url: '',
            html_url: `https://github.com/${GITHUB_USERNAME}`
          },
          repos: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  // Enhanced active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      {/* Enhanced Progress bar */}
      <div className="progress-bar" />
      
      {/* Navigation */}
      <Header activeSection={activeSection} />
      
      {/* ENHANCED VISIBLE WHITE GEOMETRIC SHAPES */}
      <div className="bg-decorations">
        <div className="bg-shape primary-shape"></div>
        <div className="bg-shape secondary-shape"></div>
        <div className="bg-shape tertiary-shape"></div>
        <div className="bg-shape quaternary-shape"></div>
        <div className="bg-shape quinary-shape"></div>
        
        {/* Enhanced floating particles */}
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${5 + (i * 4.5)}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + (i % 3) * 1}s`
            }} />
          ))}
        </div>
        
        {/* Enhanced gradient meshes */}
        <div className="gradient-mesh mesh-1" />
        <div className="gradient-mesh mesh-2" />
        <div className="gradient-mesh mesh-3" />
      </div>
      
      {/* Main content */}
      <main>
        <Hero />
        <About githubData={githubData} loading={loading} />
        <Projects projects={githubData?.repos || []} loading={loading} />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;