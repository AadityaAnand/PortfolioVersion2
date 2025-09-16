import React, { useState, useEffect } from 'react';
import { ArrowDown, Download, MessageCircle, Github, Linkedin, Mail, MapPin, Calendar } from 'lucide-react';

interface HeroProps {
  onNavigate?: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Animation delay for staggered entrance
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Mouse tracking for interactive background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/AadityaAnand',
      icon: Github,
      color: 'hover:text-gray-300'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/aadityaanand29/',
      icon: Linkedin,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      url: 'mailto:aadityaanand271@gmail.com',
      icon: Mail,
      color: 'hover:text-green-400'
    }
  ];

  const handleResumeDownload = () => {
    const resumeUrl = '/AADITYA_ANAND_Resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Aaditya_Anand_Resume.pdf';
    link.click();
  };

  const handleScrollDown = () => {
    if (onNavigate) {
      onNavigate('about');
    } else {
      const aboutSection = document.getElementById('about');
      aboutSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Interactive Background */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.15), transparent 70%)`
        }}
      />
      
      {/* Background Gradient Orbs */}
      <div className="absolute top-quarter left-quarter w-72 h-72 bg-purple-500-20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-quarter right-quarter w-96 h-96 bg-blue-500-15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      {/* Main Content */}
      <div className="container relative z-10 text-center px-4">
        <div className="max-w-5xl mx-auto">
          
          {/* Greeting */}
          <div className={`transition-all duration-800 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-lg md:text-xl text-white-70 font-medium mb-2">
              Hello, I'm
            </p>
          </div>

          {/* Main Name */}
          <div className={`transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6">
              <span className="block text-gradient">Aaditya</span>
              <span className="block text-white text-shadow">Anand</span>
            </h1>
          </div>

          {/* Role */}
          <div className={`transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xl sm:text-2xl lg:text-3xl text-white-80 font-light mb-8 leading-relaxed max-w-4xl mx-auto">
              Software Engineer & Full-Stack Developer
              <span className="block mt-2 text-lg sm:text-xl text-white-60">
                Crafting elegant digital experiences through thoughtful design and clean code
              </span>
            </p>
          </div>

          {/* Location & Status */}
          <div className={`transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12 text-white-60">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Baltimore, MD</span>
              </div>
              <div className="hidden sm:block w-2 h-2 bg-white-30 rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400">Available for opportunities</span>
              </div>
              <div className="hidden sm:block w-2 h-2 bg-white-30 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>MS Computer Science</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={`transition-all duration-1000 delay-800 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={() => onNavigate?.('projects')}
                className="btn btn-primary text-base px-8 py-4 group"
              >
                <span>View My Work</span>
                <ArrowDown className="w-5 h-5 transition-transform group-hover-translate-y-1" />
              </button>
              
              <button
                onClick={() => onNavigate?.('contact')}
                className="btn bg-white-10 text-white border border-white-20 hover:bg-white-20 text-base px-8 py-4 backdrop-blur-sm"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Get in Touch</span>
              </button>
              
              <button
                onClick={handleResumeDownload}
                className="btn bg-transparent text-white-80 hover:text-white border border-white-30 hover:border-white-50 text-base px-8 py-4"
              >
                <Download className="w-5 h-5" />
                <span>Resume</span>
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className={`transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex justify-center gap-6 mb-16">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target={link.name !== 'Email' ? '_blank' : undefined}
                    rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                    className={`
                      w-12 h-12 flex items-center justify-center rounded-full
                      bg-white-10 backdrop-blur-sm border border-white-20
                      text-white-60 ${link.color} transition-all duration-300
                      hover:bg-white-20 hover:scale-110 hover:border-white-40
                      group
                    `}
                    style={{ 
                      animationDelay: `${1200 + index * 100}ms`,
                      transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                      opacity: isLoaded ? 1 : 0,
                      transition: `all 600ms ease-out ${1200 + index * 100}ms`
                    }}
                    aria-label={link.name}
                  >
                    <Icon className="w-5 h-5 transition-transform group-hover-scale-110" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className={`absolute bottom-8 left-half transform translate-x-half transition-all duration-1000 delay-1200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={handleScrollDown}
            className="group flex flex-col items-center gap-2 text-white-40 hover:text-white-80 transition-colors duration-300"
            aria-label="Scroll down"
          >
            <span className="text-sm font-medium tracking-wide">SCROLL</span>
            <div className="w-half h-8 bg-white-20 relative overflow-hidden">
              <div className="w-full h-4 bg-gradient-to-b from-transparent to-white-60 absolute animate-bounce"></div>
            </div>
            <ArrowDown className="w-4 h-4 animate-bounce group-hover-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
      </div>
      <div className="absolute top-40 right-20 opacity-20">
        <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="absolute bottom-40 left-20 opacity-20">
        <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  );
};

export default Hero;