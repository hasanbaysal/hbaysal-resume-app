import { useState, useEffect } from 'react';
import data from './data/portfolio_data.json';

function App() {
  const { personal, skills, workHistory, education, certifications, languages, projects } = data;
  const [activeSection, setActiveSection] = useState('hero');
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  // Auto-spy scroll section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['experience', 'projects', 'skills', 'education'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            return;
          }
        }
      }
      setActiveSection('hero');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextProject = () => {
    setActiveProjectIdx((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveProjectIdx((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <>
      <div className="glow-bg"></div>
      <div className="glow-bg-bottom"></div>

      <div className="app-container">
        {/* Navigation */}
        <nav className="navbar">
          <a href="#" className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {personal.name.split(' ')[0]}<span>.{personal.name.split(' ')[1]}</span>
          </a>
          <div className="nav-links">
            <a
              href="#experience"
              className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}
            >
              Experience
            </a>
            <a
              href="#projects"
              className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
            >
              Projects
            </a>
            <a
              href="#skills"
              className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
            >
              Skills
            </a>
            <a
              href="#education"
              className={`nav-link ${activeSection === 'education' ? 'active' : ''}`}
            >
              About
            </a>
            {personal.blog?.enabled && (
              <a
                href={personal.blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link btn-blog"
                style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem' }}
              >
                Blog
              </a>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <header className="hero-section">
          <div className="hero-badge">Available for full-time opportunities</div>
          <h1 className="hero-title">
            Hi, I'm <span>{personal.name}</span>.<br />
            I build robust backend systems.
          </h1>
          <p className="hero-bio">{personal.bio}</p>
          <div className="hero-actions">
            <a href={`mailto:${personal.email}`} className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Me
            </a>
            <a href={personal.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </a>
            {personal.blog?.enabled && (
              <a href={personal.blog.url} target="_blank" rel="noopener noreferrer" className="btn btn-blog">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 4h-2m2 0a2 2 0 100-4h-2M13 18h.01M9 18h.01M9 14h.01M13 14h.01" />
                </svg>
                Read Blog
              </a>
            )}
          </div>
        </header>

        {/* Experience Section */}
        <section id="experience" className="section">
          <div className="section-header">
            <span className="section-subtitle">Journey</span>
            <h2 className="section-title">Work Experience</h2>
          </div>
          <div className="timeline">
            {workHistory.map((work, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-role">
                        {work.role}
                        <span className="timeline-type">{work.type}</span>
                      </h3>
                      <span className="timeline-company">{work.company}</span>
                    </div>
                    <span className="timeline-period">{work.period}</span>
                  </div>
                  <ul className="timeline-bullets">
                    {work.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section (3D Carousel Style) */}
        <section id="projects" className="section">
          <div className="section-header">
            <span className="section-subtitle">Portfolio</span>
            <h2 className="section-title">Featured Projects</h2>
          </div>

          <div className="carousel-wrapper">
            <div className="carousel-click-overlay prev-overlay" onClick={prevProject}></div>
            <div className="carousel-click-overlay next-overlay" onClick={nextProject}></div>
            <div className="carousel-container">
              {projects.map((project, idx) => {
                // Determine 3D stack position class
                let positionClass = 'hidden';
                if (idx === activeProjectIdx) {
                  positionClass = 'active';
                } else if (idx === (activeProjectIdx - 1 + projects.length) % projects.length) {
                  positionClass = 'prev';
                } else if (idx === (activeProjectIdx + 1) % projects.length) {
                  positionClass = 'next';
                }

                return (
                  <div
                    key={idx}
                    className={`carousel-card ${positionClass}`}
                    onClick={() => {
                      if (positionClass === 'prev' || positionClass === 'next') {
                        setActiveProjectIdx(idx);
                      }
                    }}
                  >
                    {/* Optional Project Image */}
                    <div className="project-image-box">
                      {project.imageUrl ? (
                        <img src={project.imageUrl} alt={project.title} />
                      ) : (
                        <div className="project-icon-placeholder">
                          <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="project-header" style={{ marginTop: '4px' }}>
                      <h3 className="project-title">{project.title}</h3>
                      <div className="project-links">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link-icon" title="View Source">
                          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
                          </svg>
                        </a>
                        {project.demoUrl && (
                          <a
                            href={project.demoStatus === 'online' ? project.demoUrl : undefined}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`project-link-icon ${project.demoStatus !== 'online' ? 'btn-demo-offline' : ''}`}
                            title={project.demoStatus === 'online' ? "View Demo" : "Demo Offline"}
                            style={{ cursor: project.demoStatus === 'online' ? 'pointer' : 'not-allowed' }}
                          >
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="project-desc">{project.description}</p>

                    {/* Demo Online/Offline Status Indicator */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="project-tech" style={{ flexGrow: 1 }}>
                        {project.techStack.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="tech-tag">{tech}</span>
                        ))}
                      </div>

                      {project.demoUrl && (
                        <div className={`status-badge ${project.demoStatus === 'online' ? 'status-online' : 'status-offline'}`}>
                          <span className="dot"></span>
                          {project.demoStatus === 'online' ? 'Online' : 'Offline'}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile-only Navigation Controls */}
            <div className="carousel-controls mobile-controls">
              <button className="carousel-btn" onClick={prevProject} aria-label="Previous Project">
                ←
              </button>
              <button className="carousel-btn" onClick={nextProject} aria-label="Next Project">
                →
              </button>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section">
          <div className="section-header">
            <span className="section-subtitle">Expertise</span>
            <h2 className="section-title">My Tech Stack</h2>
          </div>
          <div className="skills-container">
            <div className="skills-category">
              <h3>Languages & Frameworks</h3>
              <div className="skill-list">
                {skills.languagesFrameworks.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="skills-category">
              <h3>Architecture</h3>
              <div className="skill-list">
                {skills.architecture.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="skills-category">
              <h3>Data & GIS</h3>
              <div className="skill-list">
                {skills.dataGis.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="skills-category">
              <h3>DevOps & Tools</h3>
              <div className="skill-list">
                {skills.devopsTools.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About & Info Section */}
        <section id="education" className="section">
          <div className="section-header">
            <span className="section-subtitle">Background</span>
            <h2 className="section-title">Education & Credentials</h2>
          </div>
          <div className="info-grid">
            <div className="info-card">
              <h3 className="timeline-role" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Education</h3>
              {education.map((edu, i) => (
                <div key={i} className="info-item">
                  <span className="info-item-title">{edu.degree}</span>
                  <span className="info-item-subtitle">{edu.school} — {edu.location}</span>
                  <span className="info-item-meta">{edu.period}</span>
                </div>
              ))}
            </div>

            <div className="info-card">
              <h3 className="timeline-role" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Certifications & Languages</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '0.95rem' }}>Certifications</h4>
                  {certifications.map((cert, i) => (
                    <div key={i} className="info-item">
                      <span className="info-item-title">{cert.name}</span>
                      <span className="info-item-subtitle">
                        <span>{cert.issuer} — {cert.year}</span>
                        {cert.verificationUrl && (
                          <a
                            href={cert.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cert-verify-link"
                          >
                            Verify
                            <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '0.95rem' }}>Languages</h4>
                  {languages.map((lang, i) => (
                    <div key={i} className="info-item">
                      <span className="info-item-title">{lang.name}</span>
                      <span className="info-item-subtitle">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p className="footer-text">
            © {new Date().getFullYear()} {personal.name}
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href={personal.github} target="_blank" rel="noopener noreferrer" className="nav-link">GitHub</a>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="nav-link">LinkedIn</a>
            {personal.blog?.enabled && (
              <a href={personal.blog.url} target="_blank" rel="noopener noreferrer" className="nav-link">Blog</a>
            )}
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
