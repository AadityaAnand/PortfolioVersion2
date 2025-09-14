import React from 'react';
import { personalInfo } from '../data/portfolio';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">Let's discuss your next project or just say hello</p>
        </div>
        
        {/* Test content to ensure visibility */}
        <div style={{ padding: '2rem', background: 'var(--bg-card)', borderRadius: '0.5rem', marginBottom: '2rem' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Section Test - Contact</h3>
          <p style={{ color: 'var(--text-secondary)' }}>This section should be clearly visible when you scroll to it.</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div className="contact-details">
                <h3>Email</h3>
                <a href={`mailto:${personalInfo.email}`} className="contact-link">
                  {personalInfo.email}
                </a>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">💼</div>
              <div className="contact-details">
                <h3>Resume</h3>
                <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer" className="contact-link">
                  Download CV
                </a>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">🔗</div>
              <div className="contact-details">
                <h3>LinkedIn</h3>
                <a href="https://linkedin.com/in/aadityaanand" target="_blank" rel="noopener noreferrer" className="contact-link">
                  Connect with me
                </a>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">🐙</div>
              <div className="contact-details">
                <h3>GitHub</h3>
                <a href="https://github.com/AadityaAnand" target="_blank" rel="noopener noreferrer" className="contact-link">
                  View my work
                </a>
              </div>
            </div>
          </div>
          
          <div className="contact-message">
            <p>
              I'm always open to discussing new opportunities, interesting projects, 
              or just having a conversation about technology and innovation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 