import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Github, Linkedin, Mail, Home, User, Briefcase, FolderOpen, MessageCircle } from 'lucide-react';

interface NavigationProps {
  activeSection?: string;
  onSectionClick?: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  activeSection = 'home', 
  onSectionClick 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'contact', label: 'Contact', icon: MessageCircle },
  ];

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

  // Handle scroll effects
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Add background blur when scrolled
          setIsScrolled(currentScrollY > 50);
          
          // Hide/show navigation based on scroll direction
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
          
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleSectionClick = (sectionId: string) => {
    if (onSectionClick) {
      onSectionClick(sectionId);
    }
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    
    setIsMobileMenuOpen(false);
  };

  const handleResumeDownload = () => {
    // Replace with your actual resume URL in the public folder
    const resumeUrl = '/AADITYA_ANAND_Resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Aaditya_Anand_Resume.pdf';
    link.click();
  };

  return (
    <>
      <nav 
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
          ${isScrolled 
            ? 'nav nav-scrolled' 
            : 'nav'
          }
        `}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => handleSectionClick('home')}
                className="group relative"
                aria-label="Go to home"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center font-bold text-white text-lg transition-transform duration-200 group-hover:scale-110">
                      AA
                    </div>
                    <div className="absolute -inset-1 bg-gradient-primary rounded-lg blur opacity-30 group-hover:opacity-60 transition-opacity duration-200"></div>
                  </div>
                  <span className="hidden sm:block text-white font-semibold text-lg text-shadow">
                    Aaditya Anand
                  </span>
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSectionClick(item.id)}
                    className={`
                      relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      flex items-center gap-2 group
                      ${isActive 
                        ? 'text-white bg-white/10 border border-white/20' 
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    <Icon size={16} className="transition-transform duration-200 group-hover:scale-110" />
                    <span>{item.label}</span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-primary rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Desktop CTA & Social Links */}
            <div className="hidden md:flex items-center gap-4">
              
              {/* Social Links */}
              <div className="flex items-center gap-2">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target={link.name !== 'Email' ? '_blank' : undefined}
                      rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                      className={`
                        w-9 h-9 flex items-center justify-center rounded-lg
                        text-white/60 ${link.color} transition-all duration-200
                        hover:bg-white/10 hover:scale-110
                      `}
                      aria-label={link.name}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>

              {/* Resume Download Button */}
              <button
                onClick={handleResumeDownload}
                className="btn btn-primary"
                aria-label="Download Resume"
              >
                <Download size={16} />
                <span className="hidden lg:inline ml-2">Resume</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          
          <div className="fixed top-0 right-0 h-full w-80 max-w-sm bg-white/10 backdrop-blur-xl border-l border-white/20">
            <div className="flex flex-col h-full">
              
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center font-bold text-white text-sm">
                    AA
                  </div>
                  <span className="text-white font-semibold">Aaditya Anand</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-200"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Navigation Items */}
              <div className="flex-1 py-6">
                <nav className="px-6 gap-2 flex flex-col">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSectionClick(item.id)}
                        className={`
                          w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left
                          transition-all duration-200 group
                          ${isActive 
                            ? 'bg-gradient-primary text-white shadow-lg' 
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                          }
                        `}
                      >
                        <Icon 
                          size={20} 
                          className={`transition-transform duration-200 group-hover:scale-110 ${
                            isActive ? 'text-white' : 'text-white/60'
                          }`} 
                        />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Mobile Menu Footer */}
              <div className="p-6 border-t border-white/10 flex flex-col gap-4">
                
                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target={link.name !== 'Email' ? '_blank' : undefined}
                        rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                        className={`
                          w-12 h-12 flex items-center justify-center rounded-xl
                          bg-white/10 text-white/60 ${link.color} 
                          transition-all duration-200 hover:scale-110 hover:bg-white/20
                        `}
                        aria-label={link.name}
                      >
                        <Icon size={20} />
                      </a>
                    );
                  })}
                </div>

                {/* Resume Download Button */}
                <button
                  onClick={handleResumeDownload}
                  className="w-full btn btn-primary"
                >
                  <Download size={18} />
                  <span className="ml-2">Download Resume</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;