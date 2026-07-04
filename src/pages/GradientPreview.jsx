import { useState } from 'react';
import BlindsReveal from '../components/BlindsReveal';

const GradientPreview = () => {
  const [activeVariant, setActiveVariant] = useState('midnight');
  const [copiedId, setCopiedId] = useState(null);

  const gradientVariants = [
    {
      id: 'midnight',
      name: 'Midnight Aurora (Dark Violet & Teal)',
      colors: ['#030303', '#0f172a', '#1e1b4b', '#115e59'],
      css: 'linear-gradient(-45deg, #030303, #0f172a, #1e1b4b, #115e59)',
      description: 'A deep, mysterious blend of midnight dark grey, slate-blue, dark violet, and soft teal waves.'
    },
    {
      id: 'cyber',
      name: 'Cyber Dusk (Deep Violet & Magenta)',
      colors: ['#030303', '#1e1b4b', '#3b0764', '#701a75'],
      css: 'linear-gradient(-45deg, #030303, #1e1b4b, #3b0764, #701a75)',
      description: 'A rich, high-contrast digital sunset mix of deep dark indigo, royal purple, and magenta highlights.'
    },
    {
      id: 'emerald',
      name: 'Emerald Glow (Slate Green & Mint)',
      colors: ['#030303', '#022c22', '#064e3b', '#115e59'],
      css: 'linear-gradient(-45deg, #030303, #022c22, #064e3b, #115e59)',
      description: 'A organic, natural, dark forest-green and mint-teal animation blending with charcoal black.'
    },
    {
      id: 'slate',
      name: 'Slate Minimalist (Monochromatic Charcoal)',
      colors: ['#030303', '#09090b', '#18181b', '#27272a'],
      css: 'linear-gradient(-45deg, #030303, #09090b, #18181b, #27272a)',
      description: 'A very clean, subtle, and sophisticated series of shifting cool charcoal grey and off-black tones.'
    }
  ];

  const currentVariant = gradientVariants.find(v => v.id === activeVariant);

  const handleCopyCSS = (variant) => {
    const cssCode = `@keyframes moveGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

body {
  background: ${variant.css};
  background-size: 300% 300%;
  animation: moveGradient 15s ease infinite;
}`;

    navigator.clipboard.writeText(cssCode).then(() => {
      setCopiedId(variant.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      // Background animation styles applied dynamically
      background: currentVariant.css,
      backgroundSize: '300% 300%',
      animation: 'moveGradient 15s ease infinite',
      transition: 'background 1.5s cubic-bezier(0.25, 1, 0.5, 1)'
    }}>
      {/* Dynamic CSS injecting the movement keyframes on this page */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes moveGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />

      <BlindsReveal delay={0.1}>
        <div className="glass" style={{
          maxWidth: '560px',
          width: '100%',
          padding: '2.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(3, 3, 3, 0.75)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
          zIndex: 10
        }}>
          <span className="badge" style={{ marginBottom: '1rem' }}>Ambient Backgrounds</span>
          <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1rem' }}>Moving Gradients</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
            Click on any variant button below to apply that animated gradient to the background of this page. Choose your favorite variant and copy its CSS configuration!
          </p>

          {/* Toggle buttons */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            marginBottom: '2rem'
          }}>
            {gradientVariants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setActiveVariant(variant.id)}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  borderRadius: '6px',
                  background: activeVariant === variant.id ? 'var(--accent-color)' : 'rgba(255,255,255,0.02)',
                  color: activeVariant === variant.id ? '#030303' : '#fff',
                  border: `1px solid ${activeVariant === variant.id ? 'var(--accent-color)' : 'rgba(255,255,255,0.06)'}`,
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                <span>{variant.name}</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {variant.colors.map((c, i) => (
                    <span key={i} style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: c,
                      border: '0.5px solid rgba(255,255,255,0.3)'
                    }}></span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* Info and code snippet for active variant */}
          <div style={{
            padding: '1.25rem',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '6px',
            border: '1px solid rgba(255,255,255,0.03)',
            marginBottom: '1.5rem'
          }}>
            <h4 style={{ color: '#fff', fontSize: '0.85rem', marginBottom: '0.5rem', fontFamily: 'monospace' }}>
              ACTIVE VARIANT DETAILS:
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.5' }}>
              {currentVariant.description}
            </p>
            <pre style={{
              fontSize: '0.75rem',
              fontFamily: 'monospace',
              color: 'var(--text-muted)',
              overflowX: 'auto',
              background: '#0303034d',
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.02)'
            }}>
              {`background: ${currentVariant.css};\nbackground-size: 300% 300%;\nanimation: moveGradient 15s ease infinite;`}
            </pre>
          </div>

          <button
            onClick={() => handleCopyCSS(currentVariant)}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem' }}
          >
            {copiedId === currentVariant.id ? 'CSS Code Copied!' : 'Copy Animation CSS'}
          </button>
        </div>
      </BlindsReveal>
    </div>
  );
};

export default GradientPreview;
