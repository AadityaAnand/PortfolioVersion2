import React from 'react';
import { skills } from '../data/portfolio';

const Skills: React.FC = () => {
  // Group skills by category
  const skillCategories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">Technologies and tools I use to build solutions</p>
        </div>
        
        {/* Test content to ensure visibility */}
        <div style={{ padding: '2rem', background: 'var(--bg-card)', borderRadius: '0.5rem', marginBottom: '2rem' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Section Test - Skills</h3>
          <p style={{ color: 'var(--text-secondary)' }}>This section should be clearly visible when you scroll to it.</p>
        </div>
        
        <div className="skills-grid">
          {Object.entries(skillCategories).map(([category, categorySkills], index) => (
            <div key={category} className="skill-category">
              <h3 className="skill-category-title">{category}</h3>
              <div className="skills-list">
                {categorySkills.map((skill, skillIndex) => (
                  <div key={skill.name} className="skill-item">
                    <img 
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon.split('-').slice(1).join('/')}.svg`}
                      alt={skill.name}
                      className="skill-icon"
                    />
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 