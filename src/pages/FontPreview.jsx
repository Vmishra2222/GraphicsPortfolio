import { useState, useEffect } from 'react';
import BlindsReveal from '../components/BlindsReveal';

const FontPreview = () => {
  const [copiedId, setCopiedId] = useState(null);

  // Load various premium Google Fonts dynamically for the preview page
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Bebas+Neue&family=Major+Mono+Display&family=Montserrat:wght@800&family=Share+Tech+Mono&family=Space+Grotesk:wght@700&family=Syncopate:wght@700&family=Syne:wght@800&family=Unbounded:wght@800&family=Playfair+Display:ital,wght@1,700&family=Lexend:wght@800&display=swap';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const fontOptions = [
    {
      id: 'radeil3d',
      name: 'Radeil3D (Current Outline Logo Font)',
      family: 'Radeil3D, sans-serif',
      weight: 'normal',
      style: 'normal',
      transform: 'none',
      letterSpacing: '0.05em'
    },
    {
      id: 'syncopate',
      name: 'Syncopate (Ultra-Wide Modern Display)',
      family: 'Syncopate, sans-serif',
      weight: '700',
      style: 'normal',
      transform: 'uppercase',
      letterSpacing: '0.2em'
    },
    {
      id: 'syne',
      name: 'Syne (Avant-Garde Art & Design)',
      family: 'Syne, sans-serif',
      weight: '800',
      style: 'normal',
      transform: 'none',
      letterSpacing: 'normal'
    },
    {
      id: 'unbounded',
      name: 'Unbounded (Bold Wide Tech/Creative)',
      family: 'Unbounded, sans-serif',
      weight: '800',
      style: 'normal',
      transform: 'none',
      letterSpacing: '0.02em'
    },
    {
      id: 'space-grotesk',
      name: 'Space Grotesk (Clean Geometric Tech)',
      family: 'Space Grotesk, sans-serif',
      weight: '700',
      style: 'normal',
      transform: 'none',
      letterSpacing: '-0.02em'
    },
    {
      id: 'outfit',
      name: 'Outfit (Sleek Modern Sans-Serif)',
      family: 'Outfit, sans-serif',
      weight: '700',
      style: 'normal',
      transform: 'none',
      letterSpacing: '-0.01em'
    },
    {
      id: 'bebas-neue',
      name: 'Bebas Neue (Impactful Bold Tall Display)',
      family: 'Bebas Neue, sans-serif',
      weight: '400',
      style: 'normal',
      transform: 'uppercase',
      letterSpacing: '0.12em'
    },
    {
      id: 'cinzel',
      name: 'Cinzel (Classical Roman Elegance)',
      family: 'Cinzel, serif',
      weight: '700',
      style: 'normal',
      transform: 'uppercase',
      letterSpacing: '0.08em'
    },
    {
      id: 'playfair-display',
      name: 'Playfair Display (Premium Editorial Serif)',
      family: 'Playfair Display, serif',
      weight: '700',
      style: 'italic',
      transform: 'none',
      letterSpacing: 'normal'
    },
    {
      id: 'share-tech-mono',
      name: 'Share Tech Mono (Console/Developer Aesthetic)',
      family: 'Share Tech Mono, monospace',
      weight: '400',
      style: 'normal',
      transform: 'uppercase',
      letterSpacing: '0.1em'
    },
    {
      id: 'major-mono',
      name: 'Major Mono Display (Abstract Typography)',
      family: 'Major Mono Display, monospace',
      weight: '400',
      style: 'normal',
      transform: 'lowercase',
      letterSpacing: '0.05em'
    },
    {
      id: 'agraham',
      name: 'Agraham (Signature Handwritten)',
      family: 'Agraham, serif',
      weight: 'normal',
      style: 'normal',
      transform: 'none',
      letterSpacing: '0.05em'
    }
  ];

  const handleCopyCSS = (font) => {
    const cssString = `font-family: '${font.family.split(',')[0]}', ${font.family.split(',')[1] || 'sans-serif'};
font-weight: ${font.weight};
font-style: ${font.style};
text-transform: ${font.transform};
letter-spacing: ${font.letterSpacing};`;

    navigator.clipboard.writeText(cssString).then(() => {
      setCopiedId(font.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="page-wrapper container" style={{ paddingBottom: '6rem' }}>
      <BlindsReveal delay={0.1}>
        <div className="page-header text-center animate-fade-in" style={{ marginBottom: '4rem' }}>
          <span className="badge">Navbar Logo Styles</span>
          <h1 style={{ marginBottom: '1rem' }}>Font Typography Comparison</h1>
          <p className="mx-auto header-description" style={{ maxWidth: '650px' }}>
            Previewing <strong>"VAIBHAV MISHRA"</strong> in various premium font styles. Choose a typeface for the navbar logo, click to copy its CSS variables, and let me know which one you prefer!
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '2rem'
        }}>
          {fontOptions.map((font) => (
            <div 
              key={font.id} 
              className="glass" 
              style={{
                padding: '2rem',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.01)'
              }}
            >
              <div>
                <span style={{ 
                  fontSize: '0.75rem', 
                  fontFamily: 'monospace', 
                  color: 'var(--accent-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'block',
                  marginBottom: '1rem'
                }}>
                  {font.name}
                </span>

                {/* Big Preview (UPPERCASE) */}
                <div style={{
                  fontSize: '2rem',
                  fontFamily: font.family,
                  fontWeight: font.weight,
                  fontStyle: font.style,
                  textTransform: font.transform,
                  letterSpacing: font.letterSpacing,
                  color: '#ffffff',
                  lineHeight: '1.2',
                  marginBottom: '0.5rem',
                  wordBreak: 'break-word'
                }}>
                  VAIBHAV MISHRA
                </div>

                {/* Mixed-Case Preview */}
                <div style={{
                  fontSize: '1.3rem',
                  fontFamily: font.family,
                  fontWeight: font.weight,
                  fontStyle: font.style,
                  letterSpacing: font.letterSpacing,
                  color: 'var(--text-secondary)',
                  marginBottom: '1.5rem',
                  opacity: 0.8
                }}>
                  Vaibhav Mishra
                </div>
              </div>

              {/* Code Snippet Box */}
              <div style={{ marginTop: 'auto' }}>
                <pre style={{
                  background: 'rgba(0,0,0,0.4)',
                  padding: '1rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  color: 'var(--text-muted)',
                  overflowX: 'auto',
                  border: '1px solid rgba(255,255,255,0.03)',
                  marginBottom: '1rem'
                }}>
                  {`font-family: '${font.family.split(',')[0]}';\n`}
                  {font.weight !== 'normal' && `font-weight: ${font.weight};\n`}
                  {font.style !== 'normal' && `font-style: ${font.style};\n`}
                  {font.transform !== 'none' && `text-transform: ${font.transform};\n`}
                  {font.letterSpacing !== 'normal' && `letter-spacing: ${font.letterSpacing};\n`}
                </pre>

                <button 
                  onClick={() => handleCopyCSS(font)} 
                  className="btn btn-outline" 
                  style={{ 
                    width: '100%', 
                    padding: '0.5rem 1rem', 
                    fontSize: '0.8rem',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  {copiedId === font.id ? 'CSS Copied!' : 'Copy Logo CSS'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </BlindsReveal>
    </div>
  );
};

export default FontPreview;
