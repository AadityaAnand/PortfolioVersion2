import React from 'react';
import { experiences } from '../data/portfolio';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">My professional journey in software engineering</p>
        </div>
        
        {/* Test content to ensure visibility */}
        <div style={{ padding: '2rem', background: 'var(--bg-card)', borderRadius: '0.5rem', marginBottom: '2rem' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Section Test - Experience</h3>
          <p style={{ color: 'var(--text-secondary)' }}>This section should be clearly visible when you scroll to it.</p>
        </div>
        
        <div className="timeline">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="timeline-title">{experience.position}</h3>
                  <span className="timeline-company">{experience.company}</span>
                  <span className="timeline-period">{experience.duration}</span>
                </div>
                <div className="timeline-description">
                  {experience.description.map((desc, descIndex) => (
                    <p key={descIndex}>{desc}</p>
                  ))}
                </div>
                <div className="timeline-tech">
                  {experience.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 