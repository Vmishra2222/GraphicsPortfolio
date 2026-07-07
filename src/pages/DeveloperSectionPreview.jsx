import { useState } from 'react';
import BlindsReveal from '../components/BlindsReveal';
import { Cpu, Layers, Award, BookOpen, Terminal, Code, Settings } from 'lucide-react';

const DeveloperSectionPreview = () => {
  const [selectedLayout, setSelectedLayout] = useState('columns'); // default to columns for review

  // 1. Render Option A: Split Grid Dashboard
  const renderDashboardLayout = () => {
    return (
      <div className="dev-core-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '2.5rem', width: '100%' }}>
        {/* Left Panel: Academic & Internship Timeline */}
        <div className="dev-academic-card glass" style={{ padding: '2.5rem', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
          <div className="dev-card-header" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <Cpu size={22} style={{ color: 'var(--accent-color)' }} />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>Academic & Professional Foundation</h3>
          </div>
          <div className="dev-timeline" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', paddingLeft: '1.5rem', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '3px', top: '6px', bottom: '6px', width: '2px', background: 'var(--card-border)' }}></div>
            
            <div className="dev-timeline-item" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-24px', top: '6px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)' }}></div>
              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', margin: '0 0 0.15rem' }}>B.Tech in Computer Science & Engineering</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: '600', display: 'block', marginBottom: '0.35rem' }}>Uttaranchal University | 2023 - 2027</span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>Focusing on C/C++, JavaScript, Python, Data Structures, and Software Engineering. (CGPA: 7.0 / 10)</p>
              </div>
            </div>

            <div className="dev-timeline-item" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-24px', top: '6px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)' }}></div>
              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', margin: '0 0 0.15rem' }}>B.S. in Data Science & Applications</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: '600', display: 'block', marginBottom: '0.35rem' }}>IIT Madras | 2025 - 2028</span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>Correspondence degree program covering statistics, database queries, and machine learning models. (CGPA: 6.8 / 10)</p>
              </div>
            </div>

            <div className="dev-timeline-item" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-24px', top: '6px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)' }}></div>
              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', margin: '0 0 0.15rem' }}>Operations & Maintenance Intern</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: '600', display: 'block', marginBottom: '0.35rem' }}>Tenughat Thermal Power Project | Jun 2024</span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>Explored control systems, low-level logic gate sensors, and enterprise resource database structures (SAP ERP).</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Technical Skills Breakdown */}
        <div className="dev-skills-card glass" style={{ padding: '2.5rem', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'var(--card-bg)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="dev-card-header" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
            <Layers size={22} style={{ color: 'var(--accent-color)' }} />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>Engineering Tech Stack</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
            A breakdown of programming languages, libraries, and frameworks utilized across academic projects:
          </p>
          <div className="dev-stack-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { label: 'C / C++ & DSA', percent: '85%' },
              { label: 'JavaScript & ReactJS / Native', percent: '82%' },
              { label: 'Python & Data Science / ML', percent: '75%' },
              { label: 'Node.JS & Backend Systems', percent: '70%' },
              { label: 'Cybersecurity Principles', percent: '70%' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: '600' }}>
                  <span>{item.label}</span>
                  <span style={{ color: 'var(--accent-color)' }}>{item.percent}</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: item.percent, height: '100%', background: 'var(--accent-color)', borderRadius: '99px' }}></div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Award size={18} style={{ color: 'var(--accent-color)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Certifications: NPTEL Cybersecurity (70%) & Let's Upgrade Node.JS Bootcamp.
            </span>
          </div>
        </div>
      </div>
    );
  };

  // 2. Render Option B: Minimalist Clean Columns (3-Column Layout)
  const renderColumnsLayout = () => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', width: '100%' }}>
        {/* Col 1: Education */}
        <div className="glass" style={{ padding: '2.25rem', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', color: 'var(--accent-color)' }}>
            <BookOpen size={20} />
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>Education</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--accent-color)', fontWeight: '700', fontFamily: 'monospace' }}>B.TECH CSE (2023-2027)</span>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: '0.15rem 0' }}>Uttaranchal University</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>Core CS fundamentals, OOPs, DSA, C++, and Web App Development. (CGPA: 7.0/10)</p>
            </div>
            <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '1.25rem' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--accent-color)', fontWeight: '700', fontFamily: 'monospace' }}>B.S. DATA SCIENCE (2025-2028)</span>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: '0.15rem 0' }}>IIT Madras (Correspondence)</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>Data structures, statistics, programming, database queries, and ML models. (CGPA: 6.8/10)</p>
            </div>
          </div>
        </div>

        {/* Col 2: Tech Stack Badges */}
        <div className="glass" style={{ padding: '2.25rem', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', color: 'var(--accent-color)' }}>
            <Code size={20} />
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>Tech Stack</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Languages</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['C', 'C++', 'Python', 'SQL', 'HTML/CSS', 'JavaScript'].map((lang, idx) => (
                  <span key={idx} style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem', borderRadius: '99px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)' }}>{lang}</span>
                ))}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Frontend & Systems</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['ReactJS', 'React Native', 'Figma Prototyping', 'UI/UX'].map((fw, idx) => (
                  <span key={idx} style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem', borderRadius: '99px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)' }}>{fw}</span>
                ))}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Backend & Frameworks</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Node.js REST APIs', 'SAP ERP Telemetry', 'ML Classifiers'].map((be, idx) => (
                  <span key={idx} style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem', borderRadius: '99px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)' }}>{be}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Col 3: Practical Internships & Certifications */}
        <div className="glass" style={{ padding: '2.25rem', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', color: 'var(--accent-color)' }}>
            <Award size={20} />
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>Credentials & Experience</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <span style={{ fontSize: '0.65rem', background: 'rgba(20, 184, 166, 0.1)', color: 'var(--accent-color)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '700' }}>INTERNSHIP</span>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: '0.35rem 0 0.15rem' }}>Tenughat Thermal Power Station</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                Worked in C&I. Mapped digital logic gates, plant sensors, and analyzed SAP database tables.
              </p>
            </div>
            
            <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '1rem' }}>
              <span style={{ fontSize: '0.65rem', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-secondary)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '700' }}>CERTIFICATION</span>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: '0.35rem 0 0.15rem' }}>NPTEL Cybersecurity</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                Completed concepts in cyber defense, secure networks, and cryptography. (Score: 70/100)
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '1rem' }}>
              <span style={{ fontSize: '0.65rem', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-secondary)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '700' }}>SEMINAR</span>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: '0.35rem 0 0.15rem' }}>Node.JS Let's Upgrade Bootcamp</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>
                Completed server setups, asynchronous queries, and REST APIs.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 3. Render Option C: Terminal Simulator Console
  const renderTerminalLayout = () => {
    return (
      <div style={{
        width: '100%',
        maxWidth: '850px',
        margin: '0 auto',
        background: '#040711',
        borderRadius: '12px',
        border: '1px solid rgba(0, 240, 255, 0.25)',
        boxShadow: '0 20px 50px rgba(0, 240, 255, 0.05)',
        overflow: 'hidden',
        fontFamily: 'monospace',
        textAlign: 'left'
      }}>
        {/* Terminal Header Bar */}
        <div style={{
          background: '#0b1021',
          padding: '0.75rem 1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(0, 240, 255, 0.15)'
        }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }}></span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'rgba(0, 240, 255, 0.6)', fontWeight: 'bold' }}>vaibhav@portfolio: ~/dev_profile</span>
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Terminal Screen Content */}
        <div style={{ padding: '1.5rem', color: '#a5f3fc', fontSize: '0.85rem', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Command 1: cat education.json */}
          <div>
            <div style={{ color: '#22d3ee', fontWeight: 'bold', display: 'flex', gap: '0.5rem' }}>
              <span style={{ color: '#818cf8' }}>vaibhav@portfolio:~$</span>
              <span>cat education.json</span>
            </div>
            <pre style={{ margin: '0.5rem 0 0 1rem', color: '#93c5fd', fontFamily: 'monospace' }}>
{`{
  "B.Tech CSE": {
    "institution": "Uttaranchal University",
    "duration": "2023 - 2027",
    "cgpa": "7.0 / 10",
    "focus": ["C++", "DSA", "JavaScript", "Software Engineering"]
  },
  "B.S. Data Science": {
    "institution": "IIT Madras (Correspondence)",
    "duration": "2025 - 2028",
    "cgpa": "6.80 / 10",
    "focus": ["Statistics", "Database Queries", "ML Models"]
  }
}`}
            </pre>
          </div>

          {/* Command 2: check_experience */}
          <div>
            <div style={{ color: '#22d3ee', fontWeight: 'bold', display: 'flex', gap: '0.5rem' }}>
              <span style={{ color: '#818cf8' }}>vaibhav@portfolio:~$</span>
              <span>sh experience.sh</span>
            </div>
            <div style={{ margin: '0.5rem 0 0 1rem', color: '#cbd5e1' }}>
              <span style={{ color: '#fb7185', fontWeight: 'bold' }}>[Internship]</span> Tenughat Thermal Power Project (Jun 2024)<br />
              &nbsp;&nbsp;- Department: Control & Instrumentation (C&I)<br />
              &nbsp;&nbsp;- Studied: Logic gate electronics, SAP ERP, physical sensor log telemetry.<br />
              <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>[Co-Founder]</span> TeamUp Esports (2024 - Present)<br />
              &nbsp;&nbsp;- Graphic design apparel illustrations, UI widgets, logo monograms.
            </div>
          </div>

          {/* Command 3: show_skills */}
          <div>
            <div style={{ color: '#22d3ee', fontWeight: 'bold', display: 'flex', gap: '0.5rem' }}>
              <span style={{ color: '#818cf8' }}>vaibhav@portfolio:~$</span>
              <span>./show_skills.py</span>
            </div>
            <div style={{ margin: '0.5rem 0 0 1rem', color: '#34d399' }}>
              C/C++ & DSA &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [██████████████████░] 85%<br />
              React & React Native &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [████████████████░░] 82%<br />
              Python & Machine Learning &nbsp;&nbsp; [██████████████░░░░] 75%<br />
              Node.JS Backend & APIs &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [██████████████░░░░] 70%<br />
              Cybersecurity & Cryptography [██████████████░░░░] 70%
            </div>
          </div>

          {/* Prompt */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span style={{ color: '#818cf8' }}>vaibhav@portfolio:~$</span>
            <span style={{ animation: 'blink 1s step-end infinite', borderRight: '2px solid #22d3ee', paddingRight: '2px' }}></span>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes blink {
              from, to { border-color: transparent }
              50% { border-color: #22d3ee; }
            }
          `}} />
        </div>
      </div>
    );
  };

  const handleApplyLayout = () => {
    alert(`To set the "${selectedLayout === 'dashboard' ? 'Split Grid Dashboard' : selectedLayout === 'columns' ? 'Minimalist Columns' : 'Terminal Console'}" layout on your live homepage, notify me and I will write the code structure to Home.jsx!`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      padding: '4rem 2rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-color)',
      color: 'var(--text-primary)',
      transition: 'all 0.5s ease',
    }}>
      <BlindsReveal delay={0.1}>
        <div style={{ maxWidth: '1200px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>
          
          {/* Header Panel */}
          <div className="glass text-center" style={{
            padding: '2.5rem',
            width: '100%',
            maxWidth: '850px',
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '12px',
          }}>
            <span className="badge" style={{ marginBottom: '1rem' }}>Developer Core sandbox</span>
            <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Developer Core Layout Variants</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
              Choose between 3 distinct presentation designs for your B.Tech Computer Science studies, IIT Madras data science foundations, and practical developer skills.
            </p>

            {/* Layout Toggle Buttons */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {[
                { id: 'dashboard', name: 'Option A: Grid Dashboard' },
                { id: 'columns', name: 'Option B: Minimalist Columns' },
                { id: 'terminal', name: 'Option C: Terminal Console' }
              ].map((layout) => (
                <button
                  key={layout.id}
                  onClick={() => setSelectedLayout(layout.id)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '99px',
                    background: selectedLayout === layout.id ? 'var(--accent-color)' : 'rgba(255,255,255,0.03)',
                    color: selectedLayout === layout.id ? '#030303' : 'var(--text-primary)',
                    border: `1px solid ${selectedLayout === layout.id ? 'var(--accent-color)' : 'var(--card-border)'}`,
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {layout.name}
                </button>
              ))}
            </div>

            <button
              onClick={handleApplyLayout}
              className="btn btn-outline"
              style={{ padding: '0.6rem 1.5rem', fontSize: '0.8rem' }}
            >
              Choose Selected Layout for Homepage
            </button>
          </div>

          {/* Active Layout Container */}
          <div className="glass" style={{
            width: '100%',
            padding: selectedLayout === 'terminal' ? '0' : '3.5rem',
            borderRadius: '12px',
            border: selectedLayout === 'terminal' ? 'none' : '1px solid var(--card-border)',
            background: selectedLayout === 'terminal' ? 'transparent' : 'var(--card-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            {selectedLayout === 'dashboard' && renderDashboardLayout()}
            {selectedLayout === 'columns' && renderColumnsLayout()}
            {selectedLayout === 'terminal' && renderTerminalLayout()}
          </div>

        </div>
      </BlindsReveal>
    </div>
  );
};

export default DeveloperSectionPreview;
