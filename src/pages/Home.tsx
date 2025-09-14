import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-image-container">
            <div className="profile-image-wrapper">
              <img 
                src="/profile-photo.jpg" 
                alt="Aaditya Anand - Software Engineer"
                className="profile-image"
                onError={(e) => {
                  // Fallback to a placeholder if image doesn't exist
                  e.currentTarget.src = 'https://via.placeholder.com/400x400/6366f1/ffffff?text=AA';
                }}
              />
              <div className="profile-image-glow"></div>
            </div>
          </div>
          
          <div className="hero-text-content">
            <h1 className="hero-title">
              <span className="wave-emoji" role="img" aria-label="wave">👋</span> 
              Hey! I'm <span className="text-gradient">Aaditya Anand</span>
            </h1>
            
            <h2 className="hero-subtitle">I build scalable systems that matter</h2>
            
            <p className="hero-subheading">Currently engineering at Wells Fargo, automating financial workflows</p>
            
            <p className="hero-description">
              I specialize in designing resilient backend services, optimizing performance, and automating workflows end‑to‑end. 
              I love turning complex problems into reliable, scalable systems.
            </p>
            
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                View Projects
              </a>
              <a href="#contact" className="btn btn-secondary">
                Contact Me
              </a>
              <a href="/AADITYA ANAND_Res.pdf" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 