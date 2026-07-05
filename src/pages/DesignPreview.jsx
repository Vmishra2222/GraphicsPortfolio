import { useState } from 'react';
import BlindsReveal from '../components/BlindsReveal';

const DesignPreview = ({ theme, setTheme }) => {
  const [previewTheme, setPreviewTheme] = useState(theme);

  const designThemes = [
    {
      id: 'default',
      name: 'Slate Minimalist (Current)',
      badge: 'Dark Theme',
      bgClass: 'theme-default-preview',
      accentColor: '#14b8a6',
      textColor: '#f8fafc',
      cardBg: '#0f172a4d',
      borderStyle: '1px solid rgba(255,255,255,0.06)',
      description: 'The current slate-grey aesthetic featuring flat Teal accents, smooth rounded pill buttons, and subtle dark card panels.'
    },
    {
      id: 'light',
      name: 'Neo-Minimalist Light',
      badge: 'Light Theme',
      bgClass: 'theme-light-preview',
      accentColor: '#4f46e5',
      textColor: '#0f172a',
      cardBg: '#ffffff99',
      borderStyle: '1px solid rgba(15,23,42,0.08)',
      description: 'A clean, off-white developer aesthetic with indigo accents, charcoal text, and crisp glass panels.'
    },
    {
      id: 'cyber',
      name: 'Cyber-Neon Glass',
      badge: 'Futuristic Dark',
      bgClass: 'theme-cyber-preview',
      accentColor: '#00f0ff',
      textColor: '#ffffff',
      cardBg: 'rgba(6, 8, 20, 0.6)',
      borderStyle: '1px solid rgba(0, 240, 255, 0.25)',
      description: 'An immersive digital design featuring high-glow electric Cyan accents, frosted dark backgrounds, and subtle neon border outlines.'
    },
    {
      id: 'nordic',
      name: 'Nordic Forest',
      badge: 'Organic Warm',
      bgClass: 'theme-nordic-preview',
      accentColor: '#d97706',
      textColor: '#f2f4f3',
      cardBg: '#151b19cc',
      borderStyle: '1px solid rgba(217, 119, 6, 0.18)',
      description: 'An elegant warm slate design with golden amber highlights, forest charcoal card backing, and organic details.'
    }
  ];

  const currentTheme = designThemes.find(t => t.id === previewTheme);

  const handleApplyGlobally = () => {
    setTheme(previewTheme);
    alert(`Applied "${currentTheme.name}" globally to the entire website!`);
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
      transition: 'all 0.5s ease',
      position: 'relative'
    }}>
      {/* Styles defining the custom variables for each preview mode on this container */}
      <style dangerouslySetInnerHTML={{__html: `
        .preview-box {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .preview-box.theme-default-preview {
          --preview-bg: #030303;
          --preview-accent: #14b8a6;
          --preview-text: #f8fafc;
          --preview-text-sec: #94a3b8;
          --preview-card: #0f172a4d;
          --preview-border: rgba(255, 255, 255, 0.06);
          --preview-shadow: 0 10px 30px rgba(0,0,0,0.5);
          --preview-dots: rgba(255, 255, 255, 0.05);
        }
        .preview-box.theme-light-preview {
          --preview-bg: #f8fafc;
          --preview-accent: #4f46e5;
          --preview-text: #0f172a;
          --preview-text-sec: #475569;
          --preview-card: #ffffff99;
          --preview-border: rgba(15, 23, 42, 0.08);
          --preview-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
          --preview-dots: rgba(15, 23, 42, 0.05);
        }
        .preview-box.theme-cyber-preview {
          --preview-bg: #060814;
          --preview-accent: #00f0ff;
          --preview-text: #ffffff;
          --preview-text-sec: #94a3b8;
          --preview-card: rgba(6, 8, 20, 0.6);
          --preview-border: rgba(0, 240, 255, 0.25);
          --preview-shadow: 0 15px 40px rgba(0, 240, 255, 0.08);
          --preview-dots: rgba(0, 240, 255, 0.08);
        }
        .preview-box.theme-nordic-preview {
          --preview-bg: #0c0f0e;
          --preview-accent: #d97706;
          --preview-text: #f2f4f3;
          --preview-text-sec: #9ca3af;
          --preview-card: #151b19cc;
          --preview-border: rgba(217, 119, 6, 0.18);
          --preview-shadow: 0 15px 35px rgba(0,0,0,0.6);
          --preview-dots: rgba(134, 239, 172, 0.05);
        }
      `}} />

      <BlindsReveal delay={0.1}>
        <div style={{ maxWidth: '1100px', width: '100%', display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '3rem', alignItems: 'start' }}>
          
          {/* Controls Panel */}
          <div className="glass" style={{
            padding: '2.5rem',
            background: 'rgba(3, 3, 3, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            boxShadow: '0 30px 60px rgba(0,0,0,0.6)'
          }}>
            <span className="badge" style={{ marginBottom: '1rem' }}>Design Sandbox</span>
            <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>Alternative Themes</h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
              Select a theme style to preview its components live in the sandbox container. Click the button to deploy that style globally across your portfolio.
            </p>

            {/* Theme list selectors */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
              {designThemes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setPreviewTheme(t.id)}
                  style={{
                    width: '100%',
                    padding: '1.1rem 1.25rem',
                    borderRadius: '8px',
                    background: previewTheme === t.id ? 'var(--accent-color)' : 'rgba(255,255,255,0.02)',
                    color: previewTheme === t.id ? '#030303' : '#fff',
                    border: `1px solid ${previewTheme === t.id ? 'var(--accent-color)' : 'rgba(255,255,255,0.06)'}`,
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontWeight: '600',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span style={{ fontSize: '0.95rem' }}>{t.name}</span>
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '99px',
                      background: previewTheme === t.id ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.06)',
                      color: previewTheme === t.id ? '#030303' : 'var(--text-secondary)'
                    }}>{t.badge}</span>
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 'normal',
                    opacity: 0.8,
                    color: previewTheme === t.id ? '#1e293b' : 'var(--text-muted)'
                  }}>{t.description}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleApplyGlobally}
              className="btn btn-primary"
              style={{ width: '100%', padding: '1rem', fontWeight: '700' }}
            >
              Apply Theme Globally
            </button>
          </div>

          {/* Sandbox Mock Container */}
          <div className={`preview-box ${currentTheme.bgClass}`} style={{
            width: '100%',
            background: 'var(--preview-bg)',
            border: 'var(--preview-border)',
            boxShadow: 'var(--preview-shadow)',
            borderRadius: '12px',
            padding: '3rem',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
            color: 'var(--preview-text)',
            minHeight: '650px'
          }}>
            {/* Dot Grid overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(var(--preview-dots) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              pointerEvents: 'none',
              opacity: 0.8
            }}></div>

            {/* Mock Navigation Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '1.25rem',
              borderBottom: '1px solid var(--preview-border)',
              zIndex: 2
            }}>
              <span style={{ fontSize: '1.1rem', fontWeight: '800', fontFamily: 'Space Grotesk', letterSpacing: '-0.02em' }}>
                VAIBHAV MISHRA
              </span>
              <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', fontWeight: '500', opacity: 0.8 }}>
                <span>Home</span>
                <span style={{ color: 'var(--preview-accent)' }}>Showcase</span>
                <span>Resume</span>
                <span>Contact</span>
              </div>
            </div>

            {/* Mock Hero Section */}
            <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.75rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '99px',
                background: 'var(--preview-card)',
                border: 'var(--preview-border)',
                width: 'fit-content',
                fontWeight: '600'
              }}>
                B.Tech CSE Student & Artist
              </div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.03em', lineHeight: '1.1', margin: 0 }}>
                I Build Things That <br />
                <span style={{ color: 'var(--preview-accent)' }}>Look Good & Work Better.</span>
              </h1>
              <p style={{ fontSize: '0.85rem', color: 'var(--preview-text-sec)', margin: '0.25rem 0 1rem', maxWidth: '450px', lineHeight: '1.5' }}>
                Hi, I am Vaibhav. I study Computer Science Engineering and work on graphic design. Here is some of my work.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button style={{
                  padding: '0.7rem 1.4rem',
                  borderRadius: '99px',
                  background: 'var(--preview-accent)',
                  color: previewTheme === 'light' ? '#fff' : '#030303',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}>
                  Explore Showcase
                </button>
                <button style={{
                  padding: '0.7rem 1.4rem',
                  borderRadius: '99px',
                  background: 'transparent',
                  color: 'var(--preview-text)',
                  border: 'var(--preview-border)',
                  fontWeight: '600',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}>
                  My Story
                </button>
              </div>
            </div>

            {/* Mock Components Row (Card & Inputs) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.5rem', zIndex: 2 }}>
              
              {/* Mock Project Card */}
              <div style={{
                background: 'var(--preview-card)',
                border: 'var(--preview-border)',
                borderRadius: '12px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  height: '110px',
                  background: 'var(--preview-accent)',
                  opacity: 0.15,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  letterSpacing: '0.1em'
                }}>
                  PROJECT IMAGE MOCK
                </div>
                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <span style={{
                    fontSize: '0.65rem',
                    textTransform: 'uppercase',
                    color: 'var(--preview-accent)',
                    fontWeight: '700',
                    letterSpacing: '0.05em'
                  }}>Logos & Identity</span>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700' }}>KrishiAI Brand Mark</h4>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--preview-text-sec)', lineHeight: '1.4' }}>
                    Merged neural network wires with green plant leaves.
                  </p>
                </div>
              </div>

              {/* Mock Form & Progress bar elements */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', justifyContent: 'center' }}>
                {/* Progress bar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '600' }}>
                    <span>Design Skills</span>
                    <span style={{ color: 'var(--preview-accent)' }}>92%</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--preview-card)', border: 'var(--preview-border)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ width: '92%', height: '100%', background: 'var(--preview-accent)', borderRadius: '99px' }}></div>
                  </div>
                </div>

                {/* Form fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    readOnly
                    style={{
                      width: '100%',
                      padding: '0.65rem 1rem',
                      borderRadius: '99px',
                      background: 'var(--preview-card)',
                      border: 'var(--preview-border)',
                      color: 'var(--preview-text)',
                      fontSize: '0.75rem',
                      outline: 'none'
                    }}
                  />
                  <button style={{
                    width: '100%',
                    padding: '0.65rem 1rem',
                    borderRadius: '99px',
                    background: 'var(--preview-accent)',
                    color: previewTheme === 'light' ? '#fff' : '#030303',
                    border: 'none',
                    fontWeight: '700',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}>
                    Connect Now
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </BlindsReveal>
    </div>
  );
};

export default DesignPreview;
