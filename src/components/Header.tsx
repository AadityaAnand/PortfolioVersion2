import React from 'react';

const Header: React.FC = () => {
  return (
    <nav className="navbar-simple">
      <div className="nav-container">
        <div className="nav-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#experience" className="nav-link">Experience</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Header; 