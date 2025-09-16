import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll-based section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation 
        activeSection={activeSection}
        onSectionClick={handleNavigate}
      />
      
      {/* Hero Section with new component */}
      <Hero onNavigate={handleNavigate} />

      {/* Temporary sections for testing navigation */}
      <section id="about" className="min-h-screen flex items-center justify-center bg-white/5">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-gradient mb-6">About</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Passionate about creating elegant solutions through clean code and thoughtful design.
          </p>
        </div>
      </section>

      <section id="experience" className="min-h-screen flex items-center justify-center">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-gradient mb-6">Experience</h2>
          <p className="text-lg text-white/80">Professional journey and key achievements.</p>
        </div>
      </section>

      <section id="projects" className="min-h-screen flex items-center justify-center bg-white/5">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-gradient mb-6">Projects</h2>
          <p className="text-lg text-white/80">Featured work and technical showcase.</p>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-gradient mb-6">Contact</h2>
          <p className="text-lg text-white/80">Let's connect and build something amazing.</p>
        </div>
      </section>
    </div>
  );
}

export default App;